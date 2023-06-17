import React, {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useMutation, useQuery} from "@tanstack/react-query";
import {useSelection} from "../hooks/use-selection";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {PostsTable} from "../sections/posts/posts-table";
import {deleteGrant, getCountGrants, getGrants} from "../api/posts/grantsResponses";

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

    const {data: grantsList, status, isLoadingGrant, isErrorGrant} = useQuery(
        ['grants', page * rowsPerPage, rowsPerPage, {
            extended: true
        }], () => getGrants(page * rowsPerPage, rowsPerPage, {
            extended: true
        }))
    const {data: countGrants} = useQuery(['countGrants'], getCountGrants);


    const mutation = useMutation(
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

    const grants = useCustomers(grantsList, page, rowsPerPage);
    const grantsIds = useCustomerIds(grants);
    const grantsSelection
        = useSelection(grantsIds);


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

    if (isLoadingGrant) {
        return <h1>Загрузка...</h1>
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
                        {/*<CustomersSearch/>*/}
                        {
                            (status === "success" && grantsList.length > 0) ?
                                <PostsTable
                                    type={'grant'}
                                    count={countGrants || 0}
                                    items={grantsList}
                                    onDeselectAll={grantsSelection.handleDeselectAll}
                                    onDeselectOne={grantsSelection.handleDeselectOne}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    onSelectAll={grantsSelection.handleSelectAll}
                                    onSelectOne={grantsSelection.handleSelectOne}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    selected={grantsSelection.selected}
                                    deleteRowHandle={mutation.mutate}
                                /> : <Skeleton variant="rounded"
                                               animation="wave"
                                               width={'100%'} height={400}/>
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
