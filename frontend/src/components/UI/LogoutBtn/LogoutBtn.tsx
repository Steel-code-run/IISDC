import React, {FC} from 'react';
import styles from './LogoutBtn.module.scss';
import {useNavigate} from "react-router-dom";

export interface LogoutBtnProps {
    type: string
}

const LogoutBtn: FC<LogoutBtnProps> = ({type}) => {
    const navigate = useNavigate()


    const logout = () => {
        window.localStorage.removeItem('token')
        navigate('/')
    }

    return (

        (type === 'burgerBtn')
            ? <div onClick={logout} className={styles.logoutBtnBurger} data-testid="LogoutBtn">Выйти</div>
            : <button onClick={logout} className={styles.logoutBtn} data-testid="LogoutBtn">Выйти</button>



    )
};

export default LogoutBtn;
