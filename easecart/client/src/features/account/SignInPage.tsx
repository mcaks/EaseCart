import React, { useState } from 'react';
import { Typography, Button, Box, CssBaseline, TextField, Tab, Tabs } from "@mui/material";
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
                    backgroundColor: 'white',
                },
                html: {
                    height: '100%',
                    width: '100%',
                },
            },
        },
    },
});

export default function LoginPage() {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginResponseMessage, setLoginResponseMessage] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);

    const handleGoBack = () => {
        navigate('/');
    };

    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setLoginResponseMessage(`Logged in as ${data.name}`);
                // Handle successful login (e.g., set tokens, redirect)
            } else {
                setLoginResponseMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setLoginResponseMessage('An error occurred. Please try again.');
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
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
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Login Tab">
                    <Tab label="Login" />
                </Tabs>
                {selectedTab === 0 && (
                    <>
                        <Typography variant="h2" gutterBottom>
                            Login to Your Account
                        </Typography>
                        <Box component="form" onSubmit={handleLoginSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Box>
                        {loginResponseMessage && (
                            <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
                                {loginResponseMessage}
                            </Typography>
                        )}
                    </>
                )}
                
            </Box>
        </ThemeProvider>
    );
}
