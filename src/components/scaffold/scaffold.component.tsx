import { Box, Button, Container, IconButton, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext, useState } from "react";
import { ColorModeContext } from "@/context/color-mode.context";
import { useNavigate } from "react-router-dom";

// ICONS
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import { useDispatch } from "react-redux";
import { setAuthData } from "@/redux/reducers/auth.reducer";

const SIDEBAR_ITEMS = [
    { id: 'sid-1', label: 'Inicio', path: '/', icon: <HomeTwoToneIcon /> },
    { id: 'sid-2', label: 'Productos', path: '/products', icon: <ShoppingCartTwoToneIcon /> },
    { id: 'sid-3', label: 'Clientes', path: '/clients', icon: <PersonOutlineTwoToneIcon /> },
    { id: 'sid-4', label: 'Facturación', path: '/billing', icon: <PaidTwoToneIcon /> },
];

interface IScaffoldProps {
    children: JSX.Element | JSX.Element[];
}

const Scaffold = ({ children }: IScaffoldProps) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleSidebarItemClick = (index: number, path: string) => {
        setSelectedIndex(index);
        navigate(path);
    }

    const handleLogout = () => {
        dispatch(setAuthData({ email: '', accessToken: '' }));
        navigate("/login");
    }

    return (
        <Box>
            { /** SIDE MENU **/}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '280px',
                    height: '100vh',
                    borderRight: 1,
                    borderColor: 'divider'
                }}>

                { /** SIDEBAR HEADER **/}
                <Container sx={{ height: '80px' }}>

                </Container>

                <Container sx={{ marginTop: '1rem' }}>
                    {
                        SIDEBAR_ITEMS.map((el, idx) => {
                            return (
                                <Box
                                    key={el.id}
                                    onClick={() => handleSidebarItemClick(idx, el.path)}
                                    sx={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        color: idx == selectedIndex ? 'rgb(24, 119, 242)' : 'rgb(99, 115, 129)',
                                        backgroundColor: idx == selectedIndex ? 'rgba(24, 119, 242, 0.16)' : 'inherit'
                                    }}>
                                    {el.icon}
                                    <Typography variant="body1" sx={{ ml: '15px' }}>
                                        {el.label}
                                    </Typography>
                                </Box>
                            );
                        })
                    }
                </Container>

            </Box>

            <Box sx={{ marginLeft: '280px' }}>

                { /** APP BAR **/}
                <Box
                    sx={{
                        position: 'fixed',
                        zIndex: '1000',
                        height: '80px',
                        width: 'calc(100vw - 280px)',
                        borderBottom: 1,
                        borderColor: 'divider',
                        backgroundColor: "background.default"
                    }}>

                    <Container
                        sx={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center'
                        }}>

                        <Box sx={{ display: 'flex' }}>
                            <IconButton sx={{ ml: 1, mr: 2 }} onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                            <Button onClick={handleLogout} sx={{ height: '50%' }} variant="contained">{t('logout')}</Button>
                        </Box>
                    </Container>

                </Box>


                { /** BODY **/}
                <Box sx={{ paddingTop: '80px' }}>
                    {children}
                </Box>

            </Box>
        </Box>
    );
}

export default Scaffold;