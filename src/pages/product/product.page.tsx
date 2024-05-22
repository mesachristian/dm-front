import { StyledTableCell, StyledTableRow } from "@/components";
import * as productService from "@/service/product.service";
import { Alert, Box, Button, CircularProgress, Container, MenuItem, Modal, Paper, Snackbar, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "@/components/loading/loading.component";

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from "react-router-dom";


const ProductPage = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState<any[] | null>(null);

    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [showCreatedAlert, setShowCreatedAlert] = useState<boolean>(false);

    const handleCloseCreatedAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowCreatedAlert(false);
    };

    const loadInitData = async () => {
        const res = await productService.getProducts();
        setProducts(res);
    }

    const createProduct = async (name: string, type: ProductType) => {
        const newProductId = await productService.createProduct(name, type);
        setShowCreatedAlert(true);
        await new Promise( (resolve) => setTimeout(resolve, 3000));
        navigate('/products/edit/' + newProductId);
        //console.log("newProduct: ", newProductId);
    }

    useEffect(() => {
        loadInitData().catch(console.log);
    }, []);

    if (products == null) {
        return <Loading />
    }

    return (

        <Container sx={{ py: '2rem' }}>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight={600}>
                    Productos
                </Typography>

                <Button variant="contained" color="success" onClick={() => setOpenCreateModal(true)}>
                    Agregar &nbsp; <AddOutlinedIcon fontSize="small" />
                </Button>
            </Box>


            {
                products &&
                <TableContainer component={Paper} sx={{ mt: 5 }}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Nombre</StyledTableCell>
                                <StyledTableCell align="right">Tipo</StyledTableCell>
                                <StyledTableCell align="right">Acciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <StyledTableRow key={product.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {product.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{product.type}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                            <Box
                                                sx={{
                                                    p: 1,
                                                    borderRadius: '6px',
                                                    width: '36px',
                                                    height: '36px',
                                                    backgroundColor: 'primary.main',
                                                    color: 'primary.contrastText'
                                                }}>
                                                <BorderColorOutlinedIcon fontSize="small" />
                                            </Box>

                                            <Box
                                                sx={{
                                                    p: 1,
                                                    ml: 2,
                                                    borderRadius: '6px',
                                                    width: '36px',
                                                    height: '36px',
                                                    backgroundColor: 'error.light',
                                                    color: 'primary.contrastText'
                                                }}>
                                                <DeleteOutlineRoundedIcon fontSize="small" />
                                            </Box>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

            <Modal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <CreateProductModal handleCreate={createProduct} />
                </div>
            </Modal>

            <Snackbar open={showCreatedAlert} autoHideDuration={6000} onClose={handleCloseCreatedAlert}>
                <Alert
                    onClose={handleCloseCreatedAlert}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Producto creado!
                </Alert>
            </Snackbar>
        </Container>
    );
}

const PRODUCT_TYPES = [
    {
        value: 'TELEGRAM',
        label: 'Telegram',
        icon: <img src="https://telegram.apps.whop.com/_next/image?url=%2F_static%2Ftelegram.png&w=64&q=75" width={24} height={24} style={{ borderRadius: '50%' }} />
    },
    {
        value: 'DISCORD',
        label: 'Discord',
        icon: <img width={24} height={24} style={{ borderRadius: '5px' }} src="https://img.whop.com/EvPz7dvsMMCE-UYlUlTbSzDHbhBR6bV3X32V0qw28oU/rs:fill:32:32/el:1/dpr:2/aHR0cHM6Ly9hc3NldHMud2hvcC5jb20vdXBsb2Fkcy8yMDI0LTAzLTIxL3VzZXJfNDI2NDhfNmUwMGEyMTQtYWI1Zi00ODFkLTg5MmQtMjAwOWIwOWJhNDljLndlYnA" />
        //icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-fui-icon="true"><path d="M19.6361 5.0228C18.1907 4.35756 16.6648 3.88561 15.0973 3.61902C14.8828 4.00447 14.6888 4.40105 14.5159 4.8071C12.8463 4.55418 11.1484 4.55418 9.47881 4.8071C9.30587 4.4011 9.1118 4.00452 8.8974 3.61902C7.32897 3.88786 5.80205 4.36093 4.35518 5.02628C1.48276 9.29851 0.70409 13.4646 1.09342 17.5716C2.77558 18.821 4.6584 19.7712 6.66003 20.3809C7.11074 19.7715 7.50956 19.1251 7.85226 18.4483C7.20135 18.2039 6.57311 17.9024 5.9748 17.5473C6.13227 17.4325 6.28627 17.3142 6.43508 17.1994C8.17601 18.0224 10.0761 18.4491 12 18.4491C13.9238 18.4491 15.8239 18.0224 17.5648 17.1994C17.7154 17.3229 17.8694 17.4412 18.0251 17.5473C17.4257 17.903 16.7963 18.2051 16.1442 18.4501C16.4865 19.1265 16.8853 19.7724 17.3364 20.3809C19.3398 19.7737 21.224 18.8239 22.9065 17.5734C23.3633 12.8106 22.1261 8.68273 19.6361 5.0228ZM8.34541 15.0459C7.26047 15.0459 6.36414 14.0561 6.36414 12.8384C6.36414 11.6208 7.22932 10.6223 8.34195 10.6223C9.45458 10.6223 10.344 11.6208 10.325 12.8384C10.3059 14.0561 9.45112 15.0459 8.34541 15.0459ZM15.6545 15.0459C14.5678 15.0459 13.675 14.0561 13.675 12.8384C13.675 11.6208 14.5401 10.6223 15.6545 10.6223C16.7689 10.6223 17.6514 11.6208 17.6323 12.8384C17.6133 14.0561 16.7602 15.0459 15.6545 15.0459Z" fill="currentColor"></path></svg>
    }
];

interface CreateProductModalProps {
    handleCreate: (name: string, type: ProductType) => void;
}

const CreateProductModal = ({ handleCreate }: CreateProductModalProps) => {

    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState<ProductType>("TELEGRAM");

    const [loadingCreation, setLoadingCreation] = useState<boolean>(false);

    const handleSubmit = () => {
        if (productName != "") {
            setLoadingCreation(true);
            handleCreate(productName, productType);
            setLoadingCreation(false);
        }
    }

    return (
        <Box
            sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '1px solid #000',
                borderRadius: '16px',
                boxShadow: 24,
                p: 4,
            }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Crear Producto
            </Typography>

            <TextField
                required id="cre-pro-name"
                label="Nombre"
                variant="outlined"
                sx={{ minWidth: '100%', mt: 5 }}
                value={productName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setProductName(event.target.value);
                }}
            />

            <div>
                <TextField
                    sx={{ mt: 3, minWidth: '100%', '& .MuiSelect-select': { display: 'flex' } }}
                    id="outlined-select-currency"
                    select
                    label="Tipo de Producto"
                    defaultValue="TELEGRAM"
                    helperText="Seleccione el tipo de producto"
                    value={productType}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setProductType(event.target.value as ProductType);
                    }}
                >
                    {PRODUCT_TYPES.map((option) => (
                        <MenuItem key={option.value} value={option.value} sx={{ display: 'flex', alignItems: 'center' }}>
                            {option.icon}&nbsp;&nbsp;{option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <Button variant="contained" color="success" sx={{ minWidth: '100%', mt: 5 }} onClick={handleSubmit}>
                {
                    !loadingCreation && <>Agregar </>
                }
                {
                    loadingCreation && <CircularProgress />
                }
            </Button>
        </Box>
    );
}

export default ProductPage;