import React, {FC} from 'react';
import styles from './Search.module.scss';
import {useDebounce} from "../../../helpers/debounce";
import SearchIcon from '../../../assets/images/searchIcon.svg'

export interface SearchProps {
    cbDebounce: (debounceValue: string) => void
}

const Search: FC<SearchProps> = ({cbDebounce}) => {
    const [searchValue, setSearchValue] = React.useState<string>('');

    const debouncedSearch = useDebounce(searchValue, 600);

    React.useEffect(() => cbDebounce(debouncedSearch), [debouncedSearch, cbDebounce])

    return (
        <div className={styles.search} data-testid="Search">
            <div className={styles.search__wrapper}>
                <img className={styles.search__searchIcon} src={SearchIcon} alt="icon"/>
                <input autoFocus={true}
                       onChange={(e) => {
                           setSearchValue(e.target.value);}}
                       className={styles.search__input}
                       value={searchValue}
                       type="text"
                       data-testid="SearchInput"/>
            </div>
        </div>
    )
};

export default Search;
