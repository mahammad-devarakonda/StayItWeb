import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from './Redux/Store';
import router from './Utills/Route';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const Layout = () => {
  const httpLink = createUploadLink({
    uri: window.location.hostname === "localhost"
      ? "http://localhost:3001/graphql"
      : "/api/graphql",
      credentials:'include'
  });



  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: 'include',
  });

  return (
    <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
    </ApolloProvider>
  );
};

export default Layout;
