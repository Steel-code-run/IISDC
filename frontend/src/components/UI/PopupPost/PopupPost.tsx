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
                                           deadline
                                       }) => {

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
                                <div className={styles.popupPost__dateCreationPost}>{dateCreationPost}</div>

                                <div className={styles.popupPost__deadline}>{deadline}</div>
                            </div>
                            {
                                summary &&
                                <div className={styles.popupPost__summary + ' ' + styles.popupPost__col}>Сумма
                                    гранта:<br/> {summary}</div>
                            }
                            <div className={styles.popupPost__organization + ' ' + styles.popupPost__col}>
                                Организаторы: {organization}
                            </div>
                            {direction && <div className={styles.popupPost__direction + ' ' + styles.popupPost__col}>
                                Направление: {direction}
                            </div>}
                            <div className={styles.popupPost__fullText + ' ' + styles.popupPost__col}>{fullText}</div>
                        </div>
                        <div className={styles.popupPost__footer}>
                            <div className={styles.popupPost__links}>
                                <a href={link} rel="noopener noreferrer" target="_blank" className={styles.popupPost__link}>Страница гранта</a>
                                {linkPDF && <a href={linkPDF[0]} className={styles.popupPost__link}>PDF файл</a>}
                            </div>

                            <div className={styles.popupPost__btns}>
                                <button className={styles.popupPost__deletePost}>Удалить</button>
                                <button className={styles.popupPost__savePost}>Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>

    )
};

export default PopupPost;
