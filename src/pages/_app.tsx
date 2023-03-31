import { client } from '@/lib/graphql/client';
import { store } from '@/lib/store';
import '@/styles/globals.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import type { AppProps } from 'next/app';
import { Provider as ProviderRedux } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as ProviderURQL } from 'urql';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ProviderRedux store={store}>
        <ProviderURQL value={client}>
          <Component {...pageProps} />
          <ToastContainer
            style={{ width: 'max-content' }}
            closeButton={false}
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick={true}
            draggable
            pauseOnHover
            theme="dark"
          />
        </ProviderURQL>
      </ProviderRedux>
    </LocalizationProvider>
  );
}
