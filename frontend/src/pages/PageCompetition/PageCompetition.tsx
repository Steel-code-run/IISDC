import React, {FC, useEffect, useState} from 'react';
import styles from './PageCompetition.module.scss';
import Header from "../../components/Header/Header";
import {TCompetition, TPostType} from "../../types/serial/parser";
import {Pagination} from "@mui/material";
import Search from "../../components/UI/Search/Search";
import {Dna} from "react-loader-spinner";
import '../../styles/spinner-loader.scss';
import {useGetCompetitionsQuery,} from "../../api/competitions.api";
import Dropdown from "../../components/UI/Dropdown/Dropdown";
import CardPost from "../../components/CardPost/CardPost";
import {directionsList} from "../../config/directions";
import {WithAuthGuard} from "../../hoc/with-auth-guard";
import {useNavigate} from 'react-router-dom'
import FilterDate from "../../components/filterDate/filterDate";
import {rangeDeadlineData} from "../../helpers/formatDate";

export interface PageCompetitionsProps {
}

const PageCompetitions: FC<PageCompetitionsProps> = () => {
    const [amountPostsPerPage, setAmountPostsPerPage] = useState(10);
    const [page, setPage] = useState<number>(1)
    const [amountPages, setAmountPages] = useState<number>(1)
    const [debounceValue, setDebounceValue] = useState<string>('')
    const [choicedDirection, setChoicedDirection] = useState<string[] | string>([])
    const [dayDeadline, setDayDeadline] = useState(0)
    const [checkedFilter, setCheckedFilter] = useState<boolean>(false);
    const navigate = useNavigate();

    const token = window.sessionStorage.getItem('token');

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


    const {data = [], error, isLoading} = useGetCompetitionsQuery({
        take: amountPostsPerPage,
        skip: (page - 1) * amountPostsPerPage,
        extended: true,
        namePost: debounceValue,
        directions: choicedDirection,
        token,
        ...(
            (checkedFilter) &&
            {
                deadlineBy: rangeDeadlineData(dayDeadline)
            }

        )
    });

    const {count, competitions} = data;

    //const {data: directions} = useGetDirectionsQuery({token});
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
            : navigate('/competitions')
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
            <div className={styles.pageCompetition} data-testid="PageCompetition">
                <div className="container">
                    <Search cbDebounce={setDebounceValue}/>
                    <div className={styles.pageCompetition__filterBlock}>
                        <div className={styles.pageCompetition__directionBlock}>
                            <p className={styles.pageCompetition__directionBlock__titleBlock}>{'Направление: '}</p>
                            <Dropdown listDirections={directions}
                                      cbChoicedDirection={setChoicedDirection}/>
                        </div>
                        <FilterDate dayDeadline={dayDeadline}
                                    setDayDeadline={setDayDeadline}
                                    checkedFilter={checkedFilter}
                                    setCheckedFilter={setCheckedFilter}/>
                    </div>

                    <div className={styles.pageCompetition__wrapper}>
                        <div className={styles.pageCompetition__posts}>
                            {
                                competitions?.map((post: TCompetition) => {
                                    return (
                                        <CardPost<TPostType.competition>
                                            props={{
                                                dateCreationPost: post.dateCreationPost,
                                                linkPDF: post.linkPDF,
                                                link: post.link,
                                                deadline: post.deadline,
                                                fullText: post.fullText,
                                                id: post.id,
                                                directions: (post.directions) ? JSON.parse(post.directions) : [],
                                                namePost: post.namePost,
                                                organization: post.organization,
                                                timeOfParse: post.timeOfParse,
                                                sourceLink: post.sourceLink
                                            }}
                                            key={post.id}
                                            postType={TPostType.competition}
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

export default WithAuthGuard(PageCompetitions)