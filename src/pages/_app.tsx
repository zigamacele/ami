import { client } from '@/lib/graphql/client';
import { store } from '@/lib/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as ProviderRedux } from 'react-redux';
import { Provider as ProviderURQL } from 'urql';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderRedux store={store}>
      <ProviderURQL value={client}>
        <Component {...pageProps} />
      </ProviderURQL>
    </ProviderRedux>
  );
}
