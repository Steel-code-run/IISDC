import React, {FC, useEffect, useState} from 'react';
import styles from './PageGrants.module.scss';
import {useGetGrantsQuery} from "../../api/grants.api";
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
import {WithAuthGuard} from "../../hoc/with-auth-guard";
import {rangeDeadlineData} from "../../helpers/formatDate";
import FilterDate from "../../components/filterDate/filterDate";

export interface PageGrantsProps {
}

const PageGrants: FC<PageGrantsProps> = () => {
    const [amountPostsPerPage, setAmountPostsPerPage] = useState(12);
    const [page, setPage] = useState<number>(1)
    const [amountPages, setAmountPages] = useState<number>(1)
    const [debounceValue, setDebounceValue] = useState<string>('')
    const [choicedDirection, setChoicedDirection] = useState<string[] | string>([])
    const [dayDeadline, setDayDeadline] =
        useState(0)
    const [checkedFilter, setCheckedFilter] = useState<boolean>(false);
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



    const {data = [], error, isLoading} = useGetGrantsQuery({
        take: amountPostsPerPage,
        skip: (page - 1) * amountPostsPerPage,
        extended: true,
        namePost: debounceValue,
        directions: choicedDirection,
        token: token,
        ...(
            (checkedFilter) &&
            {
                deadlineBy: rangeDeadlineData(dayDeadline)
            }

        )
    });

    const {count, grants} = data;

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
                    <div className={styles.pageGrants__filterBlock}>
                        <div className={styles.pageGrants__directionBlock}>
                            <p className={styles.pageGrants__directionBlock__titleBlock}>{'Направление: '}</p>
                            <Dropdown listDirections={directions}
                                      cbChoicedDirection={setChoicedDirection}/>
                        </div>

                        <FilterDate dayDeadline={dayDeadline}
                                    setDayDeadline={setDayDeadline}
                                    checkedFilter={checkedFilter}
                                    setCheckedFilter={setCheckedFilter}/>

                    </div>

                    <div className={styles.pageGrants__wrapper}>
                        <div className={styles.pageGrants__posts}>
                            {
                                grants?.map((post: TGrant) => {
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
                                                directions: (post.directions) ? JSON.parse(post.directions) : [],
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

export default WithAuthGuard(PageGrants)