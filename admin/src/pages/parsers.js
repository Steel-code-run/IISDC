import {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useSelection} from "../hooks/use-selection";
import {getCountParsers, getParsers, updateParsers} from "../api/parsersReq";
import {ParsersTable} from "../sections/parsers/parsers-table";
import {useUserQuery} from "../hooks/useUserQuery";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {useSnackbar} from "../hooks/use-snackbar";


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
            return customers?.filter((parser) => parser.isEnabled).map((parsers) => parsers.id);
        },
        [customers]
    );
};


const Page = options => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();
    const queryClient = useQueryClient()

    const {data: parsers, status, isLoading, isError } =
        useUserQuery('parsers',
            getParsers,
            page*rowsPerPage, rowsPerPage
        )

    const {data: countParsers} = useQuery(['parsersCount'], getCountParsers );

    const mutationUpdateParsers = useMutation(
        (updateData) => updateParsers(updateData), {
            onSuccess: (res) => {
                queryClient?.invalidateQueries(['parsers']);
                setOpenSnackbar(true)
                setSnackbarData({
                    msg: res.message,
                    type: 'success'
                })

            },
            onError: (err) => {
                setOpenSnackbar(false)
                setSnackbarData({
                    msg: err.message,
                    type: 'error'
                })
            }
        })


    const customers = useCustomers(parsers, page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection
        = useSelection(customersIds);

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
                    Парсеры
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
                                    Парсеры
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >

                                </Stack>
                            </Stack>

                        </Stack>
                        {/*<ParsersSearch/>*/}
                        {
                            (status === "success" && parsers?.length > 0) ?
                            <ParsersTable
                                count={countParsers || 0}
                                items={parsers}
                                onDeselectAll={customersSelection.handleDeselectAll}
                                onDeselectOne={customersSelection.handleDeselectOne}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                onSelectAll={customersSelection.handleSelectAll}
                                onSelectOne={customersSelection.handleSelectOne}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                selected={parsers?.filter((parser) => parser.isEnabled).map((parsers) => parsers.id)}
                                updateParsers={mutationUpdateParsers.mutate}
                                //deleteRowHandle={mutation.mutate}
                            />
                                : <Skeleton variant="rounded"
                                            animation="wave"
                                            width={'100%'} height={800} />
                        }
                    </Stack>
                </Container>
            </Box>
            <SnackbarMessage type={snackbarData.type}
                             msg={snackbarData.msg}
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

