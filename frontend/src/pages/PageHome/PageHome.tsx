import React, {FC} from 'react';
import styles from './PageHome.module.scss';
import Header from "../../components/Header/Header";

export interface PageHomeProps {
}

const PageHome: FC<PageHomeProps> = () => {

    return (
        <>
            <Header/>
            <div className={styles.pageHome} data-testid="PageHome">

                HOME

            </div>
        </>
    )
};

export default PageHome;
