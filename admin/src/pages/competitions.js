import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, CircularProgress, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {PostsTable} from "../sections/posts/posts-table";
import {deleteCompetition, getCompetitions, updateCompetition} from "../api/posts/competitionsReq";
import {useSnackbar} from "../hooks/use-snackbar";
import {CustomersSearch} from "../sections/customer/customers-search";

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
    const [searchValue, setSearchValue] = useState('')

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();
    const configCompetitionRes = {
        extended: true
    }
    const whereCompetition = {
        blackListed: false,
        ...(
            (!searchValue) ? {} : {
                namePost: {
                    contains: searchValue
                }
            }
        )
    }

    useEffect(() => {
        if(searchValue) {
            setPage(0);
        }
    }, [searchValue])

    const queryClient = useQueryClient()

    const {data: competitionsList, status, isLoadingCompetition, isError} = useQuery(
        ['competitions', page * rowsPerPage, rowsPerPage, configCompetitionRes, whereCompetition], () =>
            getCompetitions(page * rowsPerPage, rowsPerPage, configCompetitionRes, whereCompetition));


    const initialData = {
        count: 0,
        competitions: []
    }

    const {count, competitions} = (competitionsList) ? competitionsList : initialData;
    
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
    )
    const handleSearch = useCallback((value) => {
        setSearchValue(value)
    })

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
                        <CustomersSearch
                            placeholder={'Поиск конкурса'}
                            searchValue={searchValue}
                                         handleSearchValue={handleSearch}/>
                        {
                            (status === "success" && count > 0) ?
                                <PostsTable
                                    type={'competition'}
                                    count={count || 0}
                                    items={competitions}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    deleteRowHandle={mutationDeleteCompetition.mutate}
                                    archiveHandle={mutationArchiveCompetition.mutate}
                                /> : (status === "loading" && count > 0)
                                    ? <Skeleton variant="rounded"
                                                animation="wave"
                                                width={'100%'} height={400}/>
                                    : (status === "loading" && count <= 0) ?
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
