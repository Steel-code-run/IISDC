import React, {FC, useEffect, useState} from 'react';
import styles from './Dropdown.module.scss';
import Tag from "../Tag/Tag";

export interface DropdownProps {

    listDirections: IDirectionsResponse[],
    cbChoicedDirection: React.Dispatch<React.SetStateAction<string[] | string>>
}

export interface IDirectionsResponse {
    id: number,
    directionName: string
}

const Dropdown: FC<DropdownProps> = ({listDirections, cbChoicedDirection}) => {
    const [isActive, setIsActive] = useState(false);
    const [directions, setDirections] = useState<IDirectionsResponse[]>([])
    const [tags, setTags] = useState<IDirectionsResponse[]>([]);
    const [search, setSearch] = useState('')

    const handleClickItemDropdown = (directionsList: IDirectionsResponse[]) => {
        cbChoicedDirection(directionsList.map(dir => dir.directionName));
    }

    const deleteTag = (deletedTag: string) => {
        setTags(tags.filter(tag => tag.directionName !== deletedTag));
        handleClickItemDropdown(tags.filter(tag => tag.directionName !== deletedTag))
    }

    const addTag = (addedTag: string, id: number) => {
        if (addedTag === 'Не определено') return
        setTags([...tags, {
            id,
            directionName: addedTag
        }])

        handleClickItemDropdown([...tags, {
            id,
            directionName: addedTag
        }])

    }

    useEffect(() => {
        setDirections(listDirections?.filter((direction: IDirectionsResponse) => {
            const tagNames = tags.map(tag => tag.directionName);
            return !tagNames.includes(direction.directionName);
        }))
    }, [tags, listDirections]);

    return (
        <div className={styles.dropdown} data-testid="Dropdown">

            <div className={styles.dropdown__direction}>
                {
                    (!isActive) ?
                        (tags.length > 0)
                            ? tags.map((dir, ix) => {
                                return (
                                    <Tag key={dir.id} nameDirection={dir.directionName} isDelete={true}
                                         cbDeleteTag={deleteTag}/>
                                )
                            })
                            : <p>{'Фильтрация по тегам'}</p>
                        : <input onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                                 value={search}
                                 className={styles.dropdown__input}
                                 placeholder={'Введите направление '}/>
                }
            </div>

            <div onClick={() => setIsActive(!isActive)} className={styles.dropdown__openBtn}>
                <div className={styles.dropdown__openBtn__line}></div>
                <div className={(isActive)
                    ? styles.dropdown__openBtn__line + ' ' + styles.dropdown__activeDropdown
                    : styles.dropdown__openBtn__line}>
                </div>
            </div>
            {
                isActive &&
                <div className={styles.dropdown__dropdown}>
                    <div className={styles.dropdown__dropdown__listTags}>
                        {
                            (tags.length > 0) ?
                                 tags.map((tag) =>
                                    (<Tag key={tag.id}
                                          nameDirection={tag.directionName}
                                          isDelete={true}
                                          cbDeleteTag={deleteTag}/>))
                                : null

                        }
                    </div>
                    <ul className={styles.dropdown__listDirections}>
                        {
                            directions
                                .filter(direction => direction.directionName.toLowerCase().startsWith(search.toLowerCase()))
                                .map((direction: IDirectionsResponse) =>
                                    <li key={direction.id} onClick={() => addTag(direction.directionName, direction.id)}
                                        className={styles.dropdown__listDirections__direction}>{direction.directionName}</li>)
                        }
                    </ul>

                </div>
            }
        </div>

    )
};

export default Dropdown;
