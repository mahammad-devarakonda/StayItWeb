import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from './Redux/Store';
import router from './Utills/Route';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useSelector } from 'react-redux';


const Layout = () => {
  const { token } = useSelector((state) => state.auth);
  const httpLink = createUploadLink({
    uri: window.location.hostname === "localhost"
      ? "http://localhost:3001/graphql"
      : "/api/graphql"
  });
  

  const authLink = setContext((_, { headers }) => {
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
  });

  return (
    <ApolloProvider client={client}>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default Layout;
