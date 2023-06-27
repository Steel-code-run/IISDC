import React, {useEffect, useState} from 'react';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useRouter} from "next/router";
import {Box, Button, Container, Stack, SvgIcon, TextField, Typography} from "@mui/material";
import styles from './grantPage.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../../components/snackbarMessage/SnackbarMessage";
import {getGrants, updateGrant} from "../../api/posts/grantsReq";
import {useSnackbar} from "../../hooks/use-snackbar";
import {formatDateInISOUTC0} from "../../helpers/formatDate";
import ListChips from "../../components/listChips/ListChips";

const Page = () => {
    const router = useRouter();
    const configResponseGrant = {
        extended: true
    }
    const whereGrant = {
        id: Number(router.query.id)
    }
    const {data, isError, isLoading, status} = useQuery(['grants', 0, 0, configResponseGrant, whereGrant],
        () => getGrants(0, 0, configResponseGrant, whereGrant));



    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();

    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [grantData, setGrantData] = useState(null);
    const [selectChips, setSelectChips] = useState([]);

    useEffect(() => {

            setGrantData(data?.[0]);
            setSelectChips((data?.[0]?.directions) ? JSON.parse(data?.[0]?.directions) : []);

    }, [data, setSelectChips])



    const mutation = useMutation(
        (data) => updateGrant(data),
        {
            onSuccess: (res) => {

                queryClient.invalidateQueries(["grants"]);
                setOpenSnackbar(true);
                setSnackbarData({
                    type: 'success',
                    msg: 'Грант успешно обновлен'
                });
            },
            onError: (err) => {
                setOpenSnackbar(true);
                setSnackbarData({
                    type: 'error',
                    msg: JSON.stringify(err)
                })

            },

        });

    if (isLoading || status === "loading") return <div>Loading...</div>
    if (isError) return <div>Error...</div>


    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleChangeDataUser = (e) => {
        setGrantData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdatedDataUser = () => {
        mutation.mutate({id: data[0].id, data: {
            ...grantData,
                directions: JSON.stringify(selectChips)
            }});
        setIsEditing(false);
    }


    return (
        <>
            <Box className={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Container>
                    <Typography
                        variant={'h4'}>Данные гранта: {grantData?.namePost}</Typography>
                    <Stack component={'user'}>
                        {data && <Box style={{
                            marginTop: '50px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px 0'
                        }}>

                            <TextField className={styles.userPage__textField}
                                       label="Имя поста"
                                       variant="outlined"
                                       size="small"
                                       name="namePost"
                                       value={grantData?.namePost}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField
                                className={styles.grantPage__textField}
                                label="Дата создания поста"
                                type="date"
                                name={'dateCreationPost'}
                                value={formatDateInISOUTC0(grantData?.dateCreationPost)}
                                onChange={handleChangeDataUser}
                                disabled={!isEditing}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                className={styles.grantPage__textField}
                                label="Дедлайн"
                                type="date"
                                name={'deadline'}
                                value={formatDateInISOUTC0(grantData?.deadline)}
                                onChange={handleChangeDataUser}
                                disabled={!isEditing}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField className={styles.userPage__textField}
                                       label="Сумма"
                                       variant="outlined"
                                       size="small"
                                       name="summary"
                                       value={grantData?.summary}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <ListChips
                                setSelectChips={setSelectChips}
                                selectChips={selectChips}
                                />

                            <TextField className={styles.userPage__textField}
                                       label="Организация"
                                       variant="outlined"
                                       size="small"
                                       name="organization"
                                       value={grantData?.organization}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />
                            <TextField className={styles.userPage__textField}
                                       label="Направление расходывания средств"
                                       variant="outlined"
                                       size="small"
                                       name="directionForSpent"
                                       value={grantData?.directionForSpent}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField className={styles.userPage__textField}
                                       label="Ссылка на пост"
                                       variant="outlined"
                                       size="small"
                                       name="link"
                                       value={grantData?.link}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField className={styles.userPage__textField}
                                       label="Ссылка на файл"
                                       variant="outlined"
                                       size="small"
                                       name="linkPDF"
                                       value={grantData?.linkPDF}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />
                            <TextField className={styles.userPage__textField}
                                       label="Описание"
                                       variant="outlined"
                                       size="medium"
                                       multiline
                                       name="fullText"
                                       value={grantData?.fullText}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />


                            <Stack
                                direction="row"
                                spacing={2}>

                                <Button
                                    onClick={handleEdit}
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <EditIcon/>
                                        </SvgIcon>
                                    )}
                                    sx={{
                                        width: '200px',
                                    }}
                                    variant="contained"
                                >
                                    {isEditing ? 'Завершить редактирование' : 'Редактировать'}
                                </Button>
                                {isEditing && (
                                    <Button
                                        variant="contained"
                                        size={'small'}
                                        sx={{
                                            width: '150px',
                                        }}
                                        onClick={handleUpdatedDataUser}>
                                        Сохранить
                                    </Button>
                                )}
                            </Stack>

                        </Box>}

                    </Stack>

                </Container>
            </Box>
            <SnackbarMessage msg={snackbarData.msg}
                             type={snackbarData.type}
                             openSnackbar={openSnackbar}
                             setOpenSnackbar={setOpenSnackbar}/>
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
