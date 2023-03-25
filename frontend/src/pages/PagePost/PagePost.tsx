import React, {useEffect, useState} from 'react';
import styles from './PagePost.module.scss';
import Header from "../../components/Header/Header";
import {useLocation, useNavigate} from "react-router-dom";
import {isPropsCompetition, isPropsGrant} from "../../types/typeGuards";
import DropdownTags from "../../components/UI/DropdownTags/DropdownTags";
import {useMediaQuery} from "react-responsive";
import {useDeletePostGrantMutation} from "../../api/grants.api";


const PagePost = () => {
    const [isEdit, setIsEdit] = useState(false);
    const location = useLocation();
    const {data, postType} = location.state;

    const isVisionBtns = useMediaQuery({query: '(min-width: 540px)'})

    const convertDate = (date: string) => new Date(date)?.toLocaleDateString();

    const [deletePost] = useDeletePostGrantMutation();
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token')

    useEffect(() => {
        if (!isVisionBtns) {
            setIsEdit(false)
        }
    }, [isVisionBtns])

    const highLightField = (turn: boolean) => (turn) ? ' ' + styles.pagePost__highlightField : '';

    return (
        <>
            <Header/>
            <div className={styles.pagePost} data-testid="PagePost">
                <div className={styles.pagePost__container}>
                    <div className={styles.pagePost__row + ' ' + styles.pagePost__header}>
                        <h1 className={styles.pagePost__namePost}>{data.namePost}</h1>
                        <div className={styles.pagePost__dates}>
                            {(data.dateCreationPost || isEdit) && <div
                                className={styles.pagePost__dateCreationPost}>{'Дата создания поста \n'}
                                <p>{data.dateCreationPost}</p></div>}
                            {(data.deadline || isEdit) && <div
                                className={styles.pagePost__deadline}>{'Дата окончания подачи заявок \n'}
                                <p>{data.deadline}</p></div>}
                        </div>

                    </div>
                    {
                        isPropsGrant(postType, data) &&
                        <>
                            <div
                                className={styles.pagePost__field + ' ' + styles.pagePost__summary + highLightField(isEdit)}>{'Сумма гранта: ' + data.summary}</div>
                            <DropdownTags direction={data.direction} isActiveDropdown={isEdit && isVisionBtns}/>
                            <div className={styles.pagePost__field + highLightField(isEdit)}>{'Организаторы: ' + data.organization}</div>
                            <div
                                className={styles.pagePost__field + highLightField(isEdit)}>{'Направление расходования средств: ' + data.directionForSpent}</div>
                        </>
                    }
                    {
                        isPropsCompetition(postType, data) &&
                        <>
                            <div className={styles.pagePost__field + highLightField(isEdit)}>{'Организаторы: ' + data.organization}</div>
                        </>
                    }
                    {data.fullText &&
                        <div className={styles.pagePost__field + highLightField(isEdit) + ' ' + styles.pagePost__fullText}>{data.fullText}</div>

                    }
                    <div className={styles.pagePost__footerRow}>
                        <div className={styles.pagePost__footer}>
                            <div className={styles.pagePost__links}>
                                {data.link && <a href={data.link} rel="noopener noreferrer" target="_blank"
                                                 className={styles.pagePost__link}>Страница гранта</a>}
                                {data.linkPDF && <a href={data.linkPDF} rel="noopener noreferrer" target="_blank"
                                                    className={styles.pagePost__link}>Прикрепленный файл</a>}
                            </div>
                            <div
                                className={styles.pagePost__timeParsing}>{'Время парсинга: ' + convertDate(data.timeOfParse)}</div>
                        </div>
                        <div className={styles.pagePost__btns}>
                            {
                                (isEdit) ?
                                    <>
                                        {isVisionBtns &&
                                            <>
                                                <button onClick={async () => {
                                                    if (data.id) {
                                                        await deletePost({token, id: data.id});
                                                        navigate('/grants');
                                                    }
                                                }}
                                                        className={styles.pagePost__delete + ' ' + styles.pagePost__btn}>Удалить
                                                </button>
                                                <button onClick={() => {
                                                    setIsEdit(false)
                                                }}
                                                        className={styles.pagePost__save + ' ' + styles.pagePost__btn}>Сохранить
                                                </button>
                                            </>
                                        }
                                    </>
                                    :
                                    <>
                                        {isVisionBtns
                                            && <button onClick={() => setIsEdit(!isEdit)}
                                                       className={styles.pagePost__edit + ' ' + styles.pagePost__btn}>Редактировать</button>}
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
};

export default PagePost;
