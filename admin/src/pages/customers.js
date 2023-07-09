import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {Box, Button, Container, Skeleton, Stack, SvgIcon, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {CustomersTable} from 'src/sections/customer/customers-table';
import {applyPagination} from 'src/utils/apply-pagination';
import {createPortal} from "react-dom";
import PopupAddUser from "../components/popupAddUser/PopupAddUser";
import Overlay from "../hocs/Overlay/Overlay";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteUser, getCountUser, responseUser} from "../api/userReq";
import {useSelection} from "../hooks/use-selection";
import {useUserQuery} from "../hooks/useUserQuery";
import SnackbarMessage from "../components/snackbarMessage/SnackbarMessage";
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


const Page = options => {
    const portalPopup = document?.getElementById('portal');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');

    const queryClient = useQueryClient()

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();
    const whereUser = {
        ...(
            (!searchValue) ? {} : {
                name: {
                    startsWith: searchValue
                }
            }
        )
    }

    useEffect(() => {
        if(searchValue) {
            setPage(0);
        }
    }, [searchValue])


    const {data: users, status, isLoading, isError} =
        useUserQuery('users',
            responseUser,
            page * rowsPerPage, rowsPerPage, whereUser
        )

    const mutation = useMutation(
        (delUser) => deleteUser(delUser), {
            onSuccess: (res) => {
                queryClient.invalidateQueries(["users"]);
                setOpenSnackbar(true)
                setSnackbarData({
                    msg: res.message,
                    type: 'success'
                })
            }
        });

    const {data: countUsers, isError: isErrorCount} = useQuery(['usersLength', whereUser],
        () => getCountUser(whereUser));

    const [isOpen, setIsOpen] = useState(false);

    const customers = useCustomers(users, page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection
        = useSelection(customersIds);

    // useEffect(() => {
    //     setPage()
    // }, [])


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

    if (isError) {
        return <h1>Ошибка...</h1>
    }
    if(isErrorCount) {
        return <h1>Ошибка при получении числа пользователей...</h1>
    }


    return (
        <>
            {
                createPortal(
                    <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
                        <PopupAddUser/>
                    </Overlay>, portalPopup)
            }
            <Head>
                <title>
                    Пользователи
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
                                    Пользователи
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >

                                </Stack>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => setIsOpen(true)}
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon/>
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                >
                                    Добавить пользователя
                                </Button>
                            </div>
                        </Stack>
                        <CustomersSearch
                            placeholder={'Поиск пользователя'}
                            searchValue={searchValue}
                            handleSearchValue={handleSearch}/>
                        {
                            (status === "success" && users.length > 0) ?
                                <CustomersTable
                                    count={countUsers || 0}
                                    items={[...users].reverse()}
                                    onDeselectAll={customersSelection.handleDeselectAll}
                                    onDeselectOne={customersSelection.handleDeselectOne}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    onSelectAll={customersSelection.handleSelectAll}
                                    onSelectOne={customersSelection.handleSelectOne}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    selected={customersSelection.selected}
                                    deleteRowHandle={mutation.mutate}
                                /> : (status === "loading" && users?.length > 0)
                                    ? <Skeleton variant="rounded"
                                                animation="wave"
                                                width={'100%'} height={400}/>
                                    : (status === "loading" && users?.length <= 0) ?
                                        <p>Количество пользователей равно 0</p>
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
    )
        ;
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
