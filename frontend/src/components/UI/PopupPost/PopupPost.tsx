import React, {useState} from 'react';
import styles from './PopupPost.module.scss';
import cross from '../../../assets/images/crossExit.svg'
import {useDeletePostGrantMutation, useUpdatePostGrantMutation} from "../../../api/posts.api";
import {TCompetition, TGrant} from "@iisdc/types";

export interface PopupPostProps<T, >{
    fields: T,
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IUpdateData {
    id: number | undefined,
    organization?: string | null,
    direction?: string | null,
    directionForSpent?: string | null
}

const PopupPost = <T extends TGrant | TCompetition>({fields, setIsActive, isActive}: PopupPostProps<T>) => {
    const {namePost,dateCreationPost,deadline,fullText,direction,organization,id,link,timeOfParse, linkPDF} = fields
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState<IUpdateData>({
        id,
        organization,
        direction,
    })
    console.log(linkPDF)

    const [deletePost] = useDeletePostGrantMutation()
    const [updatePost] = useUpdatePostGrantMutation()

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
                                    'создания поста\n' + (new Date(dateCreationPost)?.toLocaleDateString())?.replace(',', '\n')}</div>
                                <div
                                    className={styles.popupPost__deadline}>{'Дата окончания подачи заявок \n' + deadline}</div>
                            </div>

                            <div className={styles.popupPost__directionAndOrganization}>
                                <div className={styles.popupPost__organization + ' ' + styles.popupPost__col}>
                                    Организаторы: <p contentEditable={isEdit}
                                                     suppressContentEditableWarning={true}
                                                     onInput={(e) => {
                                                         const target = e.target as HTMLElement;
                                                         setUpdateData({
                                                             ...updateData,
                                                             organization: target.textContent
                                                         })
                                                     }}>{organization}</p>
                                </div>
                                <div className={styles.popupPost__direction + ' ' + styles.popupPost__col}>
                                    Направление: <p contentEditable={isEdit}
                                                    suppressContentEditableWarning={true}
                                                    onInput={(e) => {
                                                        const target = e.target as HTMLElement;
                                                        setUpdateData({...updateData, direction: target.textContent})
                                                    }}>{direction}</p>
                                </div>

                            </div>

                            <div className={styles.popupPost__fullText + ' ' + styles.popupPost__col}>{fullText}</div>
                        </div>
                        <div className={styles.popupPost__footer}>
                            <div className={styles.popupPost__links}>
                                {link && <a href={link} rel="noopener noreferrer" target="_blank"
                                            className={styles.popupPost__link}>Страница гранта</a>}
                                {linkPDF && <a href={linkPDF} rel="noopener noreferrer" target="_blank"
                                            className={styles.popupPost__link}>Прикрепленный файл</a>}
                            </div>

                            <div className={styles.popupPost__btns}>
                                {!isEdit
                                    ? <button onClick={() => setIsEdit(isEdit => !isEdit)}
                                              className={styles.popupPost__editBtn}>Редактировать</button>
                                    : <>
                                        <button onClick={async () => {
                                            if (id) {
                                                await deletePost(id);
                                                setIsActive(false)
                                            }
                                        }}
                                                className={styles.popupPost__deletePost}>Удалить
                                        </button>
                                        <button onClick={async () => {
                                            setIsEdit(isEdit => !isEdit)
                                            await updatePost(updateData);
                                        }} className={styles.popupPost__savePost}>Сохранить
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
