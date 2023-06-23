import React, {useCallback, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {RoutesTable} from "../sections/routes/routes-table";
import {getRoutes} from "../api/routesReq";

const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const queryClient = useQueryClient()

    // const orderBy = {
    //     date: 'desc'
    // };
    // const where = {
    //     NOT: {
    //         path: '/v1/accessing-logs'
    //     }
    // }
    const {data: routes, status, isLoading, isError } =
        useQuery(['routes', page*rowsPerPage, rowsPerPage],
            () => getRoutes(page*rowsPerPage, rowsPerPage));

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
                    Роуты
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
                                    Доступные роуты
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
                            (status === "success" && routes?.resources_access.length > 0) &&
                            <RoutesTable
                                count={routes?.resources_access_count || 0}
                                items={routes?.resources_access}
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
