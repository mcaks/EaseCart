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
    const [registerDescription, setRegisterDescription] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerResponseMessage, setRegisterResponseMessage] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);

    const handleGoBack = () => {
        navigate('/');
    };

    const handleRegisterSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (registerPassword !== confirmPassword) {
            setRegisterResponseMessage('Passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/api/products/registers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: registerName,
                    description: registerDescription,
                    email: registerEmail,
                    password: registerPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setRegisterResponseMessage(`Register "${data.name}" added successfully!`);
                setRegisterName('');
                setRegisterDescription('');
                setRegisterEmail('');
                setRegisterPassword('');
                setConfirmPassword('');
            } else {
                setRegisterResponseMessage('Failed to add register. Please try again.');
            }
        } catch (error) {
            setRegisterResponseMessage('An error occurred. Please try again.');
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
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Add Register">
                    <Tab label="Add Register" />
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
                    </>
                )}
                
            </Box>
        </ThemeProvider>
    );
}
