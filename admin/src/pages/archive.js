import React, {useCallback, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {
    deleteCompetition,
    getCompetitions,
    getCountCompetitions,
    updateCompetition
} from "../api/posts/competitionsReq";
import {useSnackbar} from "../hooks/use-snackbar";
import {ArchiveTable} from "../sections/archive/archive-table";
import {deleteGrant, getCountGrants, getGrants, updateGrant} from "../api/posts/grantsReq";
import {deleteInternship, getCountInternships, getInternships, updateInternship} from "../api/posts/internshipsReq";


const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();
    const config = {
        extended: true
    }
    const where = {
        blackListed: true
    }
    const queryClient = useQueryClient()

    const {data: competitionsList, status, isLoading, isError: isErrorCompetition} = useQuery(
        ['competitions', page * rowsPerPage, rowsPerPage, config, where], () =>
            getCompetitions(page * rowsPerPage, rowsPerPage, config, where))
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
        ['grants', page * rowsPerPage, rowsPerPage, config, where], () =>
            getGrants(page * rowsPerPage, rowsPerPage, config, where))
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

    const {data: internshipsList, status: statusInternships, isLoading: isLoadingInternships, isError: isErrorInternships} = useQuery(
        ['internships', page * rowsPerPage, rowsPerPage, config, where], () =>
            getInternships(page * rowsPerPage, rowsPerPage, config, where))
    const {data: countInternships  } = useQuery(['countInternships'], getCountInternships);

    const mutationUnarchiveInternships = useMutation(
        (archiveData) => updateInternship(archiveData), {
            onSuccess: () => {
                queryClient.invalidateQueries(["internships"]);
                setOpenSnackbar(true)
                setSnackbarData({
                    msg: 'Стажировка убрана в архив',
                    type: 'success'
                })
            }
        })

    const mutationDeleteInternships = useMutation(
        (delInterId) => deleteInternship(delInterId), {
            onSuccess: () => {
                queryClient.invalidateQueries(["internships"]);
                setOpenSnackbar(true)
                setSnackbarData({
                    msg: 'Стажировка успешно удалена',
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
                                        type={'grant'}
                                        count={countGrants || 0}
                                        items={grantsList}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        deleteRowHandle={mutationDeleteGrants.mutate}
                                        unarchiveHandle={mutationUnarchiveGrants.mutate}
                                    /> : (status === "loading" && grantsList?.length > 0)
                                        ? <Skeleton variant="rounded"
                                                    animation="wave"
                                                    width={'100%'} height={400}/>
                                        : <p>Количество грантов в архиве равно 0</p>
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
                                        type={'competition'}
                                        count={countCompetitions || 0}
                                        items={competitionsList}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        deleteRowHandle={mutationDeleteCompetition.mutate}
                                        unarchiveHandle={mutationUnarchiveCompetition.mutate}
                                    /> : (status === "loading" && competitionsList?.length > 0)
                                        ? <Skeleton variant="rounded"
                                                    animation="wave"
                                                    width={'100%'} height={400}/>
                                        : <p>Количество конкурсов в архиве равно 0</p>
                            }
                        </Stack>
                    }
                    {
                        !isErrorInternships &&
                        <Stack spacing={3} marginTop={10}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <Stack spacing={1}>
                                    <Typography variant="h4">
                                        Архив стажировок
                                    </Typography>

                                </Stack>

                            </Stack>
                            {/*<CustomersSearch/>*/}
                            {
                                (status === "success" && internshipsList?.length > 0) ?
                                    <ArchiveTable
                                        type={'internship'}
                                        count={countInternships || 0}
                                        items={internshipsList}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        deleteRowHandle={mutationDeleteInternships.mutate}
                                        unarchiveHandle={mutationUnarchiveInternships.mutate}
                                    /> : (status === "loading" && internshipsList?.length > 0)
                                        ? <Skeleton variant="rounded"
                                                    animation="wave"
                                                    width={'100%'} height={400}/>
                                        : <p>Количество стажировок в архиве равно 0</p>
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
