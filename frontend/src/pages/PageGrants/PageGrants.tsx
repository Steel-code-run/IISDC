import React, {FC} from 'react';
import styles from './PageGrants.module.scss';
import {useGetCountGrantsQuery, useGetDirectionsQuery, useGetGrantsQuery} from "../../api/posts.api";
import CardPost from "../../components/CardGrant/CardPost";
import Header from "../../components/Header/Header";
import {TGrant} from "@iisdc/types";
import {Pagination} from "@mui/material";
import Search from "../../components/UI/Search/Search";
import Dropdown from "../../components/UI/Dropdown/Dropdown";

export interface PageGrantsProps {
}

const PageGrants: FC<PageGrantsProps> = () => {
    const [amountPostsPerPage, setAmountPostsPerPage] = React.useState(12);
    const [page, setPage] = React.useState<number>(1)
    const [amountPages, setAmountPages] = React.useState<number>(1)
    const [debounceValue, setDebounceValue] = React.useState<string>('')
    const [choicedDirection, setChoicedDirection] = React.useState('Все направления')

    const generatorRequestGrant = (type: string) => {

        if(type === 'haveDirection') {
            return {
                limit: amountPostsPerPage,
                from: (page - 1) * amountPostsPerPage,
                namePost: debounceValue,
                direction: choicedDirection
            }
        }
        return {
            limit: amountPostsPerPage,
            from: (page - 1) * amountPostsPerPage,
            namePost: debounceValue,
        }

    }
    const generatorRequestGrantCount = (type: string) => {

        if(type === 'haveDirection') {
            return {
                namePost:debounceValue,
                direction: choicedDirection
            }
        }
        return {
            namePost:debounceValue,
        }

    }

    const {data: totalCountPosts} = useGetCountGrantsQuery(generatorRequestGrantCount(
        (choicedDirection !== 'Все направления')
        ? 'haveDirection'
        : 'noDirection'));

    const {data = [], error, isLoading} = useGetGrantsQuery(
        generatorRequestGrant((choicedDirection !== 'Все направления')
            ? 'haveDirection'
            : 'noDirection'));
    const {data: directions} = useGetDirectionsQuery();

    const checkSizeWindow = () => {
        const sizeWindow = window.outerWidth;
        if(sizeWindow <= 768 && sizeWindow >= 414)  {
            setAmountPostsPerPage(9)
        }
        else if(sizeWindow <= 360) {
            setAmountPostsPerPage(2)
        }
        else if(sizeWindow > 768) {
            setAmountPostsPerPage(12)
        }
    }

    React.useEffect(() => {
        window.addEventListener('resize', () => checkSizeWindow())
        checkSizeWindow()
    }, [])


    React.useEffect(() => {
        setPage(1)
    }, [debounceValue, setDebounceValue, choicedDirection, setChoicedDirection])


    React.useEffect(() => {
        setAmountPages(Math.ceil(totalCountPosts?.data / amountPostsPerPage))
    }, [totalCountPosts, setAmountPages])


    if (isLoading) return <h1>Is loading...</h1>
    return (
        <>
            <Header/>
            <div className={styles.pageGrants} data-testid="PageGrants">
                <div className="container">
                    <Search cbDebounce={setDebounceValue} />
                    <Dropdown listDirections={directions.data} cbChoicedDirection={setChoicedDirection}/>
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