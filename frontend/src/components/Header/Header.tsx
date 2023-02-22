import React, {FC} from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import Avatar from '../../assets/images/Profile.svg'

export interface HeaderProps {
}

const Header: FC<HeaderProps> = () => {
    return (
        <div className={styles.header} data-testid="Header">
            <div className={'container'}>
                <div className={styles.header__wrapper}>
                    <ul className={styles.header__nav}>
                        <li className={styles.header__nav__navItem}>
                            <Link to={'/home'}>Главная</Link>
                        </li>
                        <li className={styles.header__nav__navItem}>
                            <Link to={'/grants'}>Гранты</Link>
                        </li>
                        <li className={styles.header__nav__navItem}>
                            <Link to={'/vacancies'}>Вакансии</Link>
                        </li>
                        <li className={styles.header__nav__navItem}>
                            <Link to={'/internships'}>Стажировки</Link>
                        </li>
                        <li className={styles.header__nav__navItem}>
                            <Link to={'/competitions'}>Конкурсы</Link>
                        </li>
                    </ul>
                    <div className={styles.header__blockUser}>
                        <img className={styles.header__avatar} src={Avatar} alt="icon"/>
                        <button className={styles.header__logout}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Header;
