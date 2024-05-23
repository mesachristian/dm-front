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
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpPage = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [showErrorSnackbar, setShowErrorSnackbar] = useState<boolean>(false);
    const [errorCode, setErrorCode] = useState("");

    const { register, control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    const onSubmit: SubmitHandler<IFormValues> = async (formData) => {
        setLoadingForm(true);
        const { data, error } = await authService.createAccount(formData.name, formData.email, formData.password);

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
                    {t('signup.welcome')}
                </Typography>

                <Box sx={{ display: 'flex' }}>
                    <Typography variant="subtitle2" component="p">
                        {t("signup.hasAccount")} &nbsp;
                    </Typography>
                    <Typography
                        onClick={() => { navigate(ROUTES.public.login) }}
                        variant="subtitle2"
                        component="p"
                        sx={{ color: 'rgb(0, 167, 111)', cursor: 'pointer' }}>
                        {t("signup.login")}
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) =>
                            <StandardTextInput
                                type="text"
                                {...field}
                                {...register('name', {
                                    required: t("signup.nameRequired"),
                                })}
                                id="signup-name"
                                label={t("signup.name")}
                                variant="outlined"
                                sx={{ minWidth: '100%', mt: 6 }}
                            />
                        }
                    />
                    {
                        errors.name &&
                        <Typography variant="subtitle2" color="error" component="span">
                            {errors.name.message}
                        </Typography>
                    }

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <StandardTextInput
                                type="text"
                                {...field}
                                {...register('email', {
                                    required: t("signup.emailRequired"),
                                })}
                                autoComplete='off'
                                id="signup-email"
                                label={t("signup.email")}
                                variant="outlined"
                                sx={{ minWidth: '100%', mt: 2 }}
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
                                autoComplete='off'
                                {...field}
                                {...register('password', {
                                    required: 'Se requiere la contraseña',
                                })}
                                label={t("signup.password")}
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

                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) =>
                            <StandardTextInput
                                id="signup-confirmPassword"
                                type="password"
                                autoComplete="off"
                                {...field}
                                {...register('confirmPassword', {
                                    required: t("signup.confirmPasswordRequired"),
                                    validate: (val: string) => {
                                        if (watch('password') != val) {
                                            return t("signup.passwordsDontMatch");
                                        }
                                    },
                                })}
                                label={t("signup.confirmPassword")}
                                variant="outlined"
                                sx={{ minWidth: '100%', mt: 2 }}
                            />
                        }
                    />
                    {
                        errors.confirmPassword &&
                        <Typography variant="subtitle2" color="error" component="span">
                            {errors.confirmPassword.message}
                        </Typography>
                    }

                    <StandardButton
                        variant="contained"
                        type="submit"
                        disabled={loadingForm}
                    >
                        {
                            loadingForm && <CircularProgress color="inherit" size={20} />
                        }
                        {
                            !loadingForm && <>{t("signup.signup")}</>
                        }
                    </StandardButton>

                </form>

            </Box>
        </Box>
    );
}

export default SignUpPage;