import React, {FC, useEffect} from 'react';
import styles from './Search.module.scss';

export interface SearchProps {
    list: string[]
}

const Search: FC<SearchProps> = ({list}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>('');
    const[filteredList, setFilteredList] = React.useState<string[]>(list);

    useEffect(() => {
        setFilteredList(list.filter(item => item.toLowerCase().startsWith(searchValue.toLowerCase())))
    },[searchValue])

    return (
        <div className={styles.search} data-testid="Search">
            <div className={styles.search__wrapper}>

                <input onChange={(e) => {
                    setSearchValue(e.target.value);
                    (e.target.value) ? setIsOpen(true) : setIsOpen(false)
                }}
                       className={styles.search__input}
                       value={searchValue}
                       type="text"
                       data-testid="SearchInput"/>
                <ul data-testid="SearchList"
                    className={(isOpen && filteredList.length > 0) ? styles.search__list : styles.hideDropDown}>
                    {isOpen && filteredList.map((item, index) => {
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
                    }
                </ul>

            </div>
        </div>
    )
};

export default Search;
