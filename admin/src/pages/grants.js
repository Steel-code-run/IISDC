import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, CircularProgress, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {PostsTable} from "../sections/posts/posts-table";
import {deleteGrant, getGrants, updateGrant} from "../api/posts/grantsReq";
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
    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();
    const [searchValue, setSearchValue] = useState('')


    const queryClient = useQueryClient();
    const configGrantsRes = {
        extended: true
    }
    const whereGrants = {
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

    const {data: grantsList, status, isLoadingGrant, isErrorGrant} = useQuery(
        ['grants', page * rowsPerPage, rowsPerPage, configGrantsRes, whereGrants],
        () => getGrants(page * rowsPerPage, rowsPerPage, configGrantsRes, whereGrants))

    const initialData = {
        count: 0,
        grants: []
    }

    const {count, grants} = (grantsList) ? grantsList : initialData;

    const mutationArchiveGrant = useMutation(
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

    const mutationDeleteGrant = useMutation(
        (delGrantId) => deleteGrant(delGrantId), {
            onSuccess: (res) => {
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
    )

    const handleSearch = useCallback((value) => {
        setSearchValue(value)
    })
    if (isLoadingGrant) {
        return <CircularProgress size={100} sx={{
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}/>
    }

    if (isErrorGrant) {
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
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Гранты
                                </Typography>

                            </Stack>

                        </Stack>
                        <CustomersSearch
                            placeholder={'Поиск гранта'}
                            searchValue={searchValue}
                            handleSearchValue={handleSearch}/>
                        {
                            (status === "success" && count > 0) ?
                                <PostsTable
                                    type={'grant'}
                                    count={count || 0}
                                    items={grants}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    deleteRowHandle={mutationDeleteGrant.mutate}
                                    archiveHandle={mutationArchiveGrant.mutate}
                                /> : (status === "loading" && count > 0) ? <Skeleton variant="rounded"
                                                                                                  animation="wave"
                                                                                                  width={'100%'}
                                                                                                  height={400}/>
                                    : <p>Количество грантов равно 0</p>
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
