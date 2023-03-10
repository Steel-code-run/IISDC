import React, {useState} from 'react';
import styles from './PopupPost.module.scss';
import cross from '../../../assets/images/crossExit.svg'
import {useDeletePostGrantMutation, useUpdatePostGrantMutation} from "../../../api/grants.api";
import {TCompetition, TGrant} from "@iisdc/types";

export type TTypesOfPosts = TGrant & TCompetition

export type TPopupPostProps<T> = {
    [field in keyof T]: T[field];

}
type TPropsState = {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface IUpdateData {
    id: number | undefined,
    organization?: string | null,
    direction?: string | string[] | null,
    directionForSpent?: string | null
}

const PopupPost = <T extends TTypesOfPosts>({
                                                namePost,
                                                dateCreationPost,
                                                direction,
                                                organization,
                                                id,
                                                linkPDF,
                                                link,
                                                deadline,
                                                fullText,
                                                setIsActive,
                                                isActive,
                                                summary,
                                            }: TPopupPostProps<T> & TPropsState) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState<IUpdateData>({
        id,
        organization,
        direction
    })


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
                                <div className={styles.popupPost__dateCreationPost}>{(dateCreationPost) ? '????????  \n' +
                                    '???????????????? ??????????\n' + (new Date(dateCreationPost)?.toLocaleDateString())?.replace(',', '\n') : '???? ??????????????'}</div>
                                <div
                                    className={styles.popupPost__deadline}>{'???????? ?????????????????? ???????????? ???????????? \n' + deadline}</div>
                            </div>

                            {summary &&
                                <div className={styles.popupPost__summary + ' ' + styles.popupPost__col}>??????????
                                    ????????????:<br/> {summary}
                                </div>}

                            <div className={styles.popupPost__directionAndOrganization}>
                                <div data-tip={organization}
                                     className={styles.popupPost__organization + ' ' + styles.popupPost__col}>
                                    ????????????????????????: <p contentEditable={isEdit}
                                                     suppressContentEditableWarning={true}
                                                     onInput={(e) => {
                                                         const target = e.target as HTMLElement;
                                                         setUpdateData({
                                                             ...updateData,
                                                             organization: target.textContent
                                                         })
                                                     }}>{organization}</p>
                                </div>
                                <div data-tip={(typeof direction == 'string')
                                    ? direction
                                    : (typeof direction == 'object')
                                        ? direction.join(', ')
                                        : ''}
                                     className={styles.popupPost__direction + ' ' + styles.popupPost__col}>
                                    ??????????????????????: <p contentEditable={isEdit}
                                                    suppressContentEditableWarning={true}
                                                    onInput={(e) => {
                                                        const target = e.target as HTMLElement;
                                                        console.log(target.textContent?.split(','))
                                                        setUpdateData({...updateData, direction: target.textContent?.split(',')})
                                                    }}>{(typeof direction == 'string')
                                    ? direction
                                    : (typeof direction == 'object')
                                        ? direction.join(',')
                                        : ''}</p>
                                </div>

                            </div>

                            <div className={styles.popupPost__fullText + ' ' + styles.popupPost__col}>{fullText}</div>
                        </div>
                        <div className={styles.popupPost__footer}>
                            <div className={styles.popupPost__links}>
                                {link && <a href={link} rel="noopener noreferrer" target="_blank"
                                            className={styles.popupPost__link}>???????????????? ????????????</a>}
                                {linkPDF && <a href={linkPDF} rel="noopener noreferrer" target="_blank"
                                               className={styles.popupPost__link}>?????????????????????????? ????????</a>}
                            </div>

                            <div className={styles.popupPost__btns}>
                                {!isEdit
                                    ? <button onClick={() => setIsEdit(isEdit => !isEdit)}
                                              className={styles.popupPost__editBtn}>??????????????????????????</button>
                                    : <>
                                        <button onClick={async () => {
                                            if (id) {
                                                await deletePost(id);
                                                setIsActive(false)
                                            }
                                        }}
                                                className={styles.popupPost__deletePost}>??????????????
                                        </button>
                                        <button onClick={async () => {
                                            setIsEdit(isEdit => !isEdit)
                                            await updatePost(updateData);
                                        }} className={styles.popupPost__savePost}>??????????????????
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
