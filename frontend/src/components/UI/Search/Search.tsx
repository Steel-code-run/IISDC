import React, {FC, useEffect} from 'react';
import styles from './Search.module.scss';

export interface SearchProps {
    list?: string[]
}

const Search: FC<SearchProps> = ({list = []}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [filteredList, setFilteredList] = React.useState<string[]>(list);

    useEffect(() => {
        setFilteredList(list.filter(item => item.toLowerCase().startsWith(searchValue.toLowerCase())))
    }, [list, searchValue])

    return (
        <div className={styles.search} data-testid="Search">
            <div className={styles.search__wrapper}>

                <input autoFocus={true}
                       onChange={(e) => {
                           setSearchValue(e.target.value);
                           if (!e.target.value) {
                                 setIsOpen(true)
                           }
                       }}
                       onFocus={() => {
                        if (!searchValue) {
                            setIsOpen(true)
                        }}}
                       onBlur={() => {
                        setTimeout(() => {
                            setIsOpen(false)
                        }, 0)
                       }}
                       className={styles.search__input}
                       value={searchValue}
                       type="text"
                       data-testid="SearchInput"/>
                <ul data-testid="SearchList"
                    className={(isOpen) ? styles.search__list : styles.hideDropDown}>
                    {filteredList.length > 0 ? filteredList.map((item, index) => {
                            return (
                                <li onClick={() => {
                                    setSearchValue(item);
                                    setIsOpen(false);
                                }}
                                    className={styles.search__list__item}
                                    key={index}
                                    data-testid="SearchListItem">{item}</li>
                            )
                        })
                        : <li className={styles.search__list__searchEmpty}>Ничего не найдено</li>
                    }
                </ul>

            </div>
        </div>
    )
};

export default Search;
