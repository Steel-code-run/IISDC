import React, {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSnackbar} from "../hooks/use-snackbar";
import {LogsTable} from "../sections/logs/logs-table";
import {getLogs} from "../api/logsResponses";

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
    const portalPopup = document?.getElementById('portal');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const queryClient = useQueryClient()

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();

    const orderBy = {
        date: 'desc'
    };
    const where = {
        NOT: {
            path: '/v1/accessing-logs'
        }
    }
    const {data: logs, status, isLoading, isError } =
        useQuery(['logs', page*rowsPerPage, rowsPerPage, orderBy, where],
            () => getLogs(page*rowsPerPage, rowsPerPage, orderBy, where));

    // const mutation = useMutation(
    //     (delUser) => deleteUser(delUser), {
    //         onSuccess: (res) => {
    //             queryClient.invalidateQueries(["users"]);
    //             setOpenSnackbar(true)
    //             setSnackbarData({
    //                 msg: res.message,
    //                 type: 'success'
    //             })
    //         }
    //     });


    // const [isOpen, setIsOpen] = useState(false);
    //
    // const customers = useCustomers(users, page, rowsPerPage);
    // const customersIds = useCustomerIds(customers);
    // const customersSelection
    //     = useSelection(customersIds);


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

    return (
        <>

            <Head>
                <title>
                    Логи
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
                                    Логи
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >

                                </Stack>
                            </Stack>

                        </Stack>
                        {
                            (status === "success" && logs.logs.length > 0) &&
                            <LogsTable
                                count={logs.count || 0}
                                items={logs.logs}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                page={page}
                                rowsPerPage={rowsPerPage}
                            />
                        }
                    </Stack>
                </Container>
            </Box>
            {/*<SnackbarMessage msg={snackbarData.msg}*/}
            {/*                 type={snackbarData.type}*/}
            {/*                 openSnackbar={openSnackbar}*/}
            {/*                 setOpenSnackbar={setOpenSnackbar}/>*/}
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
