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
import {useUniversalDeleteSwitchHook, useUniversalUpdateSwitchHook,} from "../../hooks/universalSwitchHooks";
import {TTypesUpdateData} from "../../types/types";
import classNames from "classnames";
import {initialValuesUpdateData} from "../../helpers/initialValuesUpdateData";
import {WithAuthGuard} from "../../hoc/with-auth-guard";
import {useAuth} from "../../hooks/authContext";
import {TextField} from "@mui/material";
import moment from "moment";


interface ILocationState {
    state: {
        data: any,
        postType: TPostType
    }
}

const PagePost = () => {
    const location: ILocationState = useLocation();
    const {data, postType} = location.state;
    const user = useAuth()

    const [isEdit, setIsEdit] = useState(false);

    const [updateData, setUpdateData] =
        useState<TTypesUpdateData<TPostType>>(initialValuesUpdateData(postType, data));

    useEffect(() => {
        setUpdateData(initialValuesUpdateData(postType, data))
    }, [])

    const isVisionBtns = useMediaQuery({query: '(min-width: 540px)'})

    const convertDate = (date: string) => new Date(date)?.toLocaleDateString();

    const [deletePost] = useUniversalDeleteSwitchHook(postType, data)();
    const [updatePost] = useUniversalUpdateSwitchHook(postType, data)();


    const navigate = useNavigate();
    const token = window.sessionStorage.getItem('token')

    useEffect(() => {
        if (!isVisionBtns) {
            setIsEdit(false)
        }
    }, [isVisionBtns]);

    const handleChangeDataUser = (e: any) => {
        let value = e.target.value
        if(e.target.name === 'deadnline' || e.target.name === 'dateCreationPost') {
            value = formatDateInISOUTC0Full(value)
        }
        setUpdateData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: value,
        }));
    };
    const FORMAT_TIME = 'yyyy-MM-DD';
    const formatDateInISOUTC0 = (date: any) => moment(Date.parse(date))
        .utcOffset(0)
        .format(FORMAT_TIME);
    const formatDateInISOUTC0Full = (data: any) => moment(data, FORMAT_TIME)
        //.utcOffset(0)
        .format('yyyy-MM-DD[T]HH:mm:00.000[Z]');

    const highLightField = (turn: boolean) => (turn) ? styles.pagePost__highlightField : '';


    console.log(formatDateInISOUTC0(updateData.dateCreationPost))
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
                            {(isEdit || updateData?.dateCreationPost) &&
                                <TextField
                                    className={styles.pagePost__dateCreationPost}
                                    label="Дата создания поста"
                                    type="date"
                                    name={'dateCreationPost'}
                                    value={formatDateInISOUTC0(updateData.dateCreationPost)}
                                    onChange={(e) => handleChangeDataUser(e)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            }
                            {
                                (isUpdateDataGrant(postType, updateData)
                                    || isUpdateDataCompetition(postType, updateData)) &&
                                (isEdit || updateData.deadline) &&
                                <TextField
                                    className={styles.pagePost__deadline}
                                    id="date"
                                    label="Дедлайн подачи заявки"
                                    type="date"
                                    name={'deadline'}
                                    value={formatDateInISOUTC0(updateData.deadline)}
                                    onChange={(e) =>
                                        handleChangeDataUser(e)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            }
                        </div>

                    </div>
                    {
                        (isPropsGrant(postType, data) && isUpdateDataGrant(postType, updateData)) &&
                        <>
                            {
                                (isEdit || updateData.summary) && <div
                                    className={classNames(styles.pagePost__field, styles.pagePost__summary, highLightField(
                                        isEdit && !updateData.summary))}
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

                            <DropdownTags direction={data.directions}
                                          isActiveDropdown={isEdit && isVisionBtns}
                                          setUpdateData={setUpdateData}
                                          updateData={updateData}
                                          isHighlight={true}/>

                            {
                                (isEdit || updateData.organization) &&
                                <div
                                    className={classNames(
                                        styles.pagePost__field,
                                        highLightField(isEdit && !updateData.organization))}
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
                                        highLightField(isEdit && !updateData.directionForSpent))}>
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
                                        highLightField(isEdit && !updateData.organization))}
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
                            <DropdownTags
                                direction={data.directions}
                                isActiveDropdown={isEdit && isVisionBtns}
                                setUpdateData={setUpdateData}
                                updateData={updateData}
                                isHighlight={true}/>
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
                                        highLightField(isEdit && !updateData.salary))}
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
                                        highLightField(isEdit && !updateData.requirements))}
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
                                        highLightField(isEdit && !updateData.conditions))}
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
                                highLightField(isEdit && !updateData.fullText),
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
                                                    // if (data.id) {
                                                    //     await deletePost({token, id: data.id});
                                                    // }
                                                    if (updateData['id'])
                                                        delete updateData['id'];

                                                    await updatePost({
                                                        id: data.id,
                                                        updateData: {
                                                            ...updateData,
                                                            blackListed: true,
                                                        },
                                                        token: window.sessionStorage.getItem('token')
                                                    });
                                                    navigate(-1);
                                                }}
                                                        className={classNames(
                                                            styles.pagePost__delete,
                                                            styles.pagePost__btn)}>В архив
                                                </button>
                                                <button onClick={async () => {
                                                    setIsEdit(false);
                                                    if (updateData['id'])
                                                        delete updateData['id'];

                                                    await updatePost({
                                                        id: data.id,
                                                        updateData,
                                                        token: window.sessionStorage.getItem('token')
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
                                        {user?.user?.role?.name === 'admin' && isVisionBtns
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

export default WithAuthGuard(PagePost);
