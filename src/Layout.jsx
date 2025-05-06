import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from './Redux/Store';
import router from './Utills/Route';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const Layout = () => {
  const httpLink = createUploadLink({
    uri: window.location.hostname === "localhost"
      ? "http://localhost:3001/graphql"
      : "/api/graphql"
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    fetchOptions: {
      credentials: 'include',  // 🔥 super important for cookies
    },
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
