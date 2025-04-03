import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import appStore, { persistor } from './Redux/Store';
import { Provider } from "react-redux";
import { setContext } from "@apollo/client/link/context"
import { PersistGate } from "redux-persist/integration/react";
import router from './Utills/Route';

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql"
})

const authLink = setContext((_, { headers }) => {

  const token = sessionStorage.getItem("token");
  const authorization = token ? `Bearer ${token}` : '';

  return {
    headers: {
      ...headers,
      Authorization: authorization,
      'custom-header': 'custom-value',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const Layout = () => {
  return (
    <RouterProvider router={router} />
  )
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <div>
            <Layout />
          </div>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}

export default App
