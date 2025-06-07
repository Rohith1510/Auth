import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import.meta.env.VITE_GRAPHQL_URL
const httpLink = createHttpLink({
  uri: 'https://api-qa.seamasterai.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  // console.log("token@@@",token);
  // console.log('Operation:', operation.operationName);
  console.log('Token exists:', !!token);
  console.log('Current headers:', headers);
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      // ...(token && { authorization: `Bearer ${token}` }),
      'Content-Type': 'application/json',
    }
  };
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});