import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ColorModeContext } from "./context/color-mode.context";
import Loading from "./components/loading/loading.component";
import AuthGuard from "./utilities/auth-guard";
import { ROUTES } from "./routes/routes";

// PUBLIC
const LoginPage = lazy(() => import('./pages/login/login.page'));
const SignUpPage = lazy(() => import('./pages/signup/signup.page'));
const ProductBillPage = lazy(() => import('./pages/product-bill/product-bill.page'));

// PRIVATE 
const ProductPage = lazy(() => import('./pages/product/product.page'));
const ClientsPage = lazy(() => import('./pages/clients/clients.page'));
const BillingPage = lazy(() => import('./pages/billing/billing.page'));
const EditProductPage = lazy(() => import('./pages/product/edit-product.page'));
const AddTelegramPage = lazy(() => import('./pages/telegram/telegram.page'));

function App() {

  const [mode, setMode] = useState<ColorModeType>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      setColorMode: (newMode: ColorModeType) => {
        setMode(newMode);
      }
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: 'Poppins',
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loading />}>
          <Routes>

            <Route path={ROUTES.public.login} element={<LoginPage />} />
            <Route path={ROUTES.public.signup} element={<SignUpPage />} />
            <Route path={`${ROUTES.public.productBill}/:productId`} element={<ProductBillPage />}/>

            <Route element={<AuthGuard />}>
              <Route path={ROUTES.private.home} element={<h1>home</h1>} />
              <Route path={ROUTES.private.products}>
                <Route path="" element={<ProductPage />} />
                <Route path="edit/:id" element={<EditProductPage />} />
              </Route>
              <Route path={ROUTES.private.clients} element={<ClientsPage />} />
              <Route path={ROUTES.private.billing} element={<BillingPage />} />

              <Route path={ROUTES.private.addTelegram} element={<AddTelegramPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider >
    </ColorModeContext.Provider>

  )
}

export default App
