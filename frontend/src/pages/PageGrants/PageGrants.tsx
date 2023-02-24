import React, {FC} from 'react';
import styles from './PageGrants.module.scss';
import {useGetCountGrantsQuery, useGetGrantsQuery} from "../../api/posts.api";
import CardPost from "../../components/CardGrant/CardPost";
import Header from "../../components/Header/Header";
import {TGrant} from "@iisdc/types";
import {Pagination} from "@mui/material";
import Search from "../../components/UI/Search/Search";


export interface PageGrantsProps {
}

const PageGrants: FC<PageGrantsProps> = () => {
    const amountPostsPerPage = 12;
    const {data: totalPosts} = useGetCountGrantsQuery();
    const amountPages = Math.floor(totalPosts?.data / amountPostsPerPage);
    const [page, setPage] = React.useState<number>(1)

    const {data = [], error, isLoading} = useGetGrantsQuery({
        limit: amountPostsPerPage,
        from: (page - 1) * amountPostsPerPage
    });

    const listNames = data?.data?.map((post: TGrant) => post.namePost)


    if (isLoading) return <h1>Is loading...</h1>
    return (
        <>
            <Header/>
            <div className={styles.pageGrants} data-testid="PageGrants">
                <div className="container">
                    <Search list={listNames}/>
                    <div className={styles.pageGrants__posts}>
                        {
                            data?.data?.map((post: TGrant) => {
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
                                        linkPDF={post.linkPDF}
                                        summary={post.summary}
                                        timeOfParse={post.timeOfParse}
                                    />
                                )
                            })
                        }
                    </div>

                    <Pagination count={amountPages}
                                page={page}
                                onChange={(_, num) => setPage(num)}
                                color="secondary"

                    />
                </div>

            </div>
        </>

    )
};

export default PageGrants