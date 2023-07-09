import React from 'react';
import Head from 'next/head';
import {Box, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {deleteCompetition, getCompetitions, updateCompetition} from "../api/posts/competitionsReq";
import {useSnackbar} from "../hooks/use-snackbar";
import {ArchiveTable} from "../sections/archive/archive-table";
import {deleteGrant, getGrants, updateGrant} from "../api/posts/grantsReq";
import {deleteInternship, getInternships, updateInternship} from "../api/posts/internshipsReq";
import {useTable} from "../hooks/useTable";


const Page = () => {

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();
    const config = {
        extended: true
    }
    const where = {
        blackListed: true
    }
    const queryClient = useQueryClient();

    const [pageGrants,
        setPageGrants,
        rowsPerPageGrants,
        setRowsPerPageGrants,
        handlePageChangeGrants,
        handleRowsPerPageChangeGrants] = useTable('grants');

    const [pageCompetitions,
        setPageCompetitions,
        rowsPerPageCompetitions,
        setRowsPerPageCompetitions,
        handlePageChangeCompetitions,
        handleRowsPerPageChangeCompetitions] = useTable('competitions');

    const [pageInternships,
        setPageInternships,
        rowsPerPageInternships,
        setRowsPerPageInternships,
        handlePageChangeInternships,
        handleRowsPerPageChangeInternships] = useTable('competitions')

    const {data: competitionsList, status, isLoading, isError: isErrorCompetition} = useQuery(
        ['competitions', pageCompetitions * rowsPerPageCompetitions, rowsPerPageCompetitions, config, where], () =>
            getCompetitions(pageCompetitions * rowsPerPageCompetitions, rowsPerPageCompetitions, config, where))

    const {count: countCompetitions, competitions} = (competitionsList) ? competitionsList : {
        count: 0,
        competitions: []
    };

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
        ['grants', pageGrants * rowsPerPageGrants, rowsPerPageGrants, config, where], () =>
            getGrants(pageGrants * rowsPerPageGrants, rowsPerPageGrants, config, where));



    const {count: countGrants, grants} = (grantsList) ? grantsList : {
        count: 0,
        grants: []
    };

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

    const {
        data: internshipsList,
        status: statusInternships,
        isLoading: isLoadingInternships,
        isError: isErrorInternships
    } = useQuery(
        ['internships', pageInternships * rowsPerPageInternships, rowsPerPageInternships, config, where], () =>
            getInternships(pageInternships * rowsPerPageInternships, rowsPerPageInternships, config, where))


    const {count: countInternships, internships} = (internshipsList) ? internshipsList : {
        count: 0,
        internships: []
    };

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
                                (status === "success" && countGrants > 0) ?
                                    <ArchiveTable
                                        type={'grant'}
                                        count={countGrants || 0}
                                        items={grants}
                                        onPageChange={handlePageChangeGrants}
                                        onRowsPerPageChange={handleRowsPerPageChangeGrants}
                                        page={pageGrants}
                                        rowsPerPage={rowsPerPageGrants}
                                        deleteRowHandle={mutationDeleteGrants.mutate}
                                        unarchiveHandle={mutationUnarchiveGrants.mutate}
                                    /> : (status === "loading" && countGrants > 0)
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
                                (status === "success" && countCompetitions > 0) ?
                                    <ArchiveTable
                                        type={'competition'}
                                        count={countCompetitions || 0}
                                        items={competitions}
                                        onPageChange={handlePageChangeCompetitions}
                                        onRowsPerPageChange={handleRowsPerPageChangeCompetitions}
                                        page={pageCompetitions}
                                        rowsPerPage={rowsPerPageCompetitions}
                                        deleteRowHandle={mutationDeleteCompetition.mutate}
                                        unarchiveHandle={mutationUnarchiveCompetition.mutate}
                                    /> : (status === "loading" && countCompetitions > 0)
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
                                (status === "success" && countInternships > 0) ?
                                    <ArchiveTable
                                        type={'internship'}
                                        count={countInternships || 0}
                                        items={internships}
                                        onPageChange={handlePageChangeInternships}
                                        onRowsPerPageChange={handleRowsPerPageChangeInternships}
                                        page={pageInternships}
                                        rowsPerPage={rowsPerPageInternships}
                                        deleteRowHandle={mutationDeleteInternships.mutate}
                                        unarchiveHandle={mutationUnarchiveInternships.mutate}
                                    /> : (status === "loading" && countInternships > 0)
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
