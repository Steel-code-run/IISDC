import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import {Scrollbar} from 'src/components/scrollbar';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link'

export const CustomersTable = (props) => {
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange,
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        deleteRowHandle
    } = props;

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);

    return (
        <Card>
            <Scrollbar>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedAll}
                                        indeterminate={selectedSome}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                onSelectAll?.();
                                            } else {
                                                onDeselectAll?.();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    Имя
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Роль
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.length > 0 && items?.map((customer) => {

                                const isSelected = selected.includes(customer.id);

                                return (
                                    <TableRow
                                        hover
                                        key={customer.id}
                                        selected={isSelected}
                                    >

                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        onSelectOne?.(customer.id);
                                                    } else {
                                                        onDeselectOne?.(customer.id);
                                                    }
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Link style={{textDecoration: "none", color: "black"}}
                                                      href={`/user/${customer.id}`}>
                                                    <Typography variant="subtitle2">
                                                        {customer.name}
                                                    </Typography>
                                                </Link>
                                            </Stack>
                                        </TableCell>

                                        <TableCell>
                                            {customer.email}
                                        </TableCell>

                                        <TableCell>
                                            {customer.role.name}
                                        </TableCell>

                                        <TableCell>
                                            <DeleteIcon onClick={() => deleteRowHandle({id: customer.id})}
                                                        style={{cursor: ' pointer'}}/>
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
                rowsPerPageOptions={[2, 3, 5, 10, 25]}
            />
        </Card>
    );
};

CustomersTable.propTypes = {
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
