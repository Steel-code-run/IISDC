import React, {FC} from 'react';
import styles from './LogoutBtn.module.scss';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../hooks/authContext";

export interface LogoutBtnProps {
    type: string
}

const LogoutBtn: FC<LogoutBtnProps> = ({type}) => {
    const navigate = useNavigate();
    const auth = useAuth();

    const logout = async () => {
        console.log('sdf')
        try {
            //@ts-ignore
            await auth?.signOut();
            navigate('/')
        } catch (e) {
            console.log(e)
        }

    }

    return (

        (type === 'burgerBtn')
            ? <div onClick={logout} className={styles.logoutBtnBurger} data-testid="LogoutBtn">Выйти</div>
            : <button onClick={logout} className={styles.logoutBtn} data-testid="LogoutBtn">Выйти</button>


    )
};

export default LogoutBtn;
