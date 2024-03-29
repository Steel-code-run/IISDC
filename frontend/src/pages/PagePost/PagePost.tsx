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
import {FORMAT_DATE, ISO_FULL_DATE} from "../../constants/timeConstants";


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

    const formatDateInISOUTC0 = (date: any) => moment(Date.parse(date))
        .utcOffset(0)
        .format(FORMAT_DATE);
    const formatDateInISOUTC0Full = (data: any) => moment(data, FORMAT_DATE)
        //.utcOffset(0)
        .format(ISO_FULL_DATE);

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
                            {/*{(isEdit || updateData?.dateCreationPost) &&*/}
                            {/*    <TextField*/}
                            {/*        className={styles.pagePost__dateCreationPost}*/}
                            {/*        label="Дата создания поста"*/}
                            {/*        type="date"*/}
                            {/*        name={'dateCreationPost'}*/}
                            {/*        value={formatDateInISOUTC0(updateData.dateCreationPost)}*/}
                            {/*        onChange={(e) => handleChangeDataUser(e)}*/}
                            {/*        InputLabelProps={{*/}
                            {/*            shrink: true,*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*}*/}
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
                        (isEdit || updateData.responsibilities) &&
                        <div
                            className={classNames(
                                styles.pagePost__field,
                                highLightField(isEdit && !updateData.responsibilities),
                                styles.pagePost__fullText)}
                            contentEditable={isEdit}
                            suppressContentEditableWarning={true}
                            data-text={'Обязанности: '}
                            onInput={(e) => {
                                const target = e.target as HTMLElement;
                                setUpdateData({
                                    ...updateData,
                                    responsibilities: target.textContent
                                })
                            }}
                        >{data.responsibilities}</div>
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
