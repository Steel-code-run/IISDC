import React, {FC} from 'react';
import styles from './CardPost.module.scss';
import {TGrant} from "@iisdc/types";
import PopupPost from "../UI/PopupPost/PopupPost";

export interface CardPostProps extends TGrant {

}

const CardPost: FC<CardPostProps> = ({
                                         id,
                                         dateCreationPost,
                                         direction,
                                         namePost,
                                         organization,
                                         deadline,
                                         summary,
                                         directionForSpent,
                                         fullText,
                                         link,
                                         linkPDF,
    timeOfParse
                                     }) => {
    const [isActive, setIsActive] = React.useState<boolean>(false)
    const formatDate = {
        year: 0,
        month: 0,
        day: 0,
    };
    const getDate = (day: number, month: number, year: number): string => {
        return `${formatDate.day}.${formatDate.month}.${formatDate.year}`
    };
    console.log(new Date(dateCreationPost))


    formatDate.year =  new Date().getFullYear() - new Date(dateCreationPost).getFullYear();
    formatDate.month = new Date().getMonth() - new Date(dateCreationPost).getMonth();
    formatDate.day = new Date().getDay() - new Date(dateCreationPost).getDay();
    return (
        <>
            <div className={styles.cardPost} data-testid="CardPost">
                <div className={styles.cardPost__data}>{timeOfParse}</div>
                {direction && <div className={styles.cardPost__direction}>{direction}</div>}
                <div className={styles.cardPost__wrapper}>
                    <h1 onClick={() => setIsActive(!isActive)} className={styles.cardPost__name}>{namePost}</h1>
                    <h4 className={styles.cardPost__organization}>{organization}</h4>
                </div>
            </div>
            <PopupPost isActive={isActive}
                       setIsActive={setIsActive}
                       namePost={namePost}
                       dateCreationPost={dateCreationPost}
                       direction={direction}
                       organization={organization}
                       deadline={deadline}
                       summary={summary}
                       directionForSpent={directionForSpent}
                       fullText={fullText}
                       link={link}
                       linkPDF={linkPDF}/>
        </>

    )
};

export default CardPost;



