import React, {FC} from 'react';
import styles from './Tag.module.scss';

export interface ITagProps {
    nameDirection: string
}

const Tag: FC<ITagProps> = ({nameDirection}) => {
    return (
        <div className={styles.tag} data-testid="Tag">
            {nameDirection}
        </div>

    )
};

export default Tag;
