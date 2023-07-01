import React, {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, CircularProgress, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useSelection} from "../hooks/use-selection";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {PostsTable} from "../sections/posts/posts-table";
import {
    deleteCompetition,
    getCompetitions,
    getCountCompetitions,
    updateCompetition
} from "../api/posts/competitionsReq";
import {useSnackbar} from "../hooks/use-snackbar";

const useCustomers = (data, page, rowsPerPage) => {
    return useMemo(
        () => {
            return applyPagination(data, page, rowsPerPage);
        },
        [data, page, rowsPerPage]
    );
};

const useCustomerIds = (customers) => {
    return useMemo(
        () => {
            return customers?.map((customer) => customer.id);
        },
        [customers]
    );
};


const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();
    const configCompetitionRes = {
        extended: true
    }
    const whereCompetition = {
        blackListed: false
    }
    const queryClient = useQueryClient()

    const {data: competitionsList, status, isLoadingCompetition, isError} = useQuery(
        ['competitions', page * rowsPerPage, rowsPerPage, configCompetitionRes, whereCompetition], () =>
            getCompetitions(page * rowsPerPage, rowsPerPage, configCompetitionRes, whereCompetition))
    const {data: countCompetitions} = useQuery(['countCompetitions'], getCountCompetitions);

    
    const mutationArchiveCompetition = useMutation(
        (archiveData) => updateCompetition(archiveData), {
            onSuccess: () => {
                queryClient.invalidateQueries(["competitions"]);
                setOpenSnackbar(true)
                setSnackbarData({
                    msg: 'Конкурс убран в архив',
                    type: 'success'
                })
            }
        })

    const mutationDeleteCompetition = useMutation(
        (delCompetitionsId) => deleteCompetition(delCompetitionsId), {
            onSuccess: () => {
                queryClient.invalidateQueries(["competitions"]);
                setOpenSnackbar(true)
                setSnackbarData({
                    msg: 'Конкурс успешно удален',
                    type: 'success'
                })
            }
        });

    const competitions = useCustomers(competitionsList, page, rowsPerPage);
    const competitionsIds = useCustomerIds(competitions);
    const competitionsSelection
        = useSelection(competitionsIds);

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(event.target.value);
        },
        []
    );

    if (isError) {
        return <h1>Ошибка...</h1>
    }

    if (isLoadingCompetition) {
        return  <CircularProgress size={100} sx={{
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}/>
    }

    return (
        <>

            <Head>
                <title>
                    Посты
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">

                    <Stack spacing={3} marginTop={10}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Конкурсы
                                </Typography>

                            </Stack>

                        </Stack>
                        {/*<CustomersSearch/>*/}
                        {
                            (status === "success" && competitionsList.length > 0) ?
                                <PostsTable
                                    type={'competition'}
                                    count={countCompetitions || 0}
                                    items={competitionsList}
                                    onDeselectAll={competitionsSelection.handleDeselectAll}
                                    onDeselectOne={competitionsSelection.handleDeselectOne}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    onSelectAll={competitionsSelection.handleSelectAll}
                                    onSelectOne={competitionsSelection.handleSelectOne}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    selected={competitionsSelection.selected}
                                    deleteRowHandle={mutationDeleteCompetition.mutate}
                                    archiveHandle={mutationArchiveCompetition.mutate}
                                /> : (status === "loading" && competitionsList?.length > 0)
                                    ? <Skeleton variant="rounded"
                                                animation="wave"
                                                width={'100%'} height={400}/>
                                    : (status === "loading" && competitionsList?.length <= 0) ?
                                        <p>Количество конкурсов равно 0</p>
                                        : null
                        }
                    </Stack>
                </Container>
            </Box>
            <SnackbarMessage msg={snackbarData.msg}
                             type={snackbarData.type}
                             openSnackbar={openSnackbar}
                             setOpenSnackbar={setOpenSnackbar}/>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
