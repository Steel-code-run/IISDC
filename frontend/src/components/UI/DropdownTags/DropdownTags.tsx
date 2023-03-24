import React, {FC, useState} from 'react';
import styles from './DropdownTags.module.scss';
import Tag from "../Tag/Tag";

export interface IDropdownTagsProps {
    direction: string[] | string
}

const DropdownTags: FC<IDropdownTagsProps> = ({direction}) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className={styles.dropdownTags} data-testid="DropdownTags">
            <div className={styles.dropdownTags__direction}>{'Направления: '}
                {
                    (!isActive) ?
                        (Array.isArray(direction))
                            ? direction.map((dir, ix) => {
                                return (
                                    <Tag key={dir + ix} nameDirection={dir}/>
                                )
                            })
                            : <Tag nameDirection={direction}/>
                        : <input placeholder={'Тут же опять можно ввести и найти нужное направление '}/>

                }
            </div>
            <div onClick={() => setIsActive(!isActive)} className={styles.dropdownTags__openBtn}>
                <div className={styles.dropdownTags__openBtn__line}></div>
                <div className={(isActive)
                    ? styles.dropdownTags__openBtn__line + ' ' + styles.dropdownTags__activeDropdown
                    : styles.dropdownTags__openBtn__line}></div>
            </div>
            {
                isActive && <div className={styles.dropdownTags__listDirections}>

                </div>
            }
        </div>

    )
};

export default DropdownTags;
