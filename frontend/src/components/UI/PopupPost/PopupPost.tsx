import React, {FC} from 'react';
import styles from './PopupPost.module.scss';
import {TGrant} from "@iisdc/types";

export interface PopupPostProps extends TGrant{
    isActive: boolean
    setIsActive:  React.Dispatch<React.SetStateAction<boolean>>
}

const PopupPost: FC<PopupPostProps> = ({isActive, setIsActive}) => {

    return (
        <>
            {isActive &&
                <div className={styles.popupPost} data-testid="PopupPost">

                </div>

            }
        </>

    )
};

export default PopupPost;
