import React, {FC} from 'react';
import TextField from "@mui/material/TextField";
import {Checkbox} from "@mui/material";
import styles from './filterDate.module.scss'

export interface FilterDateProps {
    dayDeadline: number
    setDayDeadline:  React.Dispatch<React.SetStateAction<number>>
    checkedFilter: boolean
    setCheckedFilter:  React.Dispatch<React.SetStateAction<boolean>>
}

const FilterDate: FC<FilterDateProps> = ({
    dayDeadline,
    setDayDeadline,
    setCheckedFilter,
    checkedFilter
                                         }) => {
    return (
        <div className={styles.filterDate}>
            <TextField
                className={styles.filterDate__datePicker}
                id="date"
                label="Дней до дедлайна:"
                type="number"
                value={dayDeadline}
                onChange={(e: any) => {
                    setDayDeadline(e.target.value)
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    min: 0,
                    max: 100,
                    step: 1,
                }}
            />
            <Checkbox
                name="checkbox"
               className={styles.filterDate__checkbox}
                checked={checkedFilter}
                onChange={(e) =>
                    setCheckedFilter(e.target.checked)}
                //color="primary"
                // inputProps={{ 'aria-label': 'controlled' }}
            />
        </div>

    )
};

export default FilterDate;
