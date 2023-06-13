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

import {useState} from "react";

export const ParsersTable = (props) => {
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
        deleteRowHandle,
        updateParsers
    } = props;

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);

    const [updateField, setUpdateField] = useState();

    const [isEdit, setIsEdit] = useState({
        isEditStatus: false,
        id: null
    });

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

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.length > 0 && items?.map((parser) => {

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
                                                <Link style={{textDecoration: "none", color: "black"}}
                                                      href={`/user/${parser.id}`}>
                                                    <Typography variant="subtitle2">
                                                        {parser.name}
                                                    </Typography>
                                                </Link>
                                            </Stack>
                                        </TableCell>

                                        <TableCell>
                                            <TextField disabled={!isEdit.isEditStatus && isEdit.id !== parser.id}
                                                       value={parser?.description || 'Нет описания'}
                                                       onChange={(e) => {
                                                           setUpdateField({
                                                               id: parser.id,
                                                               description: e.target.value
                                                           })

                                                       }}/>


                                        </TableCell>

                                        <TableCell>
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    // if (event.target.checked) {
                                                    //     onSelectOne?.(parser.id);
                                                    //
                                                    // } else {
                                                    //     onDeselectOne?.(parser.id);
                                                    // }

                                                    updateParsers({
                                                        id: parser.id,
                                                        isEnabled: !isSelected,

                                                    })
                                                }}
                                            />
                                            {/*{parser.isEnabled ? 'Вкл' : 'Выкл'}*/}
                                        </TableCell>

                                        <TableCell>
                                            {parser.pagesToParse}
                                        </TableCell>

                                        <TableCell>
                                            {parser.cronTime}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                isEdit.isEditStatus && isEdit.id === parser.id && <SaveIcon onClick={() => {
                                                    setIsEdit({
                                                    isEditStatus: false,
                                                    id: parser.id
                                                });
                                                    updateParsers(updateField)
                                                }} />
                                            }
                                            <EditIcon onClick={() => setIsEdit({
                                                isEditStatus: true,
                                                id: parser.id
                                            })}
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
