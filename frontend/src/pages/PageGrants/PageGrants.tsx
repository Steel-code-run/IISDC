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
    const [amountPostsPerPage, setAmountPostsPerPage] = React.useState(12);
    const [page, setPage] = React.useState<number>(1)
    const [amountPages, setAmountPages] = React.useState<number>(1)
    const [debounceValue, setDebounceValue] = React.useState<string>('')

    const {data: totalCountPosts} = useGetCountGrantsQuery(debounceValue);

    const checkSizeWindow = () => {
        const sizeWindow = window.outerWidth;
        if(sizeWindow <= 768 && sizeWindow >= 414)  {
            setAmountPostsPerPage(9)
        }
        else if(sizeWindow <= 360) {
            setAmountPostsPerPage(2)
        }
    }

    React.useEffect(() => {
        window.addEventListener('resize', () => checkSizeWindow())
        checkSizeWindow()
    }, [])

    React.useEffect(() => {
        setAmountPages(Math.ceil(totalCountPosts?.data / amountPostsPerPage))
    }, [totalCountPosts, setAmountPages])

    const {data = [], error, isLoading} = useGetGrantsQuery({
        limit: amountPostsPerPage,
        from: (page - 1) * amountPostsPerPage,
        namePost: debounceValue
    });

    const {data: totalPosts} = useGetGrantsQuery({
        limit: totalCountPosts?.data,
        from: 0,
        namePost: ''
    });


    const listNames = totalPosts?.data?.map((post: TGrant) => {
        return {
            id: post.id,
            namePost: post.namePost,
        }
    })


    if (isLoading) return <h1>Is loading...</h1>
    return (
        <>
            <Header/>
            <div className={styles.pageGrants} data-testid="PageGrants">
                <div className="container">
                    <Search cbDebounce={setDebounceValue} list={listNames}/>
                    <div className={styles.pageGrants__wrapper}>
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
                                    onChange={(_, num) => setPage(num)}/>

                    </div>
                </div>

            </div>
        </>

    )
};

export default PageGrants