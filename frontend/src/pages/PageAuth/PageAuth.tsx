import React, {FC} from 'react';
import styles from './PageAuth.module.scss';

export interface PageAuthProps {
}

const PageAuth: FC<PageAuthProps> = () => {
    return (
        <div className={styles.pageAuth} data-testid="PageAuth">
            <div className={styles.pageAuth__fon}></div>
            <div className={styles.pageAuth__blockForm}>
                <form action="">
                    <h1 className={styles.pageAuth__title}>Система сбора данных</h1>
                    <h2 className={styles.pageAuth__typeForm}>Авторизация</h2>
                    <input type="text" placeholder={'Логин/Телефон'}/>
                    <input type="password" placeholder={'Пароль'}/>
                    <button className={styles.pageAuth__btnSubmit}>Продолжить</button>
                    <div className={styles.pageAuth__footerForm}>
                        <a href="#">Забыли пароль?</a>
                        <a href="#">Регистрация</a>
                    </div>
                </form>
            </div>
        </div>

    )
};

export default PageAuth;
