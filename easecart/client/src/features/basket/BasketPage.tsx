import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, Button, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { Add, Remove } from "@mui/icons-material";
import BasketSummary from "./BasketSummary";
import emailjs from 'emailjs-com';

export default function BasketPage() {
    const { basket } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const { Basket: BasketActions } = agent;
    const [email, setEmail] = React.useState('');

    const removeItem = (productId: number) => {
        BasketActions.removeItem(productId, dispatch);
    };

    const decrementItem = (productId: number, quantity: number = 1) => {
        BasketActions.decrementItemQuantity(productId, quantity, dispatch);
    };

    const incrementItem = (productId: number, quantity: number = 1) => {
        BasketActions.incrementItemQuantity(productId, quantity, dispatch);
    };

    // Define the extractImageName function
    const extractImageName = (item: Product): string | null => {
        if (item && item.pictureUrl) {
            const parts = item.pictureUrl.split('/');
            if (parts.length > 0) {
                return parts[parts.length - 1];
            }
        }
        return null;
    };

    // Function to format the price with INR currency symbol
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(price);
    };

    if (!basket || basket.items.length === 0) return <Typography variant="h3">Your basket is empty.</Typography>;

    const handleCheckout = (e) => {
        e.preventDefault();

        const templateParams = {
            to_email: email,
            message: "Thanks for your order"
        };

        emailjs.send('service_y5a07v9', 'template_e33nrz6', templateParams, 'AebgZpCpjLWe1xiLp')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.log('FAILED...', error);
            });
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Image</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Subtotal</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.pictureUrl && (
                                        <img src={"/images/products/" + extractImageName(item)} alt="Product" width="50" height="50" />
                                    )}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{formatPrice(item.price)}</TableCell>
                                <TableCell>
                                    <IconButton color='error' onClick={() => decrementItem(item.id)}>
                                        <Remove />
                                    </IconButton>
                                    {item.quantity}
                                    <IconButton color='error' onClick={() => incrementItem(item.id)}>
                                        <Add />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => removeItem(item.id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2} p={2} bgcolor="background.paper" borderRadius={4}>
                <BasketSummary />
                <TextField
                    label="Before you complete your purchase, please enter your confirmation email address!"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <Button
                    onClick={handleCheckout}
                    variant='contained'
                    size='large'
                    fullWidth
                >
                    Checkouuut
                </Button>
            </Box>
        </>
    );
}
