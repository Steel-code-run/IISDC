import React, {useState} from 'react';
import styles from './PopupAddUser.module.scss'
import {useForm} from "react-hook-form";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addUser} from "../../api/userResponses";

const PopupAddUser = ({isOpen, setIsOpen}) => {
    const [selectedRole, setSelectedRole] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newUser) => addUser(newUser), {
            onSuccess: () => queryClient.invalidateQueries(["users"])
        });

    const {
        register, formState: {
            errors
        }, handleSubmit
    } = useForm();
    const onSubmit = async data => {

        if (!errors?.message) {
            setIsOpen(!isOpen);
            mutation.mutate(data)

        }
    };

    return (
        <div className={styles.popupAddUser}>
            <form className={styles.popupAddUser__form} action="" onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.popupAddUser__fields}>

                    <label>
                        <TextField
                            id="standard-basic"
                            label="Ф.И.О"
                            error={!!errors}
                            fullWidth={true}
                            type={'text'}
                            variant="standard" {...register("name", {required: true})}/>
                        {errors.name && errors.name.type === "required" && <span>Это поле обязательно</span>}
                    </label>
                    <label>

                        <TextField
                            id="standard-basic"
                            label="Email"
                            error={!!errors}
                            fullWidth={true}
                            type={'email'}
                            variant="standard" {...register("email", {required: true})} />
                        {errors.name && errors.name.type === "required" && <span>Это поле обязательно</span>}
                    </label>
                    <label>
                        <TextField
                            id="standard-basic"
                            label="Пароль"
                            error={!!errors}
                            fullWidth={true}
                            type={'password'}
                            variant="standard" {...register("password", {required: true})} />
                        {errors.name && errors.name.type === "required" && <span>Это поле обязательно</span>}
                    </label>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Выбрать роль</InputLabel>
                        <Select
                            {...register("role", {
                                required: true
                            })}
                            size={'small'}
                            variant={'standard'}
                            placeholder={'Выберите роль'}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Выбор роли"
                            value={selectedRole}
                            className={styles.popupAddUser__form__select}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <MenuItem value={2}>Админ</MenuItem>
                            <MenuItem value={3}>Пользователь</MenuItem>
                        </Select>
                    </FormControl>
                        {errors.name && errors.name.type === "required" && <span>Это поле обязательно</span>}
                </div>

                <Button variant={'outlined'}
                        className={styles.popupAddUser__form__btn}
                        type={"submit"}>Создать пользователя</Button>
            </form>
        </div>
    );
};

export default PopupAddUser;
