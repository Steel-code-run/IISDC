import React, {FC} from 'react';
import styles from './PageVacancies.module.scss';
import Header from "../../components/Header/Header";

export interface PageVacanciesProps {
}

const PageVacancies: FC<PageVacanciesProps> = () => {
    return (
        <>
            <Header/>
            <div className={styles.pageVacancies} data-testid="PageVacancies">
                PageVacancies Component
            </div>
        </>

    )
};

export default PageVacancies;
