import React, {FC} from 'react';
import styles from './CardCompetition.module.scss';
import {TCompetition} from "@iisdc/types";
import PopupPost from "../UI/PopupPost/PopupPost";

export interface CardCompetitionProps extends TCompetition {
}

const CardCompetition: FC<CardCompetitionProps> = ({
                                                       id,
                                                       dateCreationPost,
                                                       direction,
                                                       namePost,
                                                       organization,
                                                       deadline,
                                                       fullText,
                                                       link,
                                                       timeOfParse,
                                                       linkPDF
                                                   }) => {
    const [isActive, setIsActive] = React.useState<boolean>(false)

    const date = new Date(Number(timeOfParse))
    const formateDate = {
        day: date.getDate(),
        month: ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
        year: date.getFullYear()
    }

    return (
        <>
            <div onClick={() => setIsActive(!isActive)} className={styles.cardCompetition} data-testid="CardPost">
                <div
                    className={styles.cardCompetition__data}>{formateDate.day + '.' + formateDate.month + '\n' + formateDate.year}</div>
                {direction && <div className={styles.cardCompetition__direction}>{direction}</div>}
                <div className={styles.cardCompetition__wrapper}>
                    <h1 className={styles.cardCompetition__name}>{namePost}</h1>
                    <h4 className={styles.cardCompetition__organization}>{organization}</h4>
                </div>
            </div>
            <PopupPost<TCompetition>
                isActive={isActive}
                setIsActive={setIsActive}
                fields={
                    {
                        id,
                        namePost,
                        organization,
                        deadline,
                        fullText,
                        link,
                        timeOfParse,
                        direction,
                        dateCreationPost,
                        linkPDF
                    }}
            />
        </>

    )
};

export default CardCompetition;
