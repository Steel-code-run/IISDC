import React, {useCallback, useState} from 'react';
import Head from 'next/head';
import {Box, CircularProgress, Container, Skeleton, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
import {PostsTable} from "../sections/posts/posts-table";
import {deleteInternship, getInternships, updateInternship} from "../api/posts/internshipsReq";
import {useSnackbar} from "../hooks/use-snackbar";
import {CustomersSearch} from "../sections/customer/customers-search";


const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();
    const [searchValue, setSearchValue] = useState('')


    const queryClient = useQueryClient();
    const configInternshipsRes = {
        extended: true
    }
    const whereInternships = {
        blackListed: false,
        ...(
            (!searchValue) ? {} : {
                namePost: {
                    contains: searchValue
                }
            }
        )
    }

    const {data: InternshipsList, status, isLoadingInternship, isErrorInternship} = useQuery(
        ['internships', page * rowsPerPage, rowsPerPage, configInternshipsRes, whereInternships],
        () => getInternships(page * rowsPerPage, rowsPerPage, configInternshipsRes, whereInternships))

    const initialData = {
        count: 0,
        internships: []
    }

    const {count, internships} = (InternshipsList) ? InternshipsList : initialData;


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
    const handleSearch = useCallback((value) => {
        setSearchValue(value)
    })

    if (isErrorInternship) {
        return <h1>Ошибка...</h1>
    }

    if (isLoadingInternship) {
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
                        <CustomersSearch
                            placeholder={'Поиск стажировки'}
                            searchValue={searchValue}
                                         handleSearchValue={handleSearch}/>
                        {
                            (status === "success" && count > 0) ?
                                <PostsTable
                                    type={'internship'}
                                    count={count}
                                    items={internships}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    deleteRowHandle={mutationDeleteInternship.mutate}
                                    archiveHandle={mutationArchiveInternship.mutate}
                                /> : (status === "loading" && count) ? <Skeleton variant="rounded"
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
