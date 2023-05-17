import React, {useState} from 'react';
import styles from './PopupAddUser.module.scss'
import {useForm} from "react-hook-form";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const PopupAddUser = ({isOpen, setIsOpen}) => {

    const [selectedRole, setSelectedRole] = useState('');
    const {
        register, formState: {
            errors
        }, handleSubmit
    } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className={styles.popupAddUser}>
            <form className={styles.popupAddUser__form} action="" onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.popupAddUser__fields}>

                    <label>
                        <TextField
                            id="standard-basic"
                            label="Standard"
                            error={errors}
                            fullWidth={'100%'}
                            placeholder={'Ф.И.О'}
                            variant="standard" {...register("name", {required: true})}/>
                    </label>
                    <label>
                        <TextField
                            id="standard-basic"
                            label="Standard"
                            error={errors}
                            fullWidth={'100%'}
                            type={'email'}
                            variant="standard" {...register("email", {required: true})} />
                    </label>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Выбрать роль</InputLabel>
                        <Select
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
                            <MenuItem value={'Админ'}>Админ</MenuItem>
                            <MenuItem value={'Пользователь'}>Пользователь</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Button variant={'outlined'}
                        className={styles.popupAddUser__form__btn}
                        type={"submit"}
                        onClick={() => setIsOpen(!isOpen)}>Создать пользователя</Button>
            </form>
        </div>
    );
};

export default PopupAddUser;
