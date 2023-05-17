import {useCallback, useEffect, useMemo, useState} from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {Box, Button, Container, Stack, SvgIcon, Typography} from '@mui/material';
import {useSelection} from 'src/hooks/use-selection';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {CustomersTable} from 'src/sections/customer/customers-table';
import {CustomersSearch} from 'src/sections/customer/customers-search';
import {applyPagination} from 'src/utils/apply-pagination';
import axios from "axios";
import {createPortal} from "react-dom";
import PopupAddUser from "../components/popupAddUser/PopupAddUser";
import Overlay from "../hocs/Overlay/Overlay";

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
            return customers.map((customer) => customer.id);
        },
        [customers]
    );
};


const Page = () => {
    const portalPopup = document?.getElementById('portal');

    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post('http://localhost:3000/v1/users/get', {
                    skip: 0,
                    take: 0,
                    where: {
                        // name: "admin"
                    }
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' +
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6MiwiaWF0IjoxNjg0MDczMzIwLCJleHAiOjE2ODQxNTk3MjB9.jceAzQVla2WAfPMB1mctsqGSETYwzlIspBfqEQMqUpo'
                    }

                });

            setUsers(response.data);
            setStatus(response.status);
        }

        fetchData()
    }, [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const customers = useCustomers(users, page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);

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
                    Customers | Devias Kit
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
                            (status === 200 && customers.length > 0) &&
                            <CustomersTable
                                count={customers.length}
                                items={customers}
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
