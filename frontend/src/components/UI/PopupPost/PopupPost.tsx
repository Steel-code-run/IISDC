import React, {FC} from 'react';
import styles from './PopupPost.module.scss';
import {TGrant} from "@iisdc/types";
import cross from '../../../assets/images/crossExit.svg'

export interface PopupPostProps extends TGrant {
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const PopupPost: FC<PopupPostProps> = ({
                                           isActive,
                                           setIsActive,
                                           fullText,
                                           namePost,
                                           organization,
                                           direction,
                                           summary,
                                           link,
                                           linkPDF,
                                           dateCreationPost,
                                           deadline,
                                           directionForSpent
                                       }) => {
    const [isEdit, setIsEdit] = React.useState<boolean>(false)

    const body = document.body.style;
    (isActive) ? body.overflowY = 'hidden' : body.overflowY = 'scroll';

    return (
        <>
            {isActive &&
                <div className={styles.popupPost} data-testid="PopupPost">
                    <div onClick={() => setIsActive(false)} className={styles.popupPost__blackFon}></div>
                    <div className={styles.popupPost__wrapper}>
                            <img onClick={() => setIsActive(false)} src={cross} className={styles.popupPost__crossExit}
                                 alt={'icon'}/>
                        <div className={styles.popupPost__fields}>
                            <div className={styles.popupPost__namePost}>{namePost}</div>
                            <div className={styles.popupPost__dates}>
                                <div className={styles.popupPost__dateCreationPost}>{'Дата  \n' +
                                    'создания поста\n' + (new Date(dateCreationPost).toLocaleString()).replace(',', '\n')}</div>
                                <div
                                    className={styles.popupPost__deadline}>{'Дата окончания подачи заявок \n' + deadline}</div>
                            </div>
                            <div className={styles.popupPost__summary + ' ' + styles.popupPost__col}>Сумма
                                гранта:<br/> {summary}</div>

                            <div className={styles.popupPost__directionAndOrganization}>
                                <div className={styles.popupPost__organization + ' ' + styles.popupPost__col}>
                                    Организаторы: {organization}
                                </div>
                                <div className={styles.popupPost__direction + ' ' + styles.popupPost__col}>
                                    Направление: {direction}
                                </div>

                            </div>
                            <div
                                className={styles.popupPost__directionForSpend + ' ' + styles.popupPost__col}>{'Направление расходных средств\n'
                                + directionForSpent}</div>
                            <div className={styles.popupPost__fullText + ' ' + styles.popupPost__col}>{fullText}</div>
                        </div>
                        <div className={styles.popupPost__footer}>
                            <div className={styles.popupPost__links}>
                                <a href={link} rel="noopener noreferrer" target="_blank"
                                   className={styles.popupPost__link}>Страница гранта</a>
                                {linkPDF && <a href={linkPDF[0]} className={styles.popupPost__link}>PDF файл</a>}
                            </div>

                            <div className={styles.popupPost__btns}>
                                {!isEdit
                                    ? <button onClick={() => setIsEdit(isEdit => !isEdit)}
                                              className={styles.popupPost__editBtn}>Редактировать</button>
                                    : <>
                                        <button className={styles.popupPost__deletePost}>Удалить</button>
                                        <button onClick={() => setIsEdit(isEdit => !isEdit)}
                                                className={styles.popupPost__savePost}>Сохранить
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>

    )
};

export default PopupPost;
