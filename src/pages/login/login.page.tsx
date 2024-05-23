import { StandardButton, StandardTextInput } from "@/components/styled-components/global.component";
import { setAuthData } from "@/redux/reducers/auth.reducer";
import { ROUTES } from "@/routes/routes";
import * as authService from "@/service/auth.service";
import { Alert, Box, CircularProgress, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IFormValues {
    email: string;
    password: string;
}

const LoginPage = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [showErrorSnackbar, setShowErrorSnackbar] = useState<boolean>(false);
    const [errorCode, setErrorCode] = useState("");

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit: SubmitHandler<IFormValues> = async (formData) => {
        setLoadingForm(true);
        const { data, error } = await authService.signIn(formData.email, formData.password);

        if (data) {
            const accessToken = data['access_token'];
            dispatch(setAuthData({ email: formData.email, accessToken: accessToken }));
            navigate(ROUTES.private.home);
        }

        if (error) {
            setShowErrorSnackbar(true);
            setErrorCode(error.message);
        }

        setLoadingForm(false);
    }


    return (
        <Box sx={{ minHeight: '100vh', display: 'flex' }}>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showErrorSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowErrorSnackbar(false)}
            >
                <Alert
                    onClose={() => setShowErrorSnackbar(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {
                        t("global." + errorCode)
                    }
                </Alert>
            </Snackbar>

            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fafbfb'
                }}>

                <img style={{ maxWidth: '480px' }} src="https://minimals.cc/assets/illustrations/illustration_dashboard.png" />

            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingX: '2.5rem',
                    maxWidth: '560px',
                    minWidth: '480px',
                    backgroundColor: 'white'
                }}>
                <Typography variant="h4" component="h3" sx={{ fontWeight: '600' }}>
                    {t('login.welcome')}
                </Typography>

                <Box sx={{ display: 'flex' }}>
                    <Typography variant="subtitle2" component="p">
                        {t("login.needAccount")} &nbsp;
                    </Typography>
                    <Typography
                        onClick={() => { navigate(ROUTES.public.signup) }}
                        variant="subtitle2"
                        component="p"
                        sx={{ color: 'rgb(0, 167, 111)', cursor: 'pointer' }}>
                        {t("login.createAccount")}
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <StandardTextInput
                                type="email"
                                {...field}
                                {...register('email', {
                                    required: t("login.emailRequired"),
                                })}
                                id="login-email"
                                label={t("login.email")}
                                variant="outlined"
                                sx={{ minWidth: '100%', mt: 6 }}
                            />
                        }
                    />
                    {
                        errors.email &&
                        <Typography variant="subtitle2" color="error" component="span">
                            {errors.email.message}
                        </Typography>
                    }

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) =>
                            <StandardTextInput
                                id="login-password"
                                type="password"
                                {...field}
                                {...register('password', {
                                    required: t("login.passwordRequired"),
                                })}
                                label={t("login.password")}
                                variant="outlined"
                                sx={{ minWidth: '100%', mt: 2 }}
                            />
                        }
                    />
                    {
                        errors.password &&
                        <Typography variant="subtitle2" color="error" component="span">
                            {errors.password.message}
                        </Typography>
                    }

                    <Typography variant="subtitle2" component="p" sx={{ textDecoration: 'underline', alignSelf: 'end', cursor: 'pointer' }}>
                        {t("login.forgotPassword")}
                    </Typography>

                    <StandardButton variant="contained" type="submit"
                    >
                        {
                            loadingForm && <CircularProgress color="inherit" size={20} />
                        }
                        {
                            !loadingForm && <>{t("login.login")}</>
                        }
                    </StandardButton>

                </form>

            </Box>
        </Box>
    );
}

export default LoginPage;