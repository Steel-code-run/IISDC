import React, {FC, useEffect, useState} from 'react';
import styles from './PageInternships.module.scss';
import {useGetInternshipsQuery} from "../../api/internships.api";
import CardPost from "../../components/CardPost/CardPost";
import Header from "../../components/Header/Header";
import {TInternship, TPostType} from "../../types/serial/parser";
import {Pagination} from "@mui/material";
import Search from "../../components/UI/Search/Search";
import '../../styles/spinner-loader.scss';
import {useNavigate} from "react-router-dom";
import {Dna} from "react-loader-spinner";
import {WithAuthGuard} from "../../hoc/with-auth-guard";
import {directionsList} from "../../config/directions";
import Dropdown from "../../components/UI/Dropdown/Dropdown";

export interface PageInternshipsProps {
}

const PageInternships: FC<PageInternshipsProps> = () => {
    const [amountPostsPerPage, setAmountPostsPerPage] = useState(12);
    const [page, setPage] = useState<number>(1)
    const [amountPages, setAmountPages] = useState<number>(1)
    const [debounceValue, setDebounceValue] = useState<string>('')
    const [choicedDirection, setChoicedDirection] = useState<string[] | string>([])
    const navigate = useNavigate();
    const token = window.sessionStorage.getItem('token');

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


    const {data = [], error, isLoading} = useGetInternshipsQuery({
        take: amountPostsPerPage,
        skip: (page - 1) * amountPostsPerPage,
        extended: true,
        namePost: debounceValue,
        directions: choicedDirection,
        token
    });

    const {count, internships} = data;

    const directions = directionsList;


    useEffect(() => {
        setPage(1)
    }, [debounceValue, setDebounceValue, choicedDirection, setChoicedDirection])


    useEffect(() => {
        setAmountPages(Math.ceil(count / amountPostsPerPage))
    }, [count, setAmountPages, amountPostsPerPage])

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

    if (!directions || isLoading) return <Dna visible={true}
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
                    <div className={styles.pageInternships__directionBlock}>
                        <p className={styles.pageInternships__directionBlock__titleBlock}>{'Направление: '}</p>
                        <Dropdown listDirections={directions}
                                  cbChoicedDirection={setChoicedDirection}/>
                    </div>

                    <div className={styles.pageInternships__wrapper}>
                        <div className={styles.pageInternships__posts}>
                            {
                                internships?.map((post: TInternship) => {
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
                                                responsibilities: post.responsibilities,
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
                            (count > 0) &&
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