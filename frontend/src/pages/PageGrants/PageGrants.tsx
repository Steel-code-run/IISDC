import React, {FC, useEffect, useState} from 'react';
import styles from './PageGrants.module.scss';
import {useGetCountGrantsQuery, useGetGrantsQuery} from "../../api/grants.api";
import CardPost from "../../components/CardPost/CardPost";
import Header from "../../components/Header/Header";
import {TGrant, TPostType} from "../../types/serial/parser";
import {Pagination} from "@mui/material";
import Search from "../../components/UI/Search/Search";
import '../../styles/spinner-loader.scss';
import {useNavigate} from "react-router-dom";
import {Dna} from "react-loader-spinner";
import Dropdown from "../../components/UI/Dropdown/Dropdown";
import {directionsList} from "../../config/directions";

export interface PageGrantsProps {
}

const PageGrants: FC<PageGrantsProps> = () => {
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

    const {data: totalCountPosts} = useGetCountGrantsQuery({
        namePost: debounceValue,
        directions: choicedDirection,
        token: token
    });


    const {data = [], error, isLoading} = useGetGrantsQuery({
        take: amountPostsPerPage,
        skip: (page - 1) * amountPostsPerPage,
        extended: true,
        namePost: debounceValue,
        directions: choicedDirection,
        token: token
    });

    const directions = directionsList;

    useEffect(() => {
        setPage(1)
        console.log(choicedDirection)
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
            : navigate('/grants')
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
            <div className={styles.pageGrants} data-testid="PageGrants">
                <div className="container">
                    <Search cbDebounce={setDebounceValue}/>
                    <div className={styles.pageGrants__directionBlock}>
                        <p className={styles.pageGrants__directionBlock__titleBlock}>{'Направление: '}</p>
                        <Dropdown listDirections={directions}
                                  cbChoicedDirection={setChoicedDirection}/>
                    </div>

                    <div className={styles.pageGrants__wrapper}>
                        <div className={styles.pageGrants__posts}>
                            {
                                data?.map((post: TGrant) => {
                                    return (
                                        <CardPost<TPostType.grant>
                                            props={{
                                                dateCreationPost: post.dateCreationPost,
                                                linkPDF: post.linkPDF,
                                                link: post.link,
                                                deadline: post.deadline,
                                                summary: post.summary,
                                                directionForSpent: post.directionForSpent,
                                                fullText: post.fullText,
                                                id: post.id,
                                                directions: JSON.parse(post.directions),
                                                namePost: post.namePost,
                                                organization: post.organization,
                                                timeOfParse: post.timeOfParse,
                                                sourceLink: post.sourceLink
                                            }}
                                            key={post.id}
                                            postType={TPostType.grant}
                                        />
                                    )
                                })
                            }
                        </div>
                        {
                            (data?.length > 0) &&
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

export default PageGrants