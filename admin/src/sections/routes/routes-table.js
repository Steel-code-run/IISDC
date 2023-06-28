import PropTypes from 'prop-types';
import {Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from '@mui/material';
import {Scrollbar} from 'src/components/scrollbar';

import {useEffect, useState} from "react";

export const RoutesTable = (props) => {
    const {
        count = 0,
        items = [],
        onPageChange,
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
    } = props;

    const [fields, setFields] = useState([]);
    useEffect(() => {
        setFields(items)
    }, [items])


    return (
        <Card>
            <Scrollbar>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>

                                <TableCell>
                                    Путь
                                </TableCell>
                                <TableCell>
                                    Метод
                                </TableCell>

                                <TableCell>
                                    Название роли
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fields.length > 0 && fields?.map((route) => {

                                return (
                                    <TableRow
                                        hover
                                        key={route.id}
                                        //selected={isSelected}
                                    >

                                        <TableCell>
                                            {route.path}
                                        </TableCell>

                                        <TableCell>
                                            {route.method}
                                        </TableCell>

                                        <TableCell>
                                            {route?.role?.name}
                                        </TableCell>

                                    </TableRow>
                                )
                                    ;
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[2, 3, 5, 10, 18, 25]}
            />
        </Card>
    );
};

RoutesTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array
};
