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
    TextField,
    Typography
} from '@mui/material';
import {Scrollbar} from 'src/components/scrollbar';
import Link from 'next/link'
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';

import {useEffect, useState} from "react";
import {formatDateTime} from "../../config/formatDate";

export const ParsersTable = (props) => {
    const {
        count = 0,
        items = [],
        onPageChange,
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        updateParsers
    } = props;

    // const selectedSome = (selected.length > 0) && (selected.length < items.length);
    // const selectedAll = (items.length > 0) && (selected.length === items.length);

    const [fields, setFields] = useState([]);
    useEffect(() => {
        setFields(items)
    }, [items])

    const [isEdit, setIsEdit] = useState({
        isEditStatus: false,
        id: null
    });

    const isEditFieldDisabled = (id, isEdit) => (isEdit.isEditStatus && !isEdit.id)
        ? true : (isEdit.id !== id)

    return (
        <Card>
            <Scrollbar>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/*<TableCell padding="checkbox">*/}
                                {/*    <Checkbox*/}
                                {/*        checked={selectedAll}*/}
                                {/*        indeterminate={selectedSome}*/}
                                {/*        onChange={(event) => {*/}
                                {/*            if (event.target.checked) {*/}
                                {/*                onSelectAll?.();*/}
                                {/*            } else {*/}
                                {/*                onDeselectAll?.();*/}
                                {/*            }*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*</TableCell>*/}
                                <TableCell>
                                    Имя
                                </TableCell>
                                <TableCell>
                                    Описание
                                </TableCell>
                                <TableCell>
                                    Вкл/выкл
                                </TableCell>
                                <TableCell>
                                    Страницы для парсинга
                                </TableCell>
                                <TableCell>
                                    Cron time
                                </TableCell>
                                <TableCell>
                                    Дата последнего успешного парсинга
                                </TableCell>

                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fields.length > 0 && fields?.map((parser) => {

                                const isSelected = selected.includes(parser.id);

                                return (
                                    <TableRow
                                        hover
                                        key={parser.id}
                                        //selected={isSelected}
                                    >

                                        {/*<TableCell padding="checkbox">*/}
                                        {/*    <Checkbox*/}
                                        {/*        checked={isSelected}*/}
                                        {/*        onChange={(event) => {*/}
                                        {/*            if (event.target.checked) {*/}
                                        {/*                onSelectOne?.(parser.id);*/}
                                        {/*            } else {*/}
                                        {/*                onDeselectOne?.(parser.id);*/}
                                        {/*            }*/}
                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*</TableCell>*/}

                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                    <Typography variant="subtitle2">
                                                        {parser.name}
                                                    </Typography>
                                            </Stack>
                                        </TableCell>

                                        <TableCell>
                                            <TextField disabled={isEditFieldDisabled(parser.id, isEdit)}
                                                       value={parser?.description || ''}
                                                       onChange={(e) => {
                                                           setFields(prevState => prevState.map((parser) => {
                                                               if (!isEditFieldDisabled(parser.id, isEdit)) {
                                                                   return {
                                                                       ...parser,
                                                                       description: e.target.value
                                                                   }
                                                               } else return parser
                                                           }))

                                                       }}/>
                                        </TableCell>

                                        <TableCell>
                                            <Checkbox
                                                disabled={isEditFieldDisabled(parser.id, isEdit)}
                                                checked={parser?.isEnabled}
                                                onChange={(e) => {
                                                    // if (event.target.checked) {
                                                    //     onSelectOne?.(parser.id);
                                                    //
                                                    // } else {
                                                    //     onDeselectOne?.(parser.id);
                                                    // }
                                                    setFields(prevState => prevState.map((parser) => {
                                                        if (!isEditFieldDisabled(parser.id, isEdit)) {
                                                            return {
                                                                ...parser,
                                                                isEnabled: e.target.checked
                                                            }
                                                        } else return parser
                                                    }))

                                                    // updateParsers({
                                                    //     id: parser.id,
                                                    //     isEnabled: e.target.checked,
                                                    //
                                                    // })
                                                }}
                                            />

                                        </TableCell>

                                        <TableCell>
                                            <TextField disabled={isEditFieldDisabled(parser.id, isEdit)}
                                                       value={parser?.pagesToParse || ''}
                                                       onChange={(e) => {
                                                           setFields(prevState => prevState.map((parser) => {
                                                               if (!isEditFieldDisabled(parser.id, isEdit)) {
                                                                   return {
                                                                       ...parser,
                                                                       pagesToParse: +e.target.value
                                                                   }
                                                               } else return parser
                                                           }))

                                                       }}/>

                                        </TableCell>

                                        <TableCell>
                                            <TextField disabled={isEditFieldDisabled(parser.id, isEdit)}
                                                       value={parser?.cronTime || ''}
                                                       onChange={(e) => {
                                                           setFields(prevState => prevState.map((parser) => {
                                                               if (!isEditFieldDisabled(parser.id, isEdit)) {
                                                                   return {
                                                                       ...parser,
                                                                       cronTime: e.target.value
                                                                   }
                                                               } else return parser
                                                           }))

                                                       }}/>

                                        </TableCell>
                                        <TableCell>
                                            {(parser.lastSuccessParse)
                                                ? formatDateTime(new Date(parser.lastSuccessParse))
                                                : ''}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                !isEditFieldDisabled(parser.id, isEdit) &&
                                                <SaveIcon style={{cursor: 'pointer'}} onClick={() => {
                                                    setIsEdit({
                                                        isEditStatus: !isEdit.isEditStatus,
                                                        id: null
                                                    });
                                                    const updateParser = fields.find(parser => parser.id === isEdit.id);

                                                    updateParsers(updateParser)
                                                }}/>
                                            }
                                            <EditIcon onClick={() => setIsEdit({
                                                isEditStatus: !isEdit.isEditStatus,
                                                id: parser.id
                                            })} style={{cursor: 'pointer'}}/>
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

ParsersTable.propTypes = {
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
