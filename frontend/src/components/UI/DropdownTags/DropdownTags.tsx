import React, {FC, useEffect, useState} from 'react';
import styles from './DropdownTags.module.scss';
import Tag from "../Tag/Tag";
import {useGetDirectionsQuery} from "../../../api/grants.api";

export interface IDropdownTagsProps {
    direction: string[] | string,
    isActiveDropdown: boolean
}

interface IDirectionsResponse {
    id: number,
    directionName: string
}

const DropdownTags: FC<IDropdownTagsProps> = ({direction, isActiveDropdown}) => {
    const [isActive, setIsActive] = useState(false);
    const [tags, setTags] = useState<string[] | string>(direction);
    const [directions, setDirections] = useState<IDirectionsResponse[]>([])
    const [search, setSearch] = useState('')

    const deleteTag = (deletedTag: string) => {
        if (Array.isArray(tags))
            setTags(tags.filter(tag => tag !== deletedTag))
        else setTags('')

    }


    const addTag = (addedTag: string) => {
        if (addedTag === 'Не определено') return
        if (Array.isArray(tags))
            setTags([...tags, addedTag])
        else setTags(addedTag)

    }
    const token = window.localStorage.getItem('token')
    const {data: dataDirections} = useGetDirectionsQuery({token});

    useEffect(() => {
        setDirections(dataDirections?.data?.filter((direction: IDirectionsResponse) => !tags.includes(direction.directionName)))
    }, [dataDirections, tags]);

    const highLightField = (turn: boolean) => (turn) ? ' ' + styles.dropdownTags__highlightField : '';

    return (
        <div className={(isActive && isActiveDropdown)
            ? styles.dropdownTags + ' ' + styles.dropdownTags__activeDropdownBorders + highLightField(isActiveDropdown)
            : (!isActive && isActiveDropdown)
                ? styles.dropdownTags + highLightField(isActiveDropdown)
                : styles.dropdownTags} data-testid="DropdownTags">
            <div className={styles.dropdownTags__direction}>{'Направления: '}
                {
                    (!isActive || !isActiveDropdown) ?
                        (Array.isArray(tags))
                            ? tags.map((dir, ix) => {
                                return (
                                    <Tag key={dir + ix} nameDirection={dir} isDelete={false} cbDeleteTag={deleteTag}/>
                                )
                            })
                            : <Tag nameDirection={tags} isDelete={false} cbDeleteTag={deleteTag}/>
                        : <input onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                                 value={search}
                                 className={styles.dropdownTags__input}
                                 placeholder={'Введите направление '}/>
                }
            </div>
            {
                isActiveDropdown &&
                <div onClick={() => setIsActive(!isActive)} className={styles.dropdownTags__openBtn}>
                    <div className={styles.dropdownTags__openBtn__line}></div>
                    <div className={(isActive)
                        ? styles.dropdownTags__openBtn__line + ' ' + styles.dropdownTags__activeDropdown
                        : styles.dropdownTags__openBtn__line}>
                    </div>
                </div>
            }
            {
                isActive && isActiveDropdown &&
                <div className={styles.dropdownTags__dropdown}>
                    <div className={styles.dropdownTags__dropdown__listTags}>
                        {
                            (Array.isArray(tags))
                                ? tags.map((tag, ix) =>
                                    (<Tag key={tag + ix}
                                          nameDirection={tag}
                                          isDelete={true}
                                          cbDeleteTag={deleteTag}/>))
                                : <Tag nameDirection={tags} isDelete={true} cbDeleteTag={deleteTag}/>
                        }
                    </div>
                    <ul className={styles.dropdownTags__listDirections}>
                        {
                            directions
                                .filter(direction => direction.directionName.toLowerCase().startsWith(search.toLowerCase()))
                                .map((direction: IDirectionsResponse) =>
                                    <li key={direction.id} onClick={() => addTag(direction.directionName)}
                                        className={styles.dropdownTags__listDirections__direction}>{direction.directionName}</li>)
                        }
                    </ul>

                </div>
            }
        </div>

    )
};

export default DropdownTags;
