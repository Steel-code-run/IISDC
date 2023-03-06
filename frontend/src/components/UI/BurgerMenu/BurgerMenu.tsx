import React, {FC} from 'react';
import styles from './BurgerMenu.module.scss';
import {Link} from "react-router-dom";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

export interface BurgerMenuProps {
}

const BurgerMenu: FC<BurgerMenuProps> = () => {
    const [isActiveBurgerMenu, setIsActiveBurgerMenu] = React.useState<boolean>(false)

    return (
        <div className={styles.burgerMenu} data-testid="BurgerMenu">
            <div onClick={() => setIsActiveBurgerMenu(isActiveBurgerMenu => !isActiveBurgerMenu)}
                 className={styles.burgerMenu__burgerIcon}>
                <div className={(!isActiveBurgerMenu)
                    ? styles.burgerMenu__burgerIcon__line
                    : styles.burgerMenu__burgerIcon__line + ' ' + styles.activeBurgerIcon}></div>
                <div className={(!isActiveBurgerMenu)
                    ? styles.burgerMenu__burgerIcon__line
                    : styles.burgerMenu__burgerIcon__line + ' ' + styles.activeBurgerIcon}></div>
                <div className={(!isActiveBurgerMenu)
                    ? styles.burgerMenu__burgerIcon__line
                    : styles.burgerMenu__burgerIcon__line + ' ' + styles.activeBurgerIcon}></div>
            </div>

            {
                isActiveBurgerMenu &&
                <div className={styles.burgerMenu__menu}>
                    <div className={styles.burgerMenu__wrapper}>
                        <ul className={styles.burgerMenu__nav}>
                            <li className={styles.burgerMenu__nav__navItem}>
                                <Link to={'/home'}>Статистика</Link>
                            </li>
                            <li className={styles.burgerMenu__nav__navItem}>
                                <Link to={'/grants'}>Гранты</Link>
                            </li>
                            {/*<li className={styles.burgerMenu__nav__navItem}>*/}
                            {/*    <Link to={'/vacancies'}>Вакансии</Link>*/}
                            {/*</li>*/}
                            {/*<li className={styles.burgerMenu__nav__navItem}>*/}
                            {/*    <Link to={'/internships'}>Стажировки</Link>*/}
                            {/*</li>*/}
                            <li className={styles.burgerMenu__nav__navItem}>
                                <Link to={'/competitions'}>Конкурсы</Link>
                            </li>
                            <li className={styles.burgerMenu__nav__navItem}>
                                <LogoutBtn type={'burgerBtn'}/>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>

    )
};

export default BurgerMenu;
