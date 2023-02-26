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

    const date = new Date(Number(timeOfParse))


    return (
        <>
            <div onClick={() => setIsActive(!isActive)}  className={styles.cardPost} data-testid="CardPost">
                <div className={styles.cardPost__data}>{date.getDay() + '.' + date.getMonth() + '\n' + date.getFullYear()}</div>
                <div className={styles.cardPost__direction}>{direction}</div>
                <div className={styles.cardPost__wrapper}>
                    <h1 className={styles.cardPost__name}>{namePost}</h1>
                    {
                        summary && <div className={styles.cardPost__summary}>{'Сумма гранта: ' + summary}</div>
                    }
                    <h4 className={styles.cardPost__organization}>{organization}</h4>
                </div>
            </div>
            <PopupPost id={id}
                       isActive={isActive}
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



