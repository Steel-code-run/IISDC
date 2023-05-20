import {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {Box, Button, Container, Stack, SvgIcon, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {CustomersTable} from 'src/sections/customer/customers-table';
import {CustomersSearch} from 'src/sections/customer/customers-search';
import {applyPagination} from 'src/utils/apply-pagination';
import {createPortal} from "react-dom";
import PopupAddUser from "../components/popupAddUser/PopupAddUser";
import Overlay from "../hocs/Overlay/Overlay";
import {useQuery} from "@tanstack/react-query";
import {responseUser} from "../api/userResponses";
import {useSelection} from "../hooks/use-selection";

// const data = [
//     {
//         id: '5e887ac47eed253091be10cb',
//         createdAt: subDays(subHours(now, 7), 1).getTime(),
//         email: 'carson.darrin@devias.io',
//         name: 'Carson Darrin',
//         phone: '304-428-3097'
//     },
//     {
//         id: '5e887b209c28ac3dd97f6db5',
//         createdAt: subDays(subHours(now, 1), 2).getTime(),
//         email: 'fran.perez@devias.io',
//         name: 'Fran Perez',
//         phone: '712-351-5711'
//     },
//
// ];

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
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const {data: users, status, isLoading, isError} = useQuery(
        ['users', page, rowsPerPage],
        () => responseUser(page*rowsPerPage, rowsPerPage),

    )

    const {data} = useQuery(
        ['usersLength'],
        () => responseUser(0, 0)
    )


    const [isOpen, setIsOpen] = useState(false);

    const customers = useCustomers(users, page, rowsPerPage);
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

    if (isLoading) {
        return <h1>Загрузка...</h1>
    }
    if (isError) {
        return <h1>Ошибка...</h1>
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
                    Customers
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
                                    Customers
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
                                    Add
                                </Button>
                            </div>
                        </Stack>
                        <CustomersSearch/>
                        {
                            (status === "success" && users.length > 0) &&
                            <CustomersTable
                                count={data?.length}
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
