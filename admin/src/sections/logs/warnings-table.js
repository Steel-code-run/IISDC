import PropTypes from 'prop-types';
import {Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from '@mui/material';
import {Scrollbar} from 'src/components/scrollbar';

import {useEffect, useState} from "react";
import {formatDateTime} from "../../config/formatDate";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateParsingSettings} from "../../api/parsersReq";
import {updateWarnings} from "../../api/logsReq";

export const WarningsTable = (props) => {
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
    const queryClient = useQueryClient();

    const mutationWarn = useMutation(
        (updateWarn) => updateWarnings(updateWarn),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["warnings"])
                // setOpenSnackbar(true);
                // setSnackbarData({
                //     msg: 'Дата успешно установлена',
                //     type: 'success'
                // });
            }
        });


    return (
        <Card>
            <Scrollbar>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>

                                <TableCell>
                                    id
                                </TableCell>
                                <TableCell>
                                    Дата
                                </TableCell>
                                <TableCell>
                                    Имя пользователя
                                </TableCell>
                                <TableCell>
                                    Описание
                                </TableCell>
                                <TableCell>
                                    Тип
                                </TableCell>
                                <TableCell>
                                    Статус
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fields.length > 0 && fields?.map((log) => {

                                return (
                                    <TableRow
                                        sx={{
                                            backgroundColor: '#fccdcd',
                                        }}
                                        hover
                                        key={log.id}
                                        //selected={isSelected}
                                    >

                                        <TableCell>
                                            {log.id}
                                        </TableCell>

                                        <TableCell>
                                            {formatDateTime(new Date(log.date))}
                                        </TableCell>

                                        <TableCell>
                                            {log.user.name}
                                        </TableCell>

                                        <TableCell>
                                            {log.description}
                                        </TableCell>

                                        <TableCell>
                                            {log.type}

                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                               // disabled={isEditFieldDisabled(parser.id, isEdit)}
                                                checked={log?.isSolved}
                                                onChange={(e) => {

                                                    mutationWarn.mutate({
                                                        id: log.id,
                                                        isSolved: e.target.checked
                                                    })

                                                    // if (event.target.checked) {
                                                    //     onSelectOne?.(parser.id);
                                                    //
                                                    // } else {
                                                    //     onDeselectOne?.(parser.id);
                                                    // }
                                                    // setFields(prevState => prevState.map((parser) => {
                                                    //     if (!isEditFieldDisabled(parser.id, isEdit)) {
                                                    //         return {
                                                    //             ...parser,
                                                    //             isEnabled: e.target.checked
                                                    //         }
                                                    //     } else return parser
                                                    // }))

                                                    // updateParsers({
                                                    //     id: parser.id,
                                                    //     isEnabled: e.target.checked,
                                                    //
                                                    // })
                                                }}
                                            />


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

WarningsTable.propTypes = {
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
