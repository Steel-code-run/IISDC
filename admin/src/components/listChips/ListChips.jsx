import React, {useEffect, useState} from 'react';
import {Chip, IconButton, List, ListItem, ListItemText, Menu, MenuItem} from '@mui/material';
import {AddCircleOutlineOutlined, RemoveCircleOutlineOutlined} from '@mui/icons-material';
import {directionsList} from "../../constants/directions";

const ListChips = ({
                       selectChips,
                       setSelectChips
                   }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [chips, setChips] = useState(directionsList)


    useEffect(() => {
        setChips(directionsList.filter(dir => !selectChips.includes(dir)))
    }, [selectChips])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChipClick = (chip) => {
        setSelectChips([...selectChips, chip]);
        setChips(chips.filter((c) => c !== chip));
        handleClose();
    };

    const handleRemoveChip = (chip) => {
        setSelectChips(selectChips.filter((c) => c !== chip));
        setChips([...chips, chip]);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                {selectChips?.length > 0 ? (
                    <RemoveCircleOutlineOutlined/>
                ) : (
                    <AddCircleOutlineOutlined/>
                )}
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <List dense>
                    {chips?.map((chip, index) => (
                        <ListItem key={index} button onClick={() => handleChipClick(chip)}>
                            <ListItemText primary={chip}/>
                            {/*{selectChips.includes(chip) && <Chip label="Selected" />}*/}
                        </ListItem>
                    ))}
                </List>
            </Menu>
            {selectChips?.map((chip) => (
                <Chip
                    key={chip}
                    label={chip}
                    onDelete={() => handleRemoveChip(chip)}
                    style={{margin: '5px'}}
                />
            ))}
        </div>
    );
};

export default ListChips;
