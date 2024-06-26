import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Product } from "../../app/models/product";

export default function ProductDetails(){
    const { basket } = useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product>({ id: 0, name: '', description: '', price: 0, pictureUrl: '', productType: '', productBrand: '' });
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i=> i.id === product?.id);

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

    const formatPrice = (price: number): string =>{
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(price);
    };

    useEffect(() => {
        if (id) {
            agent.Store.details(parseInt(id))       
                .then(response => setProduct(response))
                .catch(error => {
                    console.error("Failed to fetch product:", error);
                    setProduct(null); // or handle error state accordingly
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const updateQuantity = async () => {
        try {
            setSubmitting(true);
            const newItem = {
                ...product!,
                quantity: quantity
            };
            if (item) {
                const quantityDifference = quantity - item.quantity;
                if (quantityDifference > 0) {
                    // Increment the quantity of an existing item in the basket
                    await agent.Basket.incrementItemQuantity(item.id, quantityDifference, dispatch);
                } else if (quantityDifference < 0) {
                    // Decrement the quantity of an existing item in the basket
                    await agent.Basket.decrementItemQuantity(item.id, Math.abs(quantityDifference), dispatch);
                }
            } else {
                // Add a new item to the basket
                await agent.Basket.addItem(newItem, dispatch);
            }
            setSubmitting(false);
        } catch (error) {
            console.error("Failed to update quantity:", error);
            // Handle error
            setSubmitting(false);
        }
    };

    const deleteProduct = async () => {
        try {
            await agent.Store.deleteProduct(parseInt(id));
            // Redirect or handle success using window.location
            window.location.href = '/products'; // Redirect to products page after deletion
        } catch (error) {
            console.error("Failed to delete product:", error);
            // Handle error state or alert user
        }
    };
    

    if (loading) return <h3>Loading....</h3>;
    if (!product) return <h3>Product not found</h3>;

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={"/images/products/"+extractImageName(product)} alt={product.name} style={{ width: '100%' }}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb:2 }}/>
                <Typography gutterBottom color='secondary' variant="h4">{formatPrice(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.productType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.productBrand}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={inputChange} 
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            sx={{ height: '55px' }}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                            loading={submitting}
                            onClick={updateQuantity}
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton
                            sx={{ height: '55px', marginTop: '10px' }}
                            color='error'
                            size='large'
                            variant='contained'
                            fullWidth
                            loading={submitting}
                            onClick={deleteProduct}
                        >
                            Delete Product
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
