import React, {FC, useEffect, useState} from 'react';
import styles from './DropdownTags.module.scss';
import Tag from "../Tag/Tag";
import {IUpdateDataCompetition, IUpdateDataGrant, TTypesUpdateData} from "../../../types/types";
import classNames from "classnames";
import {directionsList} from "../../../config/directions";
import {TPostType} from "../../../types/serial/parser";

export interface IDropdownTagsProps {
    direction: string,
    isActiveDropdown: boolean,
    isHighlight: boolean,
    setUpdateData: React.Dispatch<React.SetStateAction<TTypesUpdateData<TPostType>>>,
    updateData: IUpdateDataGrant | IUpdateDataCompetition
}


const DropdownTags: FC<IDropdownTagsProps> = ({
                                                  direction,
                                                  isActiveDropdown,
                                                  isHighlight,
                                                  setUpdateData,
                                                  updateData
                                              }) => {
    const [isActive, setIsActive] = useState(false);
    const [tags, setTags] = useState<string[] | string>(direction);
    const [directions, setDirections] = useState<string[]>([])
    const [search, setSearch] = useState('')

    const deleteTag = (deletedTag: string) => {
        if (Array.isArray(tags)) {
            const updateTags = tags.filter(tag => tag !== deletedTag);
            setTags(updateTags);

            setUpdateData({
                ...updateData,
                directions: JSON.stringify(updateTags)
            })
        } else {
            setTags('')
            setUpdateData({
                ...updateData,
                directions: ''
            })
        }


    }
    const addTag = (addedTag: string) => {
        if (addedTag === 'Не определено') return
        if (Array.isArray(tags)) {
            const updateTags = [...tags, addedTag];
            setTags(updateTags)
            setUpdateData({
                ...updateData,
                directions: JSON.stringify(updateTags)
            })

        } else {
            setTags(addedTag)
            setUpdateData({
                ...updateData,
                directions: addedTag
            })
        }

    }
   // const {data: dataDirections} = useGetDirectionsQuery({token});
    const dataDirections = directionsList;


    useEffect(() => {
        setDirections(dataDirections?.filter((direction: string) => !tags?.includes(direction)))
    }, [dataDirections, tags]);

    const highLightField = (turn: boolean) => (turn) ? ' ' + styles.dropdownTags__highlightField : '';


    return (
        <div className={classNames(
            styles.dropdownTags, {
            [highLightField(isHighlight)]: isActiveDropdown && isActive,
            [styles.dropdownTags__activeDropdownBorders]: !isActive && isActiveDropdown
        })} data-testid="DropdownTags">
            <div className={styles.dropdownTags__direction}>
                {
                    (!isActive || !isActiveDropdown) ?
                        (Array.isArray(tags))
                            ? tags.map((dir, ix) => {
                                return (
                                    <Tag key={dir + ix + Math.random() *  Date.now()}
                                         nameDirection={dir}
                                         isDelete={false}
                                         cbDeleteTag={deleteTag}/>

                                )
                            })
                            : <Tag nameDirection={tags}
                                   isDelete={false}
                                   cbDeleteTag={deleteTag}/>
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
                    <div className={classNames(
                        styles.dropdownTags__openBtn__line, {
                        [styles.dropdownTags__activeDropdown]: isActive
                    })}>
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
                                    (
                                        <Tag key={tag + ix + Math.random() *  Date.now()}
                                          nameDirection={tag}
                                          isDelete={true}
                                          cbDeleteTag={deleteTag}/>

                                    ))
                                : <Tag nameDirection={tags} isDelete={true} cbDeleteTag={deleteTag}/>
                        }
                    </div>
                    <ul className={styles.dropdownTags__listDirections}>
                        {
                            directions
                                .filter(direction => direction.toLowerCase().startsWith(search.toLowerCase()))
                                .map((direction: string, ix: number) =>
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
