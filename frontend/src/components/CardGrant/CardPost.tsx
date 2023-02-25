import React, {FC} from 'react';
import styles from './CardPost.module.scss';
import {TGrant} from "@iisdc/types";
import PopupPost from "../UI/PopupPost/PopupPost";

export interface CardPostProps extends TGrant {

}

const CardPost: FC<CardPostProps> = ({
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

    const date =  new Date( Number(timeOfParse))


    return (
        <>
            <div className={styles.cardPost} data-testid="CardPost">
                <div className={styles.cardPost__data}>{date.toLocaleDateString()}</div>
                <div className={styles.cardPost__direction}>{direction}</div>
                <div className={styles.cardPost__wrapper}>
                    <h1 onClick={() => setIsActive(!isActive)} className={styles.cardPost__name}>{namePost}</h1>
                    {
                        summary && <div className={styles.cardPost__summary}>{'Сумма гранта: ' + summary}</div>
                    }
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



