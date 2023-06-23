import React, {useEffect, useState} from 'react';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useRouter} from "next/router";
import {Box, Button, Container, Stack, SvgIcon, TextField, Typography} from "@mui/material";
import styles from './competitionPage.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../../components/snackbarMessage/SnackbarMessage";
import {getCompetitions, updateCompetition} from "../../api/posts/competitionsReq";
import {useSnackbar} from "../../hooks/use-snackbar";

const Page = () => {
    const router = useRouter();
    const configResponseGrant = {
        extended: true
    }
    const whereGrant = {
        id: Number(router.query.id)
    }
    const {data, isError, isLoading} = useQuery(['competition', 0, 0, configResponseGrant, whereGrant],
        () => getCompetitions(0, 0, configResponseGrant, whereGrant));

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();

    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [competitionData, setCompetitionData] = useState(null);


    useEffect(() => {
        setCompetitionData(data?.[0])
    }, [data])

    const mutation = useMutation((data) => updateCompetition(data),
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries(["competition"]);
                setOpenSnackbar(true);
                setSnackbarData({
                    type: 'success',
                    msg: 'Конкурс успешно обновлен'
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
    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error...</div>


    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleChangeDataUser = (e) => {
        setCompetitionData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdatedDataUser = () => {
        mutation.mutate({data: competitionData, id: data[0].id});
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
                        variant={'h4'}>Данные гранта: {competitionData?.namePost}</Typography>
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
                                       value={competitionData?.namePost}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />
                            <TextField className={styles.userPage__textField}
                                       label="Дата создания поста"
                                       variant="outlined"
                                       size="small"
                                       name="dateCreationPost"
                                       value={competitionData?.dateCreationPost}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />
                            <TextField className={styles.userPage__textField}
                                       label="Дедлайн"
                                       variant="outlined"
                                       size="small"
                                       name="deadline"
                                       value={competitionData?.deadline}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField className={styles.userPage__textField}
                                       label="Организация"
                                       variant="outlined"
                                       size="small"
                                       name="organization"
                                       value={competitionData?.organization}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField className={styles.userPage__textField}
                                       label="Ссылка на пост"
                                       variant="outlined"
                                       size="small"
                                       name="link"
                                       value={competitionData?.link}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField className={styles.userPage__textField}
                                       label="Ссылка на файл"
                                       variant="outlined"
                                       size="small"
                                       name="linkPDF"
                                       value={competitionData?.linkPDF }
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            {/*<TextField className={styles.userPage__textField}*/}
                            {/*           label="Роль"*/}
                            {/*           variant="outlined"*/}
                            {/*           size="small"*/}
                            {/*           name={"role"}*/}
                            {/*           value={(competitionData) ? competitionData?.role.name : data[0].role.name}*/}
                            {/*           disabled={true}*/}
                            {/*           onChange={handleChangeDataUser}*/}
                            {/*/>*/}

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
