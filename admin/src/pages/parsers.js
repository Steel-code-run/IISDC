import {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {applyPagination} from 'src/utils/apply-pagination';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useSelection} from "../hooks/use-selection";
import {getCountParsers, getParsers, updateParsers} from "../api/parsersResponse";
import {ParsersTable} from "../sections/parsers/parsers-table";
import {ParsersSearch} from "../sections/parsers/parsers-search";


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

    const queryClient = useQueryClient();
    const {data: parsers, status, isLoading, isError } =
        useQuery(['parsers', page*rowsPerPage, rowsPerPage],
            () => getParsers(page*rowsPerPage, rowsPerPage)
    );

    const {data: countParsers} = useQuery(['parsersCount'], getCountParsers );
    const mutationUpdateParsers = useMutation(
        (updateData) => updateParsers(updateData), {
            onSuccess: () => queryClient.invalidateQueries(['parsers'])
        })

    const [isOpen, setIsOpen] = useState(false);

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

    if (isLoading) {
        return <h1>Загрузка...</h1>
    }
    if (isError) {
        return <h1>Ошибка...</h1>
    }



    return (
        <>
            {/*{*/}
            {/*    createPortal(*/}
            {/*        <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>*/}
            {/*            <PopupAddUser/>*/}
            {/*        </Overlay>, portalPopup)*/}
            {/*}*/}
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
                            {/*<div>*/}
                            {/*    <Button*/}
                            {/*        onClick={() => setIsOpen(true)}*/}
                            {/*        startIcon={(*/}
                            {/*            <SvgIcon fontSize="small">*/}
                            {/*                <PlusIcon/>*/}
                            {/*            </SvgIcon>*/}
                            {/*        )}*/}
                            {/*        variant="contained"*/}
                            {/*    >*/}
                            {/*        Добавить пользователя*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                        </Stack>
                        <ParsersSearch/>
                        {
                            (status === "success" && parsers?.length > 0) &&
                            <ParsersTable
                                count={countParsers || 0}
                                items={[...parsers].reverse()}
                                onDeselectAll={customersSelection.handleDeselectAll}
                                onDeselectOne={customersSelection.handleDeselectOne}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                onSelectAll={customersSelection.handleSelectAll}
                                onSelectOne={customersSelection.handleSelectOne}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                selected={customersSelection.selected}
                                updateParsers={mutationUpdateParsers.mutate}
                                //deleteRowHandle={mutation.mutate}
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
