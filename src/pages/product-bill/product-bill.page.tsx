import { ColorModeContext } from "@/context/color-mode.context";
import { Box, Button, Container, Grid, Typography, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoverContainer } from "./styled.component";
import * as productService from "@/service/product-bill.service";
import { Loading } from "@/components";

const TGIcon = <img src="https://telegram.apps.whop.com/_next/image?url=%2F_static%2Ftelegram.png&w=64&q=75" width={30} height={30} style={{ borderRadius: '50%' }} />;

const DISCORDIcon = <img width={64} height={64} style={{ borderRadius: '5px' }} src="https://img.whop.com/EvPz7dvsMMCE-UYlUlTbSzDHbhBR6bV3X32V0qw28oU/rs:fill:32:32/el:1/dpr:2/aHR0cHM6Ly9hc3NldHMud2hvcC5jb20vdXBsb2Fkcy8yMDI0LTAzLTIxL3VzZXJfNDI2NDhfNmUwMGEyMTQtYWI1Zi00ODFkLTg5MmQtMjAwOWIwOWJhNDljLndlYnA" />;

const ProductBillPage = () => {

    const { productId } = useParams();
    const colorMode = useContext(ColorModeContext);

    const [productBillInfo, setProductBillInfo] = useState<ProductBillDto | null>(null);

    const loadData = async () => {

        console.log("signature", productService.generateSignature(
            '4Vj8eK4rloUd272L48hsrarnUA', 
            '508029', 
            'TestPayU',
            '20000',
            'COP').toString()
        );

        const { data, error } = await productService.getProductBillInfo('', '');

        if (data) {
            setProductBillInfo(data);
        }
    }

    useEffect(() => {
        colorMode.setColorMode('light');
        loadData().catch(console.log);
    }, []);

    if (productBillInfo == null) {
        return <Loading />
    }

    return (
        <Container sx={{ py: '2rem' }}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <CoverContainer>
                        <img
                            src="https://d502jbuhuh9wk.cloudfront.net/courses/64d6fd5ee4b06d5c48a17e60/8iE3Y1691786102270.jpg"

                        />
                    </CoverContainer>
                </Grid >

                <Grid item xs={8}>
                    <Box sx={{ border: '1px solid black', minHeight: '100px', marginRight: '-1px', padding: '1rem 1.5rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {TGIcon}

                            <Typography variant="h5" component="h2" sx={{ ml: '10px' }}>
                                {productBillInfo.name}
                            </Typography>
                        </Box>

                        <Typography variant="body1" component="p" sx={{ mt: '1.5rem', textAlign: 'justify' }}>
                            {productBillInfo.description}
                        </Typography>
                    </Box>
                </Grid >

                <Grid item xs={4}>
                    <Box
                        sx={{
                            border: '1px solid black',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            px: '1rem'
                        }}>

                        <Typography variant="h6">
                            Precio
                        </Typography>

                        <Typography variant="subtitle1">
                            300,000 COP
                        </Typography>

                        {/** PAYU FORM SEE DOCS AND CHANGE THE CODE TO BE DYNAMIC  */}

                        <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
                            <input name="merchantId" type="hidden" value="508029" />
                            <input name="accountId" type="hidden" value="512321" />
                            <input name="description" type="hidden" value="Test PAYU" />
                            <input name="referenceCode" type="hidden" value="TestPayU" />
                            <input name="amount" type="hidden" value="20000" />
                            <input name="tax" type="hidden" value="3193" />
                            <input name="taxReturnBase" type="hidden" value="16806" />
                            <input name="currency" type="hidden" value="COP" />
                            <input name="signature" type="hidden" value="7ee7cf808ce6a39b17481c54f2c57acc" />
                            <input name="test" type="hidden" value="0" />
                            <input name="buyerEmail" type="hidden" value="test@test.com" />
                            <input name="responseUrl" type="hidden" value="http://www.test.com/response" />
                            <input name="confirmationUrl" type="hidden" value="http://www.test.com/confirmation" />

                            <Button color="secondary" type="submit" sx={{ width: '100%'}} variant="contained">
                                Obtener Acceso
                            </Button>
                        </form>
                    </Box>
                </Grid >
            </Grid>


        </Container>
    );
}

export default ProductBillPage;