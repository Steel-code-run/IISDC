import React, {FC, useEffect, useState} from 'react';
import styles from './PageCompetition.module.scss';
import Header from "../../components/Header/Header";
import {TGrant} from "@iisdc/types";
import {Pagination} from "@mui/material";
import Search from "../../components/UI/Search/Search";
import {Dna} from "react-loader-spinner";
import '../../styles/spinner-loader.scss';
import {
    useGetCompetitionsQuery,
    useGetCountСompetitionsQuery,
    useGetDirectionsCompetitionsQuery
} from "../../api/competitions.api";
import CardCompetition from "../../components/CardCompetition/CardCompetition";
import Dropdown from "../../components/UI/Dropdown/Dropdown";
import {useNavigate} from "react-router-dom";

export interface PageCompetitionsProps {
}

const PageCompetitions: FC<PageCompetitionsProps> = () => {
    const [amountPostsPerPage, setAmountPostsPerPage] = useState(12);
    const [page, setPage] = useState<number>(1)
    const [amountPages, setAmountPages] = useState<number>(1)
    const [debounceValue, setDebounceValue] = useState<string>('')
    const [choicedDirection, setChoicedDirection] = useState('Все направления')
    const navigate = useNavigate()

    const generatorRequestCompetitions = (type: string) => {

        if (type === 'haveDirection') {
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
    const generatorRequestCompetitionsCount = (type: string) => {

        if (type === 'haveDirection') {
            return {
                namePost: debounceValue,
                direction: choicedDirection
            }
        }
        return {
            namePost: debounceValue,
        }

    }
    const {data: totalCountPosts} = useGetCountСompetitionsQuery(
        generatorRequestCompetitionsCount((choicedDirection !== 'Все направления')
        ? 'haveDirection'
        : 'noDirection'));

    const {data = [], error, isLoading} = useGetCompetitionsQuery(
        generatorRequestCompetitions((choicedDirection !== 'Все направления')
            ? 'haveDirection'
            : 'noDirection'));
    const {data: directions} = useGetDirectionsCompetitionsQuery();

    const checkSizeWindow = () => {
        const sizeWindow = window.outerWidth;
        if (sizeWindow <= 768 && sizeWindow >= 414) {
            setAmountPostsPerPage(9)
        } else if (sizeWindow <= 360) {
            setAmountPostsPerPage(3)
        } else if (sizeWindow > 768) {
            setAmountPostsPerPage(12)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => checkSizeWindow())
        checkSizeWindow()
    }, [])


    useEffect(() => {
        setPage(1)
    }, [debounceValue, setDebounceValue, choicedDirection, setChoicedDirection])


    useEffect(() => {
        setAmountPages(Math.ceil(totalCountPosts?.data / amountPostsPerPage))
    }, [totalCountPosts, setAmountPages, amountPostsPerPage])

    React.useEffect(() => {
        (!error)
            ? navigate('/competitions')
            : navigate('/')
    }, [])

    if (!directions?.data || isLoading) return <Dna visible={true}
                                                    height="250"
                                                    width="250"
                                                    ariaLabel="dna-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="dna-wrapper"/>
    return (
        <>
            <Header/>
            <div className={styles.pageCompetition} data-testid="PageCompetition">
                <div className="container">
                    <Search cbDebounce={setDebounceValue}/>
                    <Dropdown listDirections={directions?.data} cbChoicedDirection={setChoicedDirection}/>


                    <div className={styles.pageCompetition__wrapper}>
                        <div className={styles.pageCompetition__posts}>
                            {
                                data?.data?.map((post: TGrant) => {
                                    return (
                                        <CardCompetition
                                            key={post.id}
                                            id={post.id}
                                            dateCreationPost={post.dateCreationPost}
                                            direction={post.direction}
                                            namePost={post.namePost}
                                            organization={post.organization}
                                            deadline={post.deadline}
                                            fullText={post.fullText}
                                            link={post.link}
                                            linkPDF={post.linkPDF}
                                            timeOfParse={post.timeOfParse}
                                        />
                                    )
                                })
                            }
                        </div>
                        {
                            (data?.data?.length > 0) &&
                            <Pagination count={(amountPages) ? amountPages : 1}
                                        page={page}
                                        defaultPage={page}
                                        siblingCount={0}
                                        boundaryCount={1}
                                        onChange={(_, num) => setPage(num)}/>
                        }

                    </div>
                </div>

            </div>
        </>

    )
};

export default PageCompetitions