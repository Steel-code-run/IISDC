import React, {useEffect, useState} from 'react';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useRouter} from "next/router";
import {useUserQuery} from "../../hooks/useUserQuery";
import {Box, Button, Container, Stack, SvgIcon, TextField, Typography} from "@mui/material";
import styles from './userPage.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import {responseUser, updateUser} from "../../api/userReq";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import SnackbarMessage from "../../components/snackbarMessage/SnackbarMessage";
import {useSnackbar} from "../../hooks/use-snackbar";

const Page = () => {
    const router = useRouter();
    const {data, isError, isLoading} = useUserQuery('user', responseUser, 0, 0, router.query.id);

    const [openSnackbar, setOpenSnackbar, snackbarData, setSnackbarData] = useSnackbar();

    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        setUserData(data?.[0])
    }, [data])

    const mutation = useMutation((data) => updateUser(data),
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries(["users"]);
                setOpenSnackbar(true);
                setSnackbarData({
                    type: 'success',
                    msg: res.data.message
                });
            },
            onError: (err) => {
                setOpenSnackbar(true);
                setSnackbarData({
                    type: 'error',
                    msg: err.response.data.errors[0].msg
                })

            },

        });
    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error...</div>


    const handleEdit = () => {
        setIsEditing(!isEditing)
    }
    const handleCloseSnackbar = () => {
        setOpenSnackbarSuccess(false);
        setOpenSnackbarError(false)
    }

    const handleChangeDataUser = (e) => {
        setUserData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdatedDataUser = () => {
        mutation.mutate({...userData, id: data[0].id});
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
                        variant={'h4'}>Данные пользователя</Typography>
                    <Stack component={'user'}>
                        {data && <Box style={{
                            marginTop: '50px',
                            marginBottom: '40px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px 0'
                        }}>

                            <TextField className={styles.userPage__textField}
                                       label="Имя"
                                       variant="outlined"
                                       size="small"
                                       name="name"
                                       value={(userData) ? userData?.name : data[0].name}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField className={styles.userPage__textField}

                                       label="Email"
                                       variant="outlined"
                                       size="small"
                                       name="email"
                                       value={(userData) ? userData?.email : data[0].email}
                                       disabled={!isEditing}
                                       onChange={handleChangeDataUser}
                            />

                            <TextField className={styles.userPage__textField}
                                       label="Роль"
                                       variant="outlined"
                                       size="small"
                                       name={"role"}
                                       value={(userData) ? userData?.role.name : data[0].role.name}
                                       disabled={true}
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
