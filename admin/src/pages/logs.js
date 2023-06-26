import React, {useCallback, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {LogsTable} from "../sections/logs/logs-table";
import {getLogs, getWarnings} from "../api/logsReq";
import {WarningsTable} from "../sections/logs/warnings-table";

const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const queryClient = useQueryClient()

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

    const {data: warnings, status: statusWarn, error} = useQuery(['warnings'], getWarnings);

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
                    <Stack spacing={3} marginTop={'40px'}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Предупреждения
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
                            (statusWarn === "success" && warnings?.logs?.length > 0) &&
                            <WarningsTable
                                count={warnings?.count || 0}
                                items={warnings?.logs}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                page={page}
                                rowsPerPage={rowsPerPage}
                            />
                        }
                    </Stack>


                </Container>
            </Box>

        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
