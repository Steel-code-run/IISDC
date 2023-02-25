import React, {FC} from 'react';
import styles from './Dropdown.module.scss';
import dropdownIcon from '../../../assets/images/dropdownIcon.svg'

export interface DropdownProps {

    listDirections: string[],
    cbChoicedDirection: React.Dispatch<React.SetStateAction<string>>
}

const Dropdown: FC<DropdownProps> = ({listDirections, cbChoicedDirection}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [value, setValue] = React.useState<string>('Все направления')

    React.useEffect(() => cbChoicedDirection(value), [value, setValue])

    const handleClickItemDropdown = (e: any) => {
        const target = e.target as HTMLLIElement;
        setValue(target.innerText)
        setIsOpen(false)
    }


    return (
        <div className={styles.dropdown} data-testid="Dropdown">
            <div className={styles.dropdown__inputBlock}>
                <input onChange={(e) => setValue(e.target.value)}
                       value={value}
                       style={(!isOpen) ? {borderRadius: '10px'} : {borderRadius: '10px 10px 0 0'}}
                       className={styles.dropdown__inputBlock__input} type="text" disabled={true}/>
                <img onClick={() => setIsOpen(!isOpen)}
                     className={(isOpen)
                         ? styles.dropdown__inputBlock__inputIcon + ' ' + styles.rotateIcon
                         : styles.dropdown__inputBlock__inputIcon}
                     src={dropdownIcon} alt={'icon'}/>
            </div>

            {
                isOpen && <ul className={styles.dropdown__itemList}>
                    <li className={styles.dropdown__itemList__item} onClick={(e) => handleClickItemDropdown(e)}>Все направления</li>
                    {
                        listDirections?.map((direction, index) => {
                            if(direction) {
                                return (
                                    <li className={styles.dropdown__itemList__item}
                                        onClick={(e) => handleClickItemDropdown(e)}
                                        key={index}>{direction}</li>
                                )
                            }
                            else return null
                        })
                    }
                </ul>
            }
        </div>

    )
};

export default Dropdown;
