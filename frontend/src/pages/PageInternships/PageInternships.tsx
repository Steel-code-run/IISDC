import React, {FC, useEffect, useState} from 'react';
import styles from './PageInternships.module.scss';
import {useGetCountInternshipsQuery, useGetInternshipsQuery} from "../../api/internships.api";
import CardPost from "../../components/CardPost/CardPost";
import Header from "../../components/Header/Header";
import {TInternship, TPostType} from "@iisdc/types";
import {Pagination} from "@mui/material";
import Search from "../../components/UI/Search/Search";
import '../../styles/spinner-loader.scss';
import {useNavigate} from "react-router-dom";
import {Dna} from "react-loader-spinner";
import {useGetDirectionsQuery} from "../../api/grants.api";

export interface PageInternshipsProps {
}

const PageInternships: FC<PageInternshipsProps> = () => {
    const [amountPostsPerPage, setAmountPostsPerPage] = useState(12);
    const [page, setPage] = useState<number>(1)
    const [amountPages, setAmountPages] = useState<number>(1)
    const [debounceValue, setDebounceValue] = useState<string>('')
    const [choicedDirection, setChoicedDirection] = useState<string[] | string>('Все направления')
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');

    const generatorRequestGrant = (type: string) => {

        if (type === 'haveDirection') {
            return {
                limit: amountPostsPerPage,
                from: (page - 1) * amountPostsPerPage,
                namePost: debounceValue,
                direction: choicedDirection,
                token: token
            }
        }
        return {
            limit: amountPostsPerPage,
            from: (page - 1) * amountPostsPerPage,
            namePost: debounceValue,
            token: token
        }
    }

    const generatorRequestGrantCount = (type: string) => {
        if (type === 'haveDirection') {
            return {
                namePost: debounceValue,
                direction: choicedDirection,
                token: token
            }
        }
        return {
            namePost: debounceValue,
            token: token
        }

    }
    const checkSizeWindow = () => {
        const sizeWindow = window.outerWidth;
        if (sizeWindow <= 768 && sizeWindow >= 414) {
            setAmountPostsPerPage(9)
        } else if (sizeWindow <= 360) {
            setAmountPostsPerPage(2)
        } else if (sizeWindow > 768) {
            setAmountPostsPerPage(12)
        }
    }

    const {data: totalCountPosts} = useGetCountInternshipsQuery(generatorRequestGrantCount(
        (choicedDirection !== 'Все направления' && choicedDirection.length > 0)
            ? 'haveDirection'
            : 'noDirection'));

    const {data = [], error, isLoading} = useGetInternshipsQuery(
        generatorRequestGrant((
            choicedDirection !== 'Все направления' && choicedDirection.length > 0)
            ? 'haveDirection'
            : 'noDirection'));

    const {data: directions} = useGetDirectionsQuery({
        token: token
    });

    useEffect(() => {
        setPage(1)
    }, [debounceValue, setDebounceValue, choicedDirection, setChoicedDirection])


    useEffect(() => {
        setAmountPages(Math.ceil(totalCountPosts?.data / amountPostsPerPage))
    }, [totalCountPosts, setAmountPages, amountPostsPerPage])

    React.useEffect(() => {
        window.addEventListener('resize', () => checkSizeWindow())
        checkSizeWindow();
        (error)
            ? navigate('/', {
                state: {
                    error
                }
            })
            : navigate('/Internships')
    }, [isLoading])

    if (!directions?.data || isLoading) return <Dna visible={true}
                                                    height="250"
                                                    width="250"
                                                    ariaLabel="dna-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="dna-wrapper"/>
    return (
        <>
            <Header/>
            <div className={styles.pageInternships} data-testid="PageInternships">
                <div className="container">
                    <Search cbDebounce={setDebounceValue}/>

                    <div className={styles.pageInternships__wrapper}>
                        <div className={styles.pageInternships__posts}>
                            {
                                data?.data?.map((post: TInternship) => {
                                    return (
                                        <CardPost<TPostType.internship>
                                            props={{
                                                dateCreationPost: post.dateCreationPost,
                                                link: post.link,
                                                fullText: post.fullText,
                                                id: post.id,
                                                namePost: post.namePost,
                                                organization: post.organization,
                                                timeOfParse: post.timeOfParse,
                                                requirements: post.requirements,
                                                salary: post.salary,
                                                responsibilities: post.responsibilities,
                                                conditions: post.conditions,
                                                direction: post.direction,
                                            }}
                                            key={post.id}
                                            postType={TPostType.internship}
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

export default PageInternships