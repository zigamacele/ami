import { getCookie } from 'cookies-next';
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql';

export const client = createClient({
  url: 'https://graphql.anilist.co',
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = getCookie('access_token');
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});
