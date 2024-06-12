import { Alert, Box, Button, Card, Container, Snackbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as telegramService from "@/service/telegram.service";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loading } from "@/components";

// ICONS
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import LoopIcon from '@mui/icons-material/Loop';

const AddTelegramPage = () => {

    const { t } = useTranslation();

    const { accessToken } = useSelector((state: RootState) => state.auth.authData);

    const [code, setCode] = useState<string | null>(null);
    const [showCopyAlert, setShowCopyAlert] = useState<boolean>(false);

    const loadCode = async () => {
        const { data } = await telegramService.generateCode(accessToken);
        setCode(data.code);
    }

    const hanldeCopyToClipboard = () => {
        if (code) {
            navigator.clipboard.writeText(code);
            setShowCopyAlert(true);
        }
    }

    const handleCloseCopyAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowCopyAlert(false);
    };

    useEffect(() => {
        loadCode().catch(console.log);
    }, []);

    if (code == null) {
        return <Loading />
    }

    return (
        <Container sx={{ py: '2rem' }}>

            <Typography variant="h4" fontWeight={600}>
                {t('telegram.title')}
            </Typography>

            <Box
                sx={{
                    mt: 5,
                    border: 1,
                    borderColor: 'divider',
                    width: '100%',
                    borderRadius: '.75rem'
                }}>

                {/** TITLE **/}
                <Card
                    elevation={1}
                    sx={{
                        boxShadow: 'none',
                        borderTopRightRadius: 'inherit',
                        borderTopLeftRadius: 'inherit',
                        padding: '1rem 2rem'
                    }}>
                    <Typography variant="h6" component="h5">
                        {t('telegram.step1')}
                    </Typography>
                </Card>

                <Card elevation={0} sx={{ padding: '1rem 2rem', borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="body1" component="p">
                        {t('telegram.group')}
                    </Typography>

                    <Typography variant="body1" component="p" color="grey.500">
                        {t('telegram.step1Group')}
                    </Typography>
                </Card>

                <Card
                    elevation={0}
                    sx={{
                        borderBottomLeftRadius: 'inherit',
                        borderBottomRightRadius: 'inherit',
                        padding: '1rem 2rem',
                        borderTop: 1,
                        borderColor: 'divider',
                    }}>
                    <Typography variant="body1" component="p">
                        {t('telegram.channel')}
                    </Typography>

                    <Typography variant="body1" component="p" color="grey.500">
                        {t('telegram.step1Channel')}
                    </Typography>
                </Card>

            </Box>

            <Box
                sx={{
                    mt: 5,
                    border: 1,
                    borderColor: 'divider',
                    width: '100%',
                    borderRadius: '.75rem'
                }}>

                {/** TITLE **/}
                <Card
                    elevation={1}
                    sx={{
                        boxShadow: 'none',
                        borderTopRightRadius: 'inherit',
                        borderTopLeftRadius: 'inherit',
                        padding: '1rem 2rem'
                    }}>
                    <Typography variant="h6" component="h5">
                        {t('telegram.step2')}
                    </Typography>
                </Card>

                <Card
                    elevation={0}
                    sx={{
                        borderBottomLeftRadius: 'inherit',
                        borderBottomRightRadius: 'inherit',
                        padding: '1rem 2rem',
                        borderTop: 1,
                        borderColor: 'divider',
                    }}>
                    <Typography variant="body1" component="p">
                        {t('telegram.verify')}
                    </Typography>

                    <Typography variant="body1" component="p" color="grey.500">
                        {t('telegram.step2Text')}
                    </Typography>

                    <Box sx={{ display: 'flex', mt: '1rem' }}>
                        <Box
                            sx={{
                                border: 1,
                                borderColor: 'divider',
                                padding: 1,
                                width: 'fit-content',
                                borderRadius: '5px'
                            }}>
                            {code}
                        </Box>

                        <Button color="secondary" sx={{ mx: '10px', minWidth: '30px' }} onClick={hanldeCopyToClipboard}>
                            <ContentCopyIcon fontSize="small" />
                        </Button>

                        <Button color="secondary" onClick={loadCode} sx={{ minWidth: '30px' }}>
                            <ReplayIcon fontSize="small" />
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', mt: '0.6rem', alignItems: 'center', color: 'grey.500' }}>
                        <LoopIcon
                            sx={{
                                mr: '5px',
                                animation: "spin 2s linear infinite",
                                "@keyframes spin": {
                                    "0%": {
                                        transform: "rotate(360deg)",
                                    },
                                    "100%": {
                                        transform: "rotate(0deg)",
                                    },
                                },
                            }}
                        />

                        <Typography variant="body2">
                            {t("telegram.waitingConfirmation")}
                        </Typography>
                    </Box>

                </Card>

            </Box>

            <Snackbar open={showCopyAlert} autoHideDuration={3000} onClose={handleCloseCopyAlert}>
                <Alert
                    onClose={handleCloseCopyAlert}
                    severity="info"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {t("telegram.copiedToClipboard")}
                </Alert>
            </Snackbar>

        </Container>
    );
}

export default AddTelegramPage;