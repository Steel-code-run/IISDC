import PropTypes from 'prop-types';
import React from 'react'
import {
    Box,
    Card,
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
import ArchiveIcon from "@mui/icons-material/Archive";

export const PostsTable = (props) => {
    const {
        type,
        count = 0,
        items = [],
        onPageChange,
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        deleteRowHandle,
        archiveHandle
    } = props;

    const defineLinkPost = (type, id) => {
        switch (type) {
            case 'grant':
                return `/grant/${id}`;
            case 'competition':
                return `/competition/${id}`;
            case 'internship':
                return `/internship/${id}`;
            default:
                return '/'
        }
    }

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
                                    Id
                                </TableCell>
                                <TableCell>
                                    Название поста
                                </TableCell>
                                <TableCell>
                                    Ссылка
                                </TableCell>
                                <TableCell align={'center'}>
                                    Убрать в архив
                                </TableCell>
                                <TableCell>
                                    Удалить
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.length > 0 && items?.map((post) => {

                                return (
                                    <TableRow
                                        //hover
                                        key={post.id}
                                    >

                                        {/*<TableCell padding="checkbox">*/}
                                        {/*    <Checkbox*/}
                                        {/*        checked={isSelected}*/}
                                        {/*        onChange={(event) => {*/}
                                        {/*            if (event.target.checked) {*/}
                                        {/*                onSelectOne?.(post.id);*/}
                                        {/*            } else {*/}
                                        {/*                onDeselectOne?.(post.id);*/}
                                        {/*            }*/}
                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*</TableCell>*/}
                                        <TableCell>
                                            {post.id}
                                        </TableCell>

                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Link style={{textDecoration: "none", color: "black"}}
                                                      href={defineLinkPost(type, post.id)}>
                                                    <Typography variant="subtitle2">
                                                        {post.namePost}
                                                    </Typography>
                                                </Link>
                                            </Stack>
                                        </TableCell>


                                        <TableCell>
                                            {post.link}
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            <ArchiveIcon
                                                onClick={() => archiveHandle(
                                                    {
                                                        id: post.id,
                                                        data: {
                                                            blackListed: true
                                                        }
                                                    }
                                                )} style={{cursor: ' pointer'}}/>
                                        </TableCell>


                                        <TableCell align={'center'}>
                                            <DeleteIcon onClick={() => deleteRowHandle(post.id)}
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

PostsTable.propTypes = {
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
