import React from 'react';
import styles from './CardPost.module.scss';
import {TComponentPage} from "../../types/types";
import {TPostType} from "../../types/serial/parser";
import {isPropsCompetition, isPropsGrant, isPropsInternship, isPropsVacancy} from "../../types/typeGuards";
import {Link} from "react-router-dom";

interface ICardPost {

}


const CardPost = <T extends TPostType>({postType, props}: TComponentPage<T>) => {
    const timeParse = props.timeOfParse as string;
    const date = new Date(Date.parse(timeParse))
    const formatDate = {
        day: date.getDate(),
        month: ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
        year: date.getFullYear()
    }

    return (
        <>
            <div className={styles.cardPost} data-testid="CardPost">
                <div
                    className={styles.cardPost__data}>{formatDate.day + '.' + formatDate.month + '\n' + formatDate.year}</div>
                <div className={styles.cardPost__wrapper}>
                    {isPropsGrant(postType, props) &&
                        <Link to={'/post'} state={{data: props, postType}}>
                            <h1 className={styles.cardPost__name}>{props.namePost}</h1>
                            {props.summary &&
                                <div className={styles.cardPost__summary}>{'Сумма гранта: ' + props.summary}</div>}
                            <h4 className={styles.cardPost__organization}>{props.organization}</h4>
                        </Link>
                    }
                    {isPropsCompetition(postType, props) &&
                        <Link to={'/post'} state={{data: props, postType}}>
                            <h1 className={styles.cardPost__name}>{props.namePost}</h1>
                            <h4 className={styles.cardPost__organization}>{props.organization}</h4>
                        </Link>
                    }
                    {isPropsInternship(postType, props) &&
                        <>
                            <Link to={'/post'} state={{data: props, postType}}>
                                <h1 className={styles.cardPost__name}>{props.namePost}</h1>
                            </Link>
                        </>
                    }
                    {isPropsVacancy(postType, props) &&
                        <>
                            <h1 className={styles.cardPost__name}>{props.namePost}</h1>
                            <h4 className={styles.cardPost__organization}>{props.organization}</h4>
                        </>
                    }
                </div>
            </div>
        </>
    )
};

export default CardPost;



