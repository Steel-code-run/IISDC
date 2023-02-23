import React, {FC} from 'react';
import styles from './PageCompetition.module.scss';
import Header from "../../components/Header/Header";
import {useGetCompetitionsQuery} from "../../api/posts.api";

export interface PageCompetitionProps {
}

const PageCompetition: FC<PageCompetitionProps> = () => {

    const {data = [], error, isLoading} = useGetCompetitionsQuery();

    if (isLoading) return <h1>Is loading...</h1>

    return (
        <>
            <Header/>
            <div className={styles.pageCompetition} data-testid="PageCompetition">

                <div className="container">
                    <div className={styles.pageCompetition__posts}>
                        {
                            data?.data?.map((post: any) => {

                            })
                        }
                    </div>

                </div>
            </div>
        </>

    )
};

export default PageCompetition;
