import React, {FC} from 'react';
import styles from './PageCompetition.module.scss';
import Header from "../../components/Header/Header";

export interface PageCompetitionProps {
}

const PageCompetition: FC<PageCompetitionProps> = () => {
    return (
        <>
            <Header/>
            <div className={styles.pageCompetition} data-testid="PageCompetition">
                PageCompetition Component
            </div>
        </>

    )
};

export default PageCompetition;
