import React, {FC, useState} from 'react';
import styles from './Dropdown.module.scss';
import dropdownIcon from '../../../assets/images/dropdownIcon.svg'

export interface DropdownProps {

    listDirections: IDirectionsResponse[],
    cbChoicedDirection: React.Dispatch<React.SetStateAction<string>>
}

export interface IDirectionsResponse {
    id: number,
    directionName: string
}

const Dropdown: FC<DropdownProps> = ({listDirections, cbChoicedDirection}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState<string>('Все направления')
    const [filterList, setFilterList] = useState<IDirectionsResponse[]>(listDirections);

    const handleClickItemDropdown = (e: any) => {
        const target = e.target as HTMLLIElement;
        cbChoicedDirection(target.innerText)
        setValue(target.innerText)
        setIsOpen(false)
    }

    return (
        <div className={styles.dropdown} data-testid="Dropdown">
            <div className={styles.dropdown__inputBlock}>
                <input onChange={(e) => {
                    setValue(e.target.value)
                    setFilterList(listDirections.filter(direction => {
                        return direction.directionName.toLowerCase().startsWith(e.target.value.toLowerCase())
                            || direction.directionName.toLowerCase() === 'Все направления'
                            || e.target.value === ''
                    }))
                    if(!e.target.value) setIsOpen(true)
                }}
                       value={value}
                       style={(!isOpen) ? {borderRadius: '10px'} : {borderRadius: '10px 10px 0 0'}}
                       className={styles.dropdown__inputBlock__input} type="text"/>
                <img onClick={() => setIsOpen(!isOpen)}
                     className={(isOpen)
                         ? styles.dropdown__inputBlock__inputIcon + ' ' + styles.rotateIcon
                         : styles.dropdown__inputBlock__inputIcon}
                     src={dropdownIcon} alt={'icon'}/>
            </div>

            {isOpen && <ul className={styles.dropdown__itemList}>
                    <li className={styles.dropdown__itemList__item}
                        onClick={(e) => handleClickItemDropdown(e)}>Все направления
                    </li>
                    {
                        filterList?.map((direction, index) => {
                            if (direction.directionName) {
                                return (
                                    <li className={styles.dropdown__itemList__item}
                                        onClick={(e) => handleClickItemDropdown(e)}
                                        key={index + direction.id}>{direction.directionName}</li>
                                )
                            } else return null
                        })
                    }
                </ul>
            }
        </div>

    )
};

export default Dropdown;
