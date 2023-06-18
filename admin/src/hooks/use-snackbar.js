import {useState} from "react";

export const useSnackbar = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackbarData] = useState({
        type: '',
        msg: ''
    });

    return [
        openSnackbar,
        setOpenSnackbar,
        snackbarData,
        setSnackbarData
    ]
}