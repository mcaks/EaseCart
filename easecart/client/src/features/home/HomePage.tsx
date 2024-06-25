import React from 'react';
import { Typography, Button, Box, CssBaseline } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    height: '100vh',
                    width: '100vw',
                    overflow: 'hidden',
                },
                html: {
                    height: '100%',
                    width: '100%',
                },
            },
        },
    },
});

export default function HomePage() {
    const navigate = useNavigate();

    const handleStartNow = () => {
        navigate('/store');
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    position: 'relative',
                    backgroundImage: `url(/images/bgimg.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    margin: 0,
                    padding: 0,
                }}
            >
                {/* Semi-transparent overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust transparency here (0.5 = 50%)
                        zIndex: 1, // Ensure overlay is above the background image
                    }}
                />

                <Typography variant="h3" gutterBottom style={{ zIndex: 2, position: 'relative', color: 'white' }}>
                    Welcome to EaseCart
                </Typography>
                <Typography variant="h6" paragraph style={{ zIndex: 2, position: 'relative', color: 'white' }}>
                    Easy shopping for all your needs. Your one-stop shop for everything!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartNow}
                    size="large"
                    sx={{ marginTop: '20px', zIndex: 2, position: 'relative' }}
                >
                    Start Now
                </Button>
            </Box>
        </ThemeProvider>
    );
}
