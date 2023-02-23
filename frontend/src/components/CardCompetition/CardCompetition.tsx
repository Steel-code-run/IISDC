import React, {FC} from 'react';
import styles from './CardCompetition.module.scss';
import {TCompetition} from "@iisdc/types";

export interface CardCompetitionProps extends TCompetition {
}

const CardCompetition: FC<CardCompetitionProps> = ({
    id,
    dateCreationPost,
    direction,
    organization,
    deadline,
    link,
    namePost,
    fullText}) => {

    const [isActive, setIsActive] = React.useState<boolean>(false)

    return (
        <div className={styles.cardCompetition} data-testid="CardCompetition">
            <>
                <div className={styles.cardPost} data-testid="CardPost">
                    <div className={styles.cardPost__data}>{dateCreationPost}</div>
                    {direction && <div className={styles.cardPost__direction}>{direction}</div>}
                    <div className={styles.cardPost__wrapper}>
                        <h1 onClick={() => setIsActive(!isActive)} className={styles.cardPost__name}>{namePost}</h1>
                        <h4 className={styles.cardPost__organization}>{organization}</h4>
                    </div>
                </div>
                {/*<PopupPost isActive={isActive}*/}
                {/*           setIsActive={setIsActive}*/}
                {/*           namePost={namePost}*/}
                {/*           dateCreationPost={dateCreationPost}*/}
                {/*           direction={direction}*/}
                {/*           organization={organization}*/}
                {/*           deadline={deadline}*/}
                {/*           summary={summary}*/}
                {/*           directionForSpent={directionForSpent}*/}
                {/*           fullText={fullText}*/}
                {/*           link={link}*/}
                {/*           linkPDF={linkPDF}/>*/}
            </>
        </div>

    )
};

export default CardCompetition;
