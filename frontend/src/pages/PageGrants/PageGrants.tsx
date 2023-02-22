import React, {FC} from 'react';
import styles from './PageGrants.module.scss';
import {useGetGrantsQuery} from "../../api/posts.api";
import CardPost from "../../components/CardPost/CardPost";
import Header from "../../components/Header/Header";

export interface PageGrantsProps {
}

const PageGrants: FC<PageGrantsProps> = () => {
    const {data = [], error, isLoading} = useGetGrantsQuery();

    console.log(data?.data)

    if (isLoading) return <h1>Is loading...</h1>
    return (
        <>
            <Header/>
            <div className={styles.pageGrants} data-testid="PageGrants">
                <div className="container">
                    <div className={styles.pageGrants__posts}>
                        {
                            data?.data?.map((post: any) => {
                                return (
                                    <CardPost
                                        key={post.id}
                                        dateCreationPost={post.dateCreationPost}
                                        direction={post.direction}
                                        namePost={post.namePost}
                                        organization={post.organization}
                                        deadline={post.deadline}
                                        directionForSpent={post.directionForSpent}
                                        fullText={post.fullText}
                                        link={post.link}
                                        linkPDF={post.link}
                                        summary={post.summary}
                                    />
                                )
                            })
                        }
                    </div>

                </div>

            </div>
        </>

    )
};

export default PageGrants