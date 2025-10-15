import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme/theme';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
  );
}


// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
//
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
