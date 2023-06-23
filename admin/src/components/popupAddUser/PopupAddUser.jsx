import React, {useState} from 'react';
import styles from './PopupAddUser.module.scss'
import {Controller, useForm} from "react-hook-form";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addUser} from "../../api/userReq";

const PopupAddUser = ({isOpen, setIsOpen}) => {
    const [errorOnServer, setErrorOnServer] = useState(null);
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newUser) => addUser(newUser), {
            onSuccess: () => queryClient.invalidateQueries(["users"])
        });

    const {
        register, formState: {
            errors
        }, handleSubmit, control,
    } = useForm();
    const onSubmit = async data => {
        try {
            const ans = await mutation.mutateAsync(data);
            if(ans.errors) {
                setErrorOnServer(ans.errors)
            }
            if (!errors?.message && !ans.errors) {
                setIsOpen(!isOpen);

            }
        } catch (error) {
            console.log('Ошибка:', error.message);
        }


    };

    const isFormValid = Object.keys(errors).length === 0;
    console.log(errorOnServer)

    return (
        <div className={styles.popupAddUser}>
            <form className={styles.popupAddUser__form} action="" onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.popupAddUser__fields}>

                    <label>
                        <TextField
                            id="standard-basic"
                            label="Логин"
                            error={!!errors?.name}
                            fullWidth={true}
                            type={'text'}
                            variant="standard" {...register("name", {required: true})}/>
                        {errors.name && errors.name.type === "required" &&
                            <span style={{color: 'red'}}>Это поле обязательно</span>}
                        {errorOnServer && errorOnServer.find(err => err.path === 'name')
                            && <span style={{color: 'red'}}>{errorOnServer.find(err => err.path === 'name')?.msg}</span>}
                    </label>
                    <label>

                        <TextField
                            id="standard-basic"
                            label="Email"
                            error={!!errors?.email}
                            fullWidth={true}
                            type={'email'}
                            variant="standard" {...register("email", {required: true})} />
                        {errors.email && errors.email.type === "required" &&
                            <span style={{color: 'red'}}>Это поле обязательно</span>}
                        {errorOnServer && errorOnServer.find(err => err.path === 'email')
                            && <span style={{color: 'red'}}>{errorOnServer.find(err => err.path === 'email')?.msg}</span>}

                    </label>
                    <label>
                        <TextField
                            id="standard-basic"
                            label="Пароль"
                            error={!!errors.password}
                            fullWidth={true}
                            type={'password'}
                            variant="standard" {...register("password", {required: true})} />
                        {errors.password && errors.password.type === "required" &&
                            <span style={{color: 'red'}}>Это поле обязательно</span>}
                        {errorOnServer && errorOnServer.find(err => err.path === 'password')
                            && <span style={{color: 'red'}}>{errorOnServer.find(err => err.path === 'password')?.msg}</span>}
                    </label>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Выбрать роль</InputLabel>
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: 'Выберите роль' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    size={'small'}
                                    variant={'standard'}
                                    className={styles.popupAddUser__form__select}
                                    labelId="demo-simple-select-label"
                                    id="role"
                                    name={'role'}
                                    value={field.value || ''}
                                    label={"Выбрать роль"}
                                    error={!!errors?.role}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                >
                                    <MenuItem value={2}>Админ</MenuItem>
                                    <MenuItem value={3}>Пользователь</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.role && <span style={{color: 'red'}}>{errors.role.message}</span>}
                    </FormControl>
                    {errorOnServer && errorOnServer[0]?.msg
                        && <span style={{color: 'red'}}>{errorOnServer[0]?.msg}</span>}
                </div>

                <Button variant={'outlined'}
                        className={styles.popupAddUser__form__btn}
                        type={"submit"}
                        disabled={!isFormValid}
                >Создать пользователя</Button>
            </form>
        </div>
    );
};

export default PopupAddUser;
