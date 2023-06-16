import React from 'react';
import {Alert, Snackbar} from "@mui/material";

function SnackbarMessage({msg, type, openSnackbar, setOpenSnackbar}) {

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }
    return (
        <>
            {
                openSnackbar &&
                <Snackbar open={openSnackbar}
                          autoHideDuration={2000}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                          }}
                          onClose={handleCloseSnackbar}
                >
                    <Alert severity={type} sx={
                        (type === 'success') ? {
                                width: '500px',
                                color: '#fff',
                                backgroundColor: 'green',
                                '& .MuiAlert-icon': {
                                    color: '#fff'
                                }
                            }
                            : (type === 'error') ? {
                                width: '500px',
                                color: '#fff',
                                backgroundColor: 'red',
                                '& .MuiAlert-icon': {
                                    color: '#fff'
                                }
                            } : null
                    }>
                        {msg}
                    </Alert>
                </Snackbar>
            }
        </>

    )
}

export default SnackbarMessage;