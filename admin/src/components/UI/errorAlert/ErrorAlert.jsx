import React from 'react';
import {Alert} from "@mui/material";

const ErrorAlert = ({ message }) => {
    return (
        <Alert severity="error">
            {JSON.stringify(message)}
        </Alert>
    );
};

export default ErrorAlert;