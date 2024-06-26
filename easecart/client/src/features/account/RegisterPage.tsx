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

export default function RegisterPage() {
    const navigate = useNavigate();
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerAddress, setRegisterAddress] = useState('');
    const [registerCountry, setRegisterCountry] = useState('');
    const [registerPost, setRegisterPost] = useState('');
    const [registerResponseMessage, setRegisterResponseMessage] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);

    const handleGoBack = () => {
        navigate('/');
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        if (registerPassword !== confirmPassword) {
            setRegisterResponseMessage('Passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: registerName,
                    email: registerEmail,
                    password: registerPassword,
                    confirmPassword: confirmPassword,
                    address: registerAddress,
                    country: registerCountry,
                    post: registerPost,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setRegisterResponseMessage(`User "${data.name}" registered successfully!`);
                setRegisterName('');
                setRegisterEmail('');
                setRegisterPassword('');
                setConfirmPassword('');
                setRegisterAddress('');
                setRegisterCountry('');
                setRegisterPost('');
            } else {
                setRegisterResponseMessage(data.message || 'Failed to register. Please try again.');
            }
        } catch (error) {
            setRegisterResponseMessage('An error occurred. Please try again.');
        }
    };

    const handleTabChange = (event, newValue) => {
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
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Register">
                    <Tab label="Register" />
                </Tabs>
                {selectedTab === 0 && (
                    <>
                        <Typography variant="h2" gutterBottom>
                            Register a New Account
                        </Typography>
                        <Box component="form" onSubmit={handleRegisterSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                value={registerAddress}
                                onChange={(e) => setRegisterAddress(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Country"
                                variant="outlined"
                                fullWidth
                                value={registerCountry}
                                onChange={(e) => setRegisterCountry(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Post"
                                variant="outlined"
                                fullWidth
                                value={registerPost}
                                onChange={(e) => setRegisterPost(e.target.value)}
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
                                Register
                            </Button>
                        </Box>
                        {registerResponseMessage && (
                            <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
                                {registerResponseMessage}
                            </Typography>
                        )}
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: '20px' }}>
                            You pay with cash on delivery, that's why you add address!!
                        </Typography>
                    </>
                )}
            </Box>
        </ThemeProvider>
    );
}
