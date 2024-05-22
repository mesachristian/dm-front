import { Loading } from "@/components";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditProductPage = () => {

    const { id } = useParams();

    const [product, setProduct] = useState<any | null>(null);

    const loadInitData = async() => {

    }   

    useEffect(() => {
        loadInitData().catch(console.log);
    }, []);

    if( product == null ){
        return(
            <Loading />
        );
    }

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