import React, { useState, useEffect } from 'react';
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

export default function BrandTypePage() {
    const navigate = useNavigate();
    const [brandName, setBrandName] = useState('');
    const [typeName, setTypeName] = useState('');
    const [brandResponseMessage, setBrandResponseMessage] = useState('');
    const [typeResponseMessage, setTypeResponseMessage] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);

    // New state for product details
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productPictureUrl, setProductPictureUrl] = useState('');
    const [productBrandId, setProductBrandId] = useState('');
    const [productTypeId, setProductTypeId] = useState('');
    const [productResponseMessage, setProductResponseMessage] = useState('');

    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        // Fetch brands and types for the dropdowns
        const fetchBrandsAndTypes = async () => {
            try {
                const brandsResponse = await fetch('http://localhost:8081/api/products/brands');
                const typesResponse = await fetch('http://localhost:8081/api/products/types');
                const brandsData = await brandsResponse.json();
                const typesData = await typesResponse.json();
                setBrands(brandsData);
                setTypes(typesData);
            } catch (error) {
                console.error('Error fetching brands and types:', error);
            }
        };

        fetchBrandsAndTypes();
    }, []);

    const handleGoBack = () => {
        navigate('/');
    };

    const handleBrandSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/api/products/brands', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: brandName }),
            });
            const data = await response.json();
            if (response.ok) {
                setBrandResponseMessage(`Brand "${data.name}" added successfully!`);
                setBrandName('');
                setBrands([...brands, data]);
            } else {
                setBrandResponseMessage('Failed to add brand. Please try again.');
            }
        } catch (error) {
            setBrandResponseMessage('An error occurred. Please try again.');
        }
    };

    const handleTypeSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/api/products/types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: typeName }),
            });
            const data = await response.json();
            if (response.ok) {
                setTypeResponseMessage(`Type "${data.name}" added successfully!`);
                setTypeName('');
                setTypes([...types, data]);
            } else {
                setTypeResponseMessage('Failed to add type. Please try again.');
            }
        } catch (error) {
            setTypeResponseMessage('An error occurred. Please try again.');
        }
    };

    const handleProductSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: productName,
                    description: productDescription,
                    price: productPrice,
                    pictureUrl: productPictureUrl,
                    brandId: productBrandId,
                    typeId: productTypeId
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setProductResponseMessage(`Product "${data.name}" added successfully!`);
                setProductName('');
                setProductDescription('');
                setProductPrice('');
                setProductPictureUrl('');
                setProductBrandId('');
                setProductTypeId('');
            } else {
                setProductResponseMessage('Failed to add product. Please try again.');
            }
        } catch (error) {
            setProductResponseMessage('An error occurred. Please try again.');
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
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Brand, Type or Product">
                    <Tab label="Add Brand" />
                    <Tab label="Add Type" />
                    <Tab label="Add Product" />
                </Tabs>
                {selectedTab === 0 && (
                    <>
                        <Typography variant="h2" gutterBottom>
                            Add a New Brand
                        </Typography>
                        <Box component="form" onSubmit={handleBrandSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
                            <TextField
                                label="Brand Name"
                                variant="outlined"
                                fullWidth
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
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
                                Add Brand
                            </Button>
                        </Box>
                        {brandResponseMessage && (
                            <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
                                {brandResponseMessage}
                            </Typography>
                        )}
                    </>
                )}
                {selectedTab === 1 && (
                    <>
                        <Typography variant="h2" gutterBottom>
                            Add a New Type
                        </Typography>
                        <Box component="form" onSubmit={handleTypeSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
                            <TextField
                                label="Type Name"
                                variant="outlined"
                                fullWidth
                                value={typeName}
                                onChange={(e) => setTypeName(e.target.value)}
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
                                Add Type
                            </Button>
                        </Box>
                        {typeResponseMessage && (
                            <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
                                {typeResponseMessage}
                            </Typography>
                        )}
                    </>
                )}
                {selectedTab === 2 && (
                    <>
                        <Typography variant="h2" gutterBottom>
                            Add a New Product
                        </Typography>
                        <Box component="form" onSubmit={handleProductSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
                            <TextField
                                label="Product Name"
                                variant="outlined"
                                fullWidth
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Price"
                                variant="outlined"
                                fullWidth
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Picture URL"
                                variant="outlined"
                                fullWidth
                                value={productPictureUrl}
                                onChange={(e) => setProductPictureUrl(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                            />
                            <TextField
                                label="Brand ID"
                                variant="outlined"
                                fullWidth
                                value={productBrandId}
                                onChange={(e) => setProductBrandId(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                                select
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option value="" />
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                label="Type ID"
                                variant="outlined"
                                fullWidth
                                value={productTypeId}
                                onChange={(e) => setProductTypeId(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                required
                                select
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option value="" />
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </TextField>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                            >
                                Add Product
                            </Button>
                        </Box>
                        {productResponseMessage && (
                            <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
                                {productResponseMessage}
                            </Typography>
                        )}
                    </>
                )}
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
