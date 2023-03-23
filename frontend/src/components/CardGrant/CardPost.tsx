import React from 'react';
import styles from './CardPost.module.scss';
import PagePost from "../../pages/PagePost/PagePost";
import {TComponentPage} from "../../types/types";
import {TPostType} from "@iisdc/types";

interface ICardPost {

}


const CardPost = <T extends TPostType>({postType, props}: TComponentPage<T>) => {
    const [isActive, setIsActive] = React.useState<boolean>(false)

    const date = new Date(Number(props.timeOfParse))
    const formateDate = {
        day: date.getDate(),
        month: ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
        year: date.getFullYear()
    }

    return (
        <>
            <div onClick={() => setIsActive(!isActive)} className={styles.cardPost} data-testid="CardPost">
                <div
                    className={styles.cardPost__data}>{formateDate.day + '.' + formateDate.month + '\n' + formateDate.year}</div>
                {direction && <div className={styles.cardPost__direction}>{(typeof direction == 'string')
                    ? direction
                    : (typeof direction == 'object')
                        ? direction[0]
                        : ''}</div>}
                <div className={styles.cardPost__wrapper}>
                    <h1 className={styles.cardPost__name}>{namePost}</h1>
                    {summary && <div className={styles.cardPost__summary}>{'Сумма гранта: ' + summary}</div>}
                    <h4 className={styles.cardPost__organization}>{organization}</h4>
                </div>
            </div>

            <PagePost<TComponentPage<TPostType.grant>>
                postType={TPostType.grant}
                id={id}
                props={props}

            />

        </>

    )
};

export default CardPost;



