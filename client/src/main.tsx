import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.ts';
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    mode: "light", // or "dark"
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <Toaster position='top-right' />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
