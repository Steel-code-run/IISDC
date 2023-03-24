import React, {useState} from 'react';
import styles from './PagePost.module.scss';
import Header from "../../components/Header/Header";
import {useLocation} from "react-router-dom";
import {isPropsCompetition, isPropsGrant} from "../../types/typeGuards";
import DropdownTags from "../../components/UI/DropdownTags/DropdownTags";

interface IPropsPagePost {

}

const PagePost = (props: IPropsPagePost) => {
    const [isEdit, setIsEdit] = useState(false);
    const location = useLocation();
    const {data, postType} = location.state;

    return (
        <>
            <Header/>
            <div className={styles.pagePost} data-testid="PagePost">
                <div className={styles.pagePost__container}>
                    <div className={styles.pagePost__row}>
                        <h1 className={styles.pagePost__namePost}>{data.namePost}</h1>
                        {data.dateCreationPost && <div
                            className={styles.pagePost__dateCreationPost}>{'Дата создания поста \n'}
                            <p>{data.dateCreationPost}</p></div>}
                        {data.deadline && <div
                            className={styles.pagePost__deadline}>{'Дата окончания подачи заявок \n'}
                            <p>{data.deadline}</p></div>}
                    </div>
                    {
                        isPropsGrant(postType, data) &&
                        <>
                            <div className={styles.pagePost__field + ' ' + styles.pagePost__summary}>{'Сумма гранта: ' + data.summary}</div>
                            <DropdownTags direction={data.direction}/>
                            <div className={styles.pagePost__field}>{'Организаторы: ' + data.organization}</div>
                            <div
                                className={styles.pagePost__field}>{'Направление расходывания средств: ' + data.directionForSpent}</div>
                        </>
                    }
                    {
                        isPropsCompetition(postType, data) &&
                        <>
                            <div className={styles.pagePost__field}>{'Организаторы: ' + data.organization}</div>
                        </>
                    }
                    {data.fullText && <div className={styles.pagePost__field}>{data.fullText}</div>

                    }
                    <div className={styles.pagePost__footerRow}>
                        <div className={styles.pagePost__footer}>
                            <div className={styles.popupPost__links}>
                                {data.link && <a href={data.link} rel="noopener noreferrer" target="_blank"
                                                 className={styles.pagePost__link}>Страница гранта</a>}
                                {data.linkPDF && <a href={data.linkPDF} rel="noopener noreferrer" target="_blank"
                                                    className={styles.pagePost__link}>Прикрепленный файл</a>}
                            </div>
                            <div className={styles.pagePost__timeParsing}>{'Время парсинга: ' + data.timeOfParse}</div>
                        </div>
                        <div className={styles.pagePost__btns}>
                            {
                                (isEdit) ?
                                    <>
                                        <button
                                            className={styles.pagePost__delete + ' ' + styles.pagePost__btn}>Удалить
                                        </button>
                                        <button onClick={() => setIsEdit(false)}
                                                className={styles.pagePost__save + ' ' + styles.pagePost__btn}>Сохранить
                                        </button>
                                    </>
                                    : <button onClick={() => setIsEdit(!isEdit)}
                                              className={styles.pagePost__edit + ' ' + styles.pagePost__btn}>Редактировать</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
};

export default PagePost;
