import { Route, Routes } from "react-router-dom"
import Scaffold from "./components/scaffold/scaffold.component"
import { Suspense, lazy, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ColorModeContext } from "./context/color-mode.context";
import Loading from "./components/loading/loading.component";

const ProductPage = lazy(() => import('./pages/product/product.page'));
const ClientsPage = lazy(() => import('./pages/clients/clients.page'));
const BillingPage = lazy(() => import('./pages/billing/billing.page'));
const EditProductPage = lazy(() => import('./pages/product/edit-product.page'));

function App() {

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
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
          <Route element={<Scaffold />}>
            <Route path="/" element={<h1>home</h1>} />
            <Route path="/products">
              <Route path="" element={<ProductPage />} />
              <Route path="edit/:id" element={<EditProductPage />} />
            </Route>
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/billing" element={<BillingPage />} />
          </Route>
        </Routes>
        </Suspense>
      </ThemeProvider >
    </ColorModeContext.Provider>

  )
}

export default App
