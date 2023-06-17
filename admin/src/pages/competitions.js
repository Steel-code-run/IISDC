import React, {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useMutation, useQuery} from "@tanstack/react-query";
import {useSelection} from "../hooks/use-selection";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {PostsTable} from "../sections/posts/posts-table";
import {deleteCompetition, getCompetitions, getCountCompetitions} from "../api/posts/competitionsResponses";

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

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackbarData] = useState({
        type: '',
        msg: ''
    });

    const {data: competitionsList, status, isLoading, isError} = useQuery(
        ['competitions', page * rowsPerPage, rowsPerPage, {
            extended: true
        }], () => getCompetitions(page * rowsPerPage, rowsPerPage, {
            extended: true
        }))
    const {data: countCompetitions  } = useQuery(['countCompetitions'], getCountCompetitions);

    const mutation = useMutation(
        (delCompetitionsId) => deleteCompetition(delCompetitionsId), {
            onSuccess: (res) => {
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

    if (isLoading) {
        return <h1>Загрузка...</h1>
    }
    if (isError) {
        return <h1>Ошибка...</h1>
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
                                deleteRowHandle={mutation.mutate}
                            /> : <Skeleton variant="rounded"
                                           animation="wave"
                                           width={'100%'} height={600}/>
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
