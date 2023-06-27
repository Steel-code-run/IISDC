import React, {useEffect, useState} from 'react';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useRouter} from "next/router";
import {Box, Button, Container, Stack, SvgIcon, TextField, Typography} from "@mui/material";
import styles from './internshipPage.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../../components/snackbarMessage/SnackbarMessage";
import {getInternships, updateInternship} from "../../api/posts/internshipsReq";
import {useSnackbar} from "../../hooks/use-snackbar";
import {formatDateInISOUTC0} from "../../helpers/formatDate";

const Page = () => {
    const router = useRouter();
    const configResponseInternship = {
        extended: true
    }
    const whereInternship = {
        id: Number(router.query.id)
    }
    const {data, isError, isLoading} = useQuery(['internships', 0, 0, configResponseInternship, whereInternship],
        () => getInternships(0, 0, configResponseInternship, whereInternship));

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();

    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [internshipData, setInternshipData] = useState(null);

    useEffect(() => {
        setInternshipData(data?.[0])
    }, [data])

    const mutation = useMutation(
        (data) => updateInternship(data),
        {
            onSuccess: (res) => {

                queryClient.invalidateQueries(["internship"]);
                setOpenSnackbar(true);
                setSnackbarData({
                    type: 'success',
                    msg: 'Стажировка успешно обновлена'
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
        setInternshipData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdatedDataUser = () => {
        mutation.mutate({id: data[0].id, data: internshipData});
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
                        variant={'h4'}>Данные стажировки: {internshipData?.namePost}</Typography>
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
                                       value={internshipData?.namePost}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField
                                className={styles.internshipPage__textField}
                                label="Дата создания поста"
                                type="date"
                                name={'dateCreationPost'}
                                value={formatDateInISOUTC0(internshipData?.dateCreationPost)}
                                onChange={handleChangeDataUser}
                                disabled={!isEditing}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />


                            <TextField className={styles.userPage__textField}
                                       label="Организация"
                                       variant="outlined"
                                       size="small"
                                       name="organization"
                                       value={internshipData?.organization}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />
                            <TextField className={styles.userPage__textField}
                                       label="responsibility"
                                       variant="outlined"
                                       size="small"
                                       name="responsibility"
                                       value={internshipData?.responsibility}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField className={styles.userPage__textField}
                                       label="Ссылка на пост"
                                       variant="outlined"
                                       size="small"
                                       name="link"
                                       value={internshipData?.link}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField className={styles.userPage__textField}
                                       label="Ссылка на файл"
                                       variant="outlined"
                                       size="small"
                                       name="linkPDF"
                                       value={internshipData?.linkPDF }
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />
                            <TextField className={styles.userPage__textField}
                                       label="Описание"
                                       variant="outlined"
                                       size="medium"
                                       multiline
                                       name="fullText"
                                       value={internshipData?.fullText }
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
