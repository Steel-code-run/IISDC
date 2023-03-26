import React, {FC} from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import BurgerMenu from "../UI/BurgerMenu/BurgerMenu";
import LogoutBtn from "../UI/LogoutBtn/LogoutBtn";

export interface HeaderProps {
}

const Header: FC<HeaderProps> = () => {
    const [isBurgerVisibility, setIsBurgerVisibility] = React.useState(false)

    const checkSizeWindow = () => {
        const sizeWindow = window.outerWidth;
        (sizeWindow <= 768) ? setIsBurgerVisibility(true) : setIsBurgerVisibility(false)
    }

    React.useEffect(() => {
        window.addEventListener('resize', () => checkSizeWindow())
        checkSizeWindow()
    }, [])

    return (
        <div className={styles.header} data-testid="Header">
            <div className={'container'}>
                <div className={styles.header__wrapper}>
                    {
                        (!isBurgerVisibility) ?
                            <>
                                <ul className={styles.header__nav}>
                                    {/*<li className={styles.header__nav__navItem}>*/}
                                    {/*    <Link to={'/home'}>Статистика</Link>*/}
                                    {/*</li>*/}
                                    <li className={styles.header__nav__navItem}>
                                        <Link to={'/grants'}>Гранты</Link>
                                    </li>
                                    {/*<li className={styles.header__nav__navItem}>*/}
                                    {/*    <Link to={'/vacancies'}>Вакансии</Link>*/}
                                    {/*</li>*/}
                                    {/*<li className={styles.header__nav__navItem}>*/}
                                    {/*    <Link to={'/internships'}>Стажировки</Link>*/}
                                    {/*</li>*/}
                                    <li className={styles.header__nav__navItem}>
                                        <Link to={'/competitions'}>Конкурсы</Link>
                                    </li>
                                </ul>
                                <div className={styles.header__blockUser}>
                                    {/*<img className={styles.header__avatar} src={Avatar} alt="icon"/>*/}
                                    <LogoutBtn type={'headerBtn'}/>
                                </div>
                            </>

                            : <BurgerMenu/>

                    }
                </div>
            </div>
        </div>

    )
};

export default Header;
