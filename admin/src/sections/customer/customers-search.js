import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {Card, InputAdornment, OutlinedInput, SvgIcon} from '@mui/material';
import {useDebounce} from "../../hooks/use-debounce";
import React, {useState} from 'react'

export const CustomersSearch = (
    {
        searchValue,
        handleSearchValue,
        placeholder
    }
) => {
    const [value, setValue] = useState(searchValue);
    const debounceValue = useDebounce(value, 800);
    React.useEffect(() => {
        handleSearchValue(value)
    }, [ debounceValue])

    return (
        <Card sx={{ p: 2 }}>
            <OutlinedInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
                placeholder={placeholder}
                startAdornment={(
                    <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                            <MagnifyingGlassIcon />
                        </SvgIcon>
                    </InputAdornment>
                )}
                sx={{ maxWidth: 500 }}
            />
        </Card>
    );
}
