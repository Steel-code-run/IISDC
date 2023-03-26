import React, {useEffect, useState} from 'react';
import styles from './PagePost.module.scss';
import Header from "../../components/Header/Header";
import {useLocation, useNavigate} from "react-router-dom";
import {isPropsCompetition, isPropsGrant} from "../../types/typeGuards";
import DropdownTags from "../../components/UI/DropdownTags/DropdownTags";
import {useMediaQuery} from "react-responsive";
import {useDeletePostGrantMutation, useUpdatePostGrantMutation} from "../../api/grants.api";

export interface IUpdateData {
    id: number | undefined,
    organization?: string | null,
    direction?: string | string[] | null,
    directionForSpent?: string | null,
    dateCreationPost: string | null,
    deadline: string | null,
    summary: string | null,
    fullText: string | null
}

const PagePost = () => {
    const location = useLocation();
    const {data, postType} = location.state;

    const [isEdit, setIsEdit] = useState(false);
    const [updateData, setUpdateData] = useState<IUpdateData>({
        id: data.id,
        organization: data.organization,
        direction: data.direction,
        directionForSpent: data.directionForSpent,
        dateCreationPost: data.dateCreationPost,
        deadline: data.deadline,
        summary: data.summary,
        fullText: data.fullText
    })

    const isVisionBtns = useMediaQuery({query: '(min-width: 540px)'})

    const convertDate = (date: string) => new Date(date)?.toLocaleDateString();

    const [deletePost] = useDeletePostGrantMutation();
    const [updatePost] = useUpdatePostGrantMutation();
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
                                <p contentEditable={true}
                                   suppressContentEditableWarning={true}
                                   onInput={(e) => {
                                       const target = e.target as HTMLElement;
                                       setUpdateData({
                                           ...updateData,
                                           dateCreationPost: target.textContent
                                       })
                                   }}
                                >{data.dateCreationPost}</p></div>}
                            {(data.deadline || isEdit) && <div
                                className={styles.pagePost__deadline}>{'Дата окончания подачи заявок \n'}
                                <p contentEditable={true}
                                   suppressContentEditableWarning={true}
                                   onInput={(e) => {
                                       const target = e.target as HTMLElement;
                                       setUpdateData({
                                           ...updateData,
                                           deadline: target.textContent
                                       })
                                   }}
                                >{data.deadline}</p></div>}
                        </div>

                    </div>
                    {
                        isPropsGrant(postType, data) &&
                        <>
                            {
                                data.summary && <div
                                    className={styles.pagePost__field + ' ' + styles.pagePost__summary + highLightField(isEdit)}
                                    contentEditable={true}
                                    suppressContentEditableWarning={true}
                                    onInput={(e) => {
                                        const target = e.target as HTMLElement;
                                        setUpdateData({
                                            ...updateData,
                                            summary: target.textContent
                                        })
                                    }}
                                >{'Сумма гранта: ' + data.summary}</div>
                            }

                            <DropdownTags direction={data.direction}
                                          isActiveDropdown={isEdit && isVisionBtns}
                                          setUpdateData={setUpdateData}
                                          updateData={updateData}
                                          isHighlight={true}/>

                            <div
                                className={styles.pagePost__field + highLightField(isEdit)}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onInput={(e) => {
                                    const target = e.target as HTMLElement;
                                    setUpdateData({
                                        ...updateData,
                                        organization: target.textContent
                                    })
                                }}
                            >{'Организаторы: ' + data.organization}</div>
                            {
                                data.directionForSpent &&
                                <div
                                    contentEditable={true}
                                    suppressContentEditableWarning={true}
                                    onInput={(e) => {
                                        const target = e.target as HTMLElement;
                                        setUpdateData({
                                            ...updateData,
                                            directionForSpent: target.textContent
                                        })
                                    }}
                                    className={styles.pagePost__field + highLightField(isEdit)}>{'Направление расходования средств: ' + data.directionForSpent}</div>
                            }
                        </>
                    }
                    {
                        isPropsCompetition(postType, data) &&
                        <>
                            <div
                                className={styles.pagePost__field + highLightField(isEdit)}>{'Организаторы: ' + data.organization}</div>
                        </>
                    }
                    {data.fullText &&
                        <div
                            className={styles.pagePost__field + highLightField(isEdit) + ' ' + styles.pagePost__fullText}
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onInput={(e) => {
                                const target = e.target as HTMLElement;
                                setUpdateData({
                                    ...updateData,
                                    fullText: target.textContent
                                })
                            }}
                        >{data.fullText}</div>

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
                                                <button onClick={async () => {
                                                    setIsEdit(false);
                                                    await updatePost({updateData, token: window.localStorage.getItem('token')});
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
