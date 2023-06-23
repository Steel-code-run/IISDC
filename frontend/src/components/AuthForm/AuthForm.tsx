import React, {FC} from 'react';
import styles from './AuthForm.module.scss';
import loginIcon from '../../assets/images/inputLoginIcon.svg';
import passwordIcon from '../../assets/images/inputPasswordIcon.svg';
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/authContext";

export interface AuthFormProps {
}

export interface IFormReceivedData {
    login: string,
    password: string
}

const AuthForm: FC<AuthFormProps> = () => {
    const [serverErrors, setServerErrors] = React.useState('')
    const {
        register, formState: {
            errors
        }, handleSubmit
    } = useForm<IFormReceivedData>()

    const navigate = useNavigate()
    const {state} = useLocation();
    const auth = useAuth();

    const onSubmit = async ({login, password}: IFormReceivedData) => {

        try {

            if(auth?.signIn) {
                await auth?.signIn(login, password);
            }
            navigate('/grants');
        } catch (err: any) {
            if (err) {
                setServerErrors(err.message)
            }
        }
    }

    return (
        <form className={styles.authForm} data-testid="AuthForm" onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.authForm__title}>Система сбора данных</h1>
            <h2 className={styles.authForm__typeForm}>Авторизация</h2>
            <div className={styles.authForm__inputs}>
                <div className={styles.authForm__input}>
                    <img className={styles.authForm__input__inputIcon} src={loginIcon} alt=""/>
                    <input {...register('login', {
                        required: true,

                    })}
                           className={styles.authForm__input__inputLogin} type="text" placeholder={'Логин/Телефон'}/>
                </div>
                <div className={styles.authForm__input}>
                    <img className={styles.authForm__input__inputIcon} src={passwordIcon} alt=""/>
                    <input {...register('password', {
                        required: true,

                    })}
                           className={styles.authForm__input__inputPassword} type="password" placeholder={'Пароль'}/>
                </div>
            </div>
            {
                (errors?.login || errors?.password || serverErrors)
                    ? <p className={styles.authForm__unvalidMessage}>Некорректные учетные данные</p>
                    : null
            }
            {
                (state?.error?.status === 401) ? <p className={styles.authForm__unvalidMessage}>Вы не авторизованы</p>
                    : (state?.error?.originalStatus === 404) ?
                        <p className={styles.authForm__unvalidMessage}>Страница не найдена</p>
                        : null
            }

            <button type={'submit'} className={styles.authForm__btnSubmit}>Продолжить</button>

            {/*<div className={styles.authForm__footerForm}>*/}
            {/*    <p> Забыли <a href="#">пароль?</a></p>*/}
            {/*    <a href="#">Зарегистрироваться</a>*/}
            {/*</div>*/}
        </form>

    )
};

export default AuthForm;
