import React, {FC} from 'react';
import styles from './Search.module.scss';
import crossClose from '../../../assets/images/crossExit.svg'
import {useDebounce} from "../../../helpers/debounce";

interface IListItem {
    id: number,
    namePost: string,
}

export interface SearchProps {
    list?: IListItem[],
    cbDebounce: (debounceValue: string) => void

}

const Search: FC<SearchProps> = ({list = [], cbDebounce}) => {
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const debouncedSearch = useDebounce(searchValue, 600);

    React.useEffect(() => cbDebounce(debouncedSearch), [debouncedSearch, cbDebounce])

    const [filteredList, setFilteredList] = React.useState<IListItem[]>(list);

    React.useEffect(() => {
        setFilteredList(list.filter(item => item.namePost.toLowerCase().startsWith(searchValue.toLowerCase())))
    }, [list])

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

                       className={styles.search__input}
                       value={searchValue}
                       type="text"
                       data-testid="SearchInput"/>
                {
                    searchValue && <img onClick={() => setSearchValue('')}
                                        className={styles.search__textClear}
                                        src={crossClose} alt="icon"/>
                }
                <ul data-testid="SearchList"
                    className={(isOpen) ? styles.search__list : styles.hideDropDown}>
                    {filteredList.length > 0 ? filteredList.map((item, index) => {
                            return (
                                <li onClick={() => {
                                    setSearchValue(item.namePost);
                                    setIsOpen(false);
                                }}
                                    className={styles.search__list__item}
                                    key={item.namePost + item.id}
                                    data-testid="SearchListItem">{item.namePost}</li>
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
