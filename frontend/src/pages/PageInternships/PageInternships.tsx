import React, {FC, useEffect, useState} from 'react';
import styles from './PageInternships.module.scss';
import {useGetCountInternshipsQuery, useGetInternshipsQuery} from "../../api/internships.api";
import CardPost from "../../components/CardPost/CardPost";
import Header from "../../components/Header/Header";
import {TInternship, TPostType} from "../../types/serial/parser";
import {Pagination} from "@mui/material";
import Search from "../../components/UI/Search/Search";
import '../../styles/spinner-loader.scss';
import {useNavigate} from "react-router-dom";
import {Dna} from "react-loader-spinner";
import {useGetDirectionsQuery} from "../../api/auxiliaryRequests.api";
import {WithAuthGuard} from "../../hoc/with-auth-guard";

export interface PageInternshipsProps {
}

const PageInternships: FC<PageInternshipsProps> = () => {
    const [amountPostsPerPage, setAmountPostsPerPage] = useState(12);
    const [page, setPage] = useState<number>(1)
    const [amountPages, setAmountPages] = useState<number>(1)
    const [debounceValue, setDebounceValue] = useState<string>('')
    const [choicedDirection, setChoicedDirection] = useState<string[] | string>([])
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');

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

    const {data: totalCountPosts} = useGetCountInternshipsQuery({
        namePost: debounceValue,
        direction: choicedDirection,
        token: token
    });

    const {data = [], error, isLoading} = useGetInternshipsQuery({
        limit: amountPostsPerPage,
        from: (page - 1) * amountPostsPerPage,
        namePost: debounceValue,
        direction: choicedDirection,
        token: token
    });

    const {data: directions} = useGetDirectionsQuery({
        token: token
    });

    useEffect(() => {
        setPage(1)
    }, [debounceValue, setDebounceValue, choicedDirection, setChoicedDirection])


    useEffect(() => {
        setAmountPages(Math.ceil(totalCountPosts / amountPostsPerPage))
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
            : navigate('/internships')
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
                                                sourceLink: post.sourceLink
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

export default WithAuthGuard(PageInternships)