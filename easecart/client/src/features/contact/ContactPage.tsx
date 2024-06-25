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
                    backgroundColor: 'white', // Set background color
                },
                html: {
                    height: '100%',
                    width: '100%',
                },
            },
        },
    },
});

export default function ContactPage() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    padding: '20px',
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Contact us
                </Typography>
                <Typography variant="body1" paragraph>
                    Phone: <strong>070-777-000</strong>
                </Typography>
                <Typography variant="body1" paragraph>
                    Visit us at: <strong>Glavni trg 3, Maribor</strong>
                </Typography>
                <Typography variant="body1" paragraph>
                    Opening Hours:
                    <br />
                    <strong>Monday - Friday: 9:00 AM - 5:00 PM</strong>
                </Typography>
                {/* Embedded map */}
                <iframe
                    title="Location Map"
                    width="600"
                    height="450"
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.4391723003445!2d15.645084515707364!3d46.55477317913243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476dc62d65651c69%3A0x7a271a6846b53a0d!2sGlavni%20trg%203%2C%208000%20Maribor!5e0!3m2!1sen!2ssi!4v1624574421006!5m2!1sen!2ssi"
                ></iframe>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGoBack}
                    size="large"
                    sx={{ marginTop: '20px' }}
                >
                    Go Back to Home
                </Button>
            </Box>
        </ThemeProvider>
    );
}
