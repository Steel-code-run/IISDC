import React, {FC} from 'react';
import styles from './Tag.module.scss';
import deleteTag from '../../../assets/images/crossDeleteTag.svg'

export interface ITagProps {
    nameDirection: string,
    isDelete: boolean,
    cbDeleteTag: (tag: string) => void;
}

const Tag: FC<ITagProps> = ({nameDirection, isDelete, cbDeleteTag}) => {
    return (
        <div className={styles.tag} data-testid="Tag">
            {nameDirection}
            {
                isDelete && <img onClick={() => cbDeleteTag(nameDirection)} className={styles.tag__deleteIcon} src={deleteTag} alt="icon"/>
            }
        </div>

    )
};

export default Tag;
