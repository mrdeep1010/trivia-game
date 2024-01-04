// LoadingFullScreen.jsx
import React from 'react';
import { CircularProgress, Backdrop, Typography } from '@mui/material';

const LoadingFullScreen = ({ loadingText = 'Loading...' }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <div>
                <CircularProgress color="inherit" />
                <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
                    {loadingText}
                </Typography>
            </div>
        </Backdrop>
    );
};

export default LoadingFullScreen;
