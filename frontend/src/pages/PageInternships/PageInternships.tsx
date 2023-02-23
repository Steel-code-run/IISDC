import React, {FC} from 'react';
import styles from './PageInternships.module.scss';
import Header from "../../components/Header/Header";

export interface PageInternshipsProps {
}

const PageInternships: FC<PageInternshipsProps> = () => {
    return (
        <>
            <Header/>
            <div className={styles.pageInternships} data-testid="PageInternships">
                PageInternships Component
            </div>
        </>

    )
};

export default PageInternships;
