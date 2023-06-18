import React, {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {
    deleteCompetition,
    getCompetitions,
    getCountCompetitions,
    updateCompetition
} from "../api/posts/competitionsResponses";
import {useSnackbar} from "../hooks/use-snackbar";
import {ArchiveTable} from "../sections/archive/archive-table";
import {deleteGrant, getCountGrants, getGrants, updateGrant} from "../api/posts/grantsResponses";

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
        blackListed: true
    }
    const queryClient = useQueryClient()

    const {data: competitionsList, status, isLoading, isError: isErrorCompetition} = useQuery(
        ['competitions', page * rowsPerPage, rowsPerPage, configCompetitionRes, whereCompetition], () =>
            getCompetitions(page * rowsPerPage, rowsPerPage, configCompetitionRes, whereCompetition))
    const {data: countCompetitions  } = useQuery(['countCompetitions'], getCountCompetitions);

    const mutationUnarchiveCompetition = useMutation(
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

    const {data: grantsList, status: statusGrants, isLoading: isLoadingGrants, isError: isErrorGrants} = useQuery(
        ['grants', page * rowsPerPage, rowsPerPage, configCompetitionRes, whereCompetition], () =>
            getGrants(page * rowsPerPage, rowsPerPage, configCompetitionRes, whereCompetition))
    const {data: countGrants  } = useQuery(['countGrants'], getCountGrants);

    const mutationUnarchiveGrants = useMutation(
        (archiveData) => updateGrant(archiveData), {
            onSuccess: () => {
                queryClient.invalidateQueries(["grants"]);
                setOpenSnackbar(true)
                setSnackbarData({
                    msg: 'Грант убран в архив',
                    type: 'success'
                })
            }
        })

    const mutationDeleteGrants = useMutation(
        (delCompetitionsId) => deleteGrant(delCompetitionsId), {
            onSuccess: () => {
                queryClient.invalidateQueries(["grants"]);
                setOpenSnackbar(true)
                setSnackbarData({
                    msg: 'Грант успешно удален',
                    type: 'success'
                })
            }
        });


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


    return (
        <>

            <Head>
                <title>
                    Архив постов
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

                    {
                        !isErrorGrants &&
                        <Stack spacing={3} marginTop={10}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <Stack spacing={1}>
                                    <Typography variant="h4">
                                        Архив грантов
                                    </Typography>

                                </Stack>

                            </Stack>
                            {/*<CustomersSearch/>*/}
                            {
                                (status === "success" && grantsList?.length > 0) ?
                                    <ArchiveTable
                                        count={countGrants || 0}
                                        items={grantsList}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        deleteRowHandle={mutationDeleteGrants.mutate}
                                        unarchiveHandle={mutationUnarchiveGrants.mutate}
                                    /> : <Skeleton variant="rounded"
                                                   animation="wave"
                                                   width={'100%'} height={600}/>
                            }
                        </Stack>
                    }
                    {
                        !isErrorCompetition &&
                        <Stack spacing={3} marginTop={10}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <Stack spacing={1}>
                                    <Typography variant="h4">
                                        Архив конкурсов
                                    </Typography>

                                </Stack>

                            </Stack>
                            {/*<CustomersSearch/>*/}
                            {
                                (status === "success" && competitionsList?.length > 0) ?
                                    <ArchiveTable
                                        count={countCompetitions || 0}
                                        items={competitionsList}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        deleteRowHandle={mutationDeleteCompetition.mutate}
                                        unarchiveHandle={mutationUnarchiveCompetition.mutate}
                                    /> : <Skeleton variant="rounded"
                                                   animation="wave"
                                                   width={'100%'} height={600}/>
                            }
                        </Stack>
                    }

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
