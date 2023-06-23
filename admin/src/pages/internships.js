import React, {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {PostsTable} from "../sections/posts/posts-table";
import {deleteInternship, getCountInternships, getInternships, updateInternship} from "../api/posts/InternshipsReq";
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
            return customers?.map((customer) => customer.id);
        },
        [customers]
    );
};


const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();

    const queryClient = useQueryClient();
    const configInternshipsRes = {
        extended: true
    }
    const whereInternships = {
        blackListed: false
    }

    const {data: InternshipsList, status, isLoadingInternship, isErrorInternship} = useQuery(
        ['internships', page * rowsPerPage, rowsPerPage, configInternshipsRes, whereInternships],
        () => getInternships(page * rowsPerPage, rowsPerPage, configInternshipsRes, whereInternships))
    const {data: countInternships} = useQuery(['countInternships'], getCountInternships);


    const mutationArchiveInternship = useMutation(
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

    const mutationDeleteInternship = useMutation(
        (delInternshipId) => deleteInternship(delInternshipId), {
            onSuccess: (res) => {
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

    if (isErrorInternship) {
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
                                    Стажировки
                                </Typography>

                            </Stack>

                        </Stack>
                        {/*<CustomersSearch/>*/}
                        {
                            (status === "success" && InternshipsList.length > 0) ?
                                <PostsTable
                                    type={'internships'}
                                    count={countInternships || 0}
                                    items={InternshipsList}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    deleteRowHandle={mutationDeleteInternship.mutate}
                                    archiveHandle={mutationArchiveInternship.mutate}
                                /> : (status === "loading" && InternshipsList?.length > 0) ? <Skeleton variant="rounded"
                                                                                                  animation="wave"
                                                                                                  width={'100%'}
                                                                                                  height={400}/>
                                    :  <p>Количество стажировок равно 0</p>
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
