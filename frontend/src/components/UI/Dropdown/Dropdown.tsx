import React, {FC} from 'react';
import styles from './Dropdown.module.scss';
import dropdownIcon from '../../../assets/images/dropdownIcon.svg'

export interface DropdownProps {

    listDirections: string[],
    cbChoicedDirection:  React.Dispatch<React.SetStateAction<string>>
}

const Dropdown: FC<DropdownProps> = ({listDirections, cbChoicedDirection}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [value, setValue] = React.useState<string>('')

    React.useEffect(() => cbChoicedDirection(value), [value, setValue])


    return (
        <div className={styles.dropdown} data-testid="Dropdown">
            <div className={styles.dropdown__inputBlock}>
                <input onChange={(e) => setValue(e.target.value)}
                       value={value}
                       className={styles.dropdown__inputBlock__input} type="text" disabled={true}/>
                <img onClick={() => setIsOpen(!isOpen)}
                     className={styles.dropdown__inputBlock__inputIcon}
                     src={dropdownIcon} alt={'icon'}/>
            </div>

            {
                isOpen && <ul>
                    {
                        listDirections?.map((direction, index) => {
                            return (
                                <li onClick={(e) => {
                                    const target = e.target as HTMLLIElement;
                                    setValue(target.innerText)
                                }
                                } key={index}>{direction}</li>
                            )
                        })
                    }
                </ul>
            }
        </div>

    )
};

export default Dropdown;
