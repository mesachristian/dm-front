import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const EditProductPage = () => {

    const { id } = useParams();

    return (
        <Container sx={{ py: '2rem' }}>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight={600}>
                    Editar Producto {id}
                </Typography>
            </Box>

        </Container>
    );
}

export default EditProductPage;