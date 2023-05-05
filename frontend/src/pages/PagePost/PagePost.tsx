import React, {useEffect, useState} from 'react';
import styles from './PagePost.module.scss';
import Header from "../../components/Header/Header";
import {useLocation, useNavigate} from "react-router-dom";
import {
    isPropsCompetition,
    isPropsGrant,
    isPropsInternship,
    isUpdateDataCompetition,
    isUpdateDataGrant,
    isUpdateDataInternship
} from "../../types/typeGuards";
import DropdownTags from "../../components/UI/DropdownTags/DropdownTags";
import {useMediaQuery} from "react-responsive";
import {TPostType} from "../../types/serial/parser";
import {useUniversalDeleteSwitchHook, useUniversalUpdateSwitchHook,} from "../../store/hooks/universalSwitchHooks";
import {TTypesUpdateData} from "../../types/types";
import classNames from "classnames";

interface ILocationState {
    state: {
        data: any,
        postType: TPostType
    }
}

const PagePost = () => {
    const location: ILocationState = useLocation();
    const {data, postType} = location.state;

    const [isEdit, setIsEdit] = useState(false);

    const [updateData, setUpdateData] = useState<TTypesUpdateData>({
        id: data.id,
        organization: data.organization,
        direction: data.direction,
        directionForSpent: data.directionForSpent,
        dateCreationPost: data.dateCreationPost,
        deadline: data.deadline,
        summary: data.summary,
        fullText: data.fullText,
        requirements: data.requirements,
        responsibilities: data.responsibilities,
        conditions: data.conditions,
        salary: data.salary,
        linkPDF: data.linkPDF,
        link: data.link
    })

    const isVisionBtns = useMediaQuery({query: '(min-width: 540px)'})

    const convertDate = (date: string) => new Date(date)?.toLocaleDateString();

    const [deletePost] = useUniversalDeleteSwitchHook(postType, data)();
    const [updatePost] = useUniversalUpdateSwitchHook(postType, data)();

    useEffect(() => {

    }, []);

    const navigate = useNavigate();
    const token = window.localStorage.getItem('token')

    useEffect(() => {
        if (!isVisionBtns) {
            setIsEdit(false)
        }
    }, [isVisionBtns])

    const highLightField = (turn: boolean) => (turn) ? styles.pagePost__highlightField : '';


    return (
        <>
            <Header/>
            <div className={styles.pagePost} data-testid="PagePost">
                <div className={styles.pagePost__container}>
                    <div className={classNames(
                        styles.pagePost__row,
                        styles.pagePost__header)}>
                        <h1 className={classNames(styles.pagePost__namePost)}>{data.namePost}</h1>
                        <div className={classNames(styles.pagePost__dates)}>
                            {(isEdit || updateData.dateCreationPost) && <div
                                className={classNames(
                                    styles.pagePost__dateCreationPost)}>{'Дата создания поста \n'}
                                <p contentEditable={isEdit}
                                   suppressContentEditableWarning={true}
                                   onInput={(e) => {
                                       const target = e.target as HTMLElement;
                                       setUpdateData({
                                           ...updateData,
                                           dateCreationPost: target.textContent
                                       })
                                   }}
                                >{data.dateCreationPost}</p></div>}
                            {
                                (isUpdateDataGrant(postType, updateData)
                                    || isUpdateDataCompetition(postType, updateData)) &&
                                (isEdit || updateData.deadline) && <div
                                    className={classNames(
                                        styles.pagePost__deadline)}>{'Дата окончания подачи заявок \n'}
                                    <p contentEditable={isEdit}
                                       suppressContentEditableWarning={true}
                                       onInput={(e) => {
                                           const target = e.target as HTMLElement;
                                           setUpdateData({
                                               ...updateData,
                                               deadline: target.textContent
                                           })
                                       }}
                                    >{data.deadline}</p></div>
                            }
                        </div>

                    </div>
                    {
                        (isPropsGrant(postType, data) && isUpdateDataGrant(postType, updateData)) &&
                        <>
                            {
                                (isEdit || updateData.summary) && <div
                                    className={classNames(styles.pagePost__field, styles.pagePost__summary, highLightField(isEdit))}
                                    contentEditable={isEdit}
                                    suppressContentEditableWarning={true}
                                    data-text={'Сумма гранта: '}
                                    onInput={(e) => {
                                        const target = e.target as HTMLElement;
                                        setUpdateData({
                                            ...updateData,
                                            summary: target.textContent
                                        })
                                    }}
                                >{data.summary}</div>
                            }

                            <DropdownTags direction={data.direction}
                                          isActiveDropdown={isEdit && isVisionBtns}
                                          setUpdateData={setUpdateData}
                                          updateData={updateData}
                                          isHighlight={true}/>

                            {
                                (isEdit || updateData.organization) &&
                                <div
                                    className={classNames(
                                        styles.pagePost__field,
                                        highLightField(isEdit))}
                                    contentEditable={isEdit}
                                    suppressContentEditableWarning={true}
                                    data-text={'Организаторы: '}
                                    onInput={(e) => {
                                        const target = e.target as HTMLElement;
                                        setUpdateData({
                                            ...updateData,
                                            organization: target.textContent
                                        })
                                    }}
                                >{data.organization}</div>
                            }
                            {
                                (isEdit || data.directionForSpent) &&
                                <div
                                    contentEditable={isEdit}
                                    suppressContentEditableWarning={true}
                                    data-text={'Направление расходования средств: '}
                                    onInput={(e) => {
                                        const target = e.target as HTMLElement;
                                        setUpdateData({
                                            ...updateData,
                                            directionForSpent: target.textContent
                                        })
                                    }}
                                    className={classNames(
                                        styles.pagePost__field,
                                        highLightField(isEdit))}>
                                    {data.directionForSpent}</div>
                            }
                        </>
                    }
                    {
                        (isPropsCompetition(postType, data) && isUpdateDataCompetition(postType, updateData)) &&
                        <>
                            {
                                (isEdit || updateData.organization) &&
                                <div
                                    className={classNames(
                                        styles.pagePost__field,
                                        highLightField(isEdit))}
                                    contentEditable={isEdit}
                                    suppressContentEditableWarning={true}
                                    data-text={'Организаторы: '}
                                    onInput={(e) => {
                                        const target = e.target as HTMLElement;
                                        setUpdateData({
                                            ...updateData,
                                            organization: target.textContent
                                        })
                                    }}
                                >{data.organization}</div>
                            }
                        </>
                    }
                    {
                        (isPropsInternship(postType, data) && isUpdateDataInternship(postType, updateData)) &&
                        <>
                            {
                                (isEdit || updateData.salary) &&
                                <div
                                    className={classNames(
                                        styles.pagePost__field,
                                        highLightField(isEdit))}
                                    contentEditable={isEdit}
                                    suppressContentEditableWarning={true}
                                    data-text={'Зарплата: '}
                                    onInput={(e) => {
                                        const target = e.target as HTMLElement;
                                        setUpdateData({
                                            ...updateData,
                                            salary: target.textContent
                                        })
                                    }}
                                >{data.salary}</div>

                            }
                            {/*<div className={styles.pagePost__field + highLightField(isEdit)}>{'Возможности: ' + data.responsibilities}</div>*/}
                            {
                                (isEdit || updateData.requirements) &&
                                <div
                                    className={classNames(
                                        styles.pagePost__field,
                                        highLightField(isEdit))}
                                    contentEditable={isEdit}
                                    suppressContentEditableWarning={true}
                                    data-text={'Требования: '}
                                    onInput={(e) => {
                                        const target = e.target as HTMLElement;
                                        setUpdateData({
                                            ...updateData,
                                            requirements: target.textContent
                                        })
                                    }}
                                >{data.requirements}</div>
                            }
                            {
                                (isEdit || updateData.conditions) &&
                                <div
                                    className={classNames(
                                        styles.pagePost__field,
                                        highLightField(isEdit))}
                                    contentEditable={isEdit}
                                    suppressContentEditableWarning={true}
                                    data-text={'Условия: '}
                                    onInput={(e) => {
                                        const target = e.target as HTMLElement;
                                        setUpdateData({
                                            ...updateData,
                                            conditions: target.textContent
                                        })
                                    }}
                                >{data.conditions}</div>
                            }
                        </>
                    }

                    {(isEdit || updateData.fullText?.replace(/(\r\n|\n|\r| )/gm, '')) &&
                        <div
                            className={classNames(
                                styles.pagePost__field,
                                highLightField(isEdit),
                                styles.pagePost__fullText)}
                            contentEditable={isEdit}
                            suppressContentEditableWarning={true}
                            data-text={'Описание: '}
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
                                                 className={styles.pagePost__link}>{
                                    (postType === TPostType.grant) ? 'Страница гранта'
                                        : (postType === TPostType.internship) ? 'Страница стажировки'
                                            : (postType === TPostType.competition) ? 'Страница конкурса'
                                                : 'Ссылка'
                                }</a>}
                                {data.linkPDF && <a href={data.linkPDF} rel="noopener noreferrer" target="_blank"
                                                    className={styles.pagePost__link}>Прикрепленный файл</a>}
                            </div>
                            <div className={styles.pagePost__infoFooter}>

                                <div
                                    className={styles.pagePost__timeParsing}>{'Время парсинга: ' + convertDate(data.timeOfParse)}</div>
                                {
                                    data.sourceLink &&
                                    <a href={data.sourceLink} rel="noopener noreferrer" target="_blank"
                                       className={styles.pagePost__timeParsing}>Source link</a>
                                }
                            </div>

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
                                                        navigate(-1);
                                                    }
                                                }}
                                                        className={classNames(
                                                            styles.pagePost__delete,
                                                            styles.pagePost__btn)}>Удалить
                                                </button>
                                                <button onClick={async () => {
                                                    setIsEdit(false);
                                                    await updatePost({
                                                        updateData,
                                                        token: window.localStorage.getItem('token')
                                                    });
                                                }}
                                                        className={classNames(
                                                            styles.pagePost__save,
                                                            styles.pagePost__btn)}>Сохранить
                                                </button>
                                            </>
                                        }
                                    </>
                                    :
                                    <>
                                        {isVisionBtns
                                            && <button onClick={() => setIsEdit(!isEdit)}
                                                       className={classNames(
                                                           styles.pagePost__edit,
                                                           styles.pagePost__btn)}>Редактировать</button>}
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
