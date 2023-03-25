import React, {FC, useEffect, useState} from 'react';
import styles from './DropdownTags.module.scss';
import Tag from "../Tag/Tag";
import {useGetDirectionsGrantsQuery} from "../../../api/grants.api";

export interface IDropdownTagsProps {
    direction: string[] | string,
    isActiveDropdown: boolean
}

const DropdownTags: FC<IDropdownTagsProps> = ({direction, isActiveDropdown}) => {
    const [isActive, setIsActive] = useState(false);
    const [tags, setTags] = useState<string[] | string>(direction);
    const [directions, setDirections] = useState<string[]>([])
    const [search, setSearch] = useState('')


    const deleteTag = (deletedTag: string) => {
        if (Array.isArray(tags))
            setTags(tags.filter(tag => tag !== deletedTag))
        else setTags('')

    }
    const addTag = (addedTag: string) => {
        if(addedTag === 'Не определено') return
        if (Array.isArray(tags))
            setTags([...tags, addedTag])
        else setTags(addedTag)

    }
    const token = window.localStorage.getItem('token')
    const {data: dataDirections} = useGetDirectionsGrantsQuery({token})
    useEffect(() => {
        setDirections(dataDirections?.data?.filter((direction: string) => !tags.includes(direction)))
    }, [dataDirections, tags])

console.log(isActive, isActiveDropdown)
    return (
        <div className={(isActive && isActiveDropdown)
            ? styles.dropdownTags + ' ' + styles.dropdownTags__activeDropdownBorders
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
                                .filter(direction => direction.toLowerCase().startsWith(search.toLowerCase()))
                                .map((direction: string, ix) =>
                                    <li key={direction + ix} onClick={() => addTag(direction)}
                                        className={styles.dropdownTags__listDirections__direction}>{direction}</li>)
                        }
                    </ul>

                </div>
            }
        </div>

    )
};

export default DropdownTags;
