import { CollapseList, Loading } from "@/components";
import { Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as productService from "@/service/product.service";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { SpaceBetweenBox } from "@/components/styled-components/global.component";
// INCONS
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ROUTES } from "@/routes/routes";
import { CustomCard, FlexBoxSpaced } from "./styled.component";
import VideoMoulesCollapseList from "@/components/collapse-list/collapse-list.component";

interface IPriceType {
    value: PriceType;
    label: string;
}

const EditProductPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const { t } = useTranslation();

    const pricingTypes: IPriceType[] = [
        {
            value: 'FREE',
            label: t('global.free')
        },
        {
            value: 'ONE_TIME',
            label: t('global.oneTimePayment')
        },
        {
            value: 'SUBSCRIPTION',
            label: t('global.subscription')
        }
    ];

    const { accessToken } = useSelector((state: RootState) => state.auth.authData);

    const [product, setProduct] = useState<Product | null>(null);

    const [priceType, setPriceType] = useState<PriceType | null>(null);

    const [courseModules, setCourseModules] = useState<IVideoModule[] | null>(null);

    const loadInitData = async () => {
        if (id) {
            const { data, error } = await productService.getProductInfo(accessToken, id);

            if (data) {
                console.log(data);
                if (data.type == 'COURSE') {
                    const courseInfo = await productService.getVideoModules(accessToken, id);
                    if (courseInfo.data) {
                        setCourseModules(courseInfo.data);
                    }
                }
                setProduct({ ...data, price: data.price ? data.price : 0 });
            }
        }

    }

    useEffect(() => {
        loadInitData().catch(console.log);
    }, []);

    if (product == null) {
        return (
            <Loading />
        );
    }

    return (
        <Container sx={{ py: '2rem', display: 'flex', flexDirection: 'column' }}>

            <Typography variant="h4" fontWeight={600}>
                {t('products.editTitle')}
            </Typography>

            <Typography sx={{ mt: 5 }} variant="h5" fontWeight={600}>
                Nombre
            </Typography>

            <TextField
                id="product-edit-name"
                label={t('global.name')}
                variant="outlined"
                sx={{ maxWidth: '500px', mt: 3 }}
                value={product.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setProduct((prev) => ({ ...prev as Product, name: event.target.value }));
                }}
            />

            <Typography sx={{ mt: 5 }} variant="h5" fontWeight={600}>
                Precio
            </Typography>

            <TextField
                sx={{ mt: 3, maxWidth: '500px', '& .MuiSelect-select': { display: 'flex' } }}
                id="product-payment-type"
                select
                label={t('global.paymentType')}
                value={product.priceType ? product.priceType : ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setProduct((prev) => ({ ...prev as Product, priceType: event.target.value as PriceType }));
                }}
            >
                {pricingTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={{ display: 'flex', alignItems: 'center' }}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            {
                product.priceType != 'FREE' &&
                <TextField
                    id="product-edit-price"
                    label={t('global.value')}
                    variant="outlined"
                    type="number"
                    sx={{ maxWidth: '500px', mt: 3 }}
                    value={product.price}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setProduct((prev) => ({ ...prev as Product, price: Number(event.target.value) }));
                    }}
                />
            }

            { /** TELEGRAM **/}
            {
                product.type == "TELEGRAM" &&
                <SpaceBetweenBox sx={{ mt: 5 }}>
                    <Typography variant="h5" fontWeight={600}>
                        {t('products.telegramTitle')}
                    </Typography>

                    <Button variant="contained" color="secondary" onClick={() => { navigate(ROUTES.private.addTelegram) }}>
                        {t('products.addTelegramButton')} &nbsp; <AddOutlinedIcon fontSize="small" />
                    </Button>
                </SpaceBetweenBox>
            }

            {/** COURSE **/}
            {
                <>
                    <CustomCard>
                        <FlexBoxSpaced>
                            <Typography variant="h6" fontWeight={500}>
                                {t('products.modules')}
                            </Typography>

                            <Button variant="contained" color="secondary">
                                {t('products.addModule')} &nbsp; <AddOutlinedIcon fontSize="small" />
                            </Button>
                        </FlexBoxSpaced>
                    </CustomCard>

                    {
                        courseModules != null && <VideoMoulesCollapseList courseModules={courseModules} />
                    }
                </>
            }

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 12 }}>
                <Button variant="contained" color="success" sx={{}}>
                    {t('global.save')}
                </Button>
            </Box>
        </Container>
    );
}

export default EditProductPage;