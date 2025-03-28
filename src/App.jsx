import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Feed from './Components/Feed';
import UserProfile from './Components/UserProfile';
import appStore, { persistor } from './Redux/Store';
import { Provider } from "react-redux";
import ProtectedRoute from './Components/ProtectedRoute';
import { setContext } from "@apollo/client/link/context"
import MyRequestList from './Components/MyRequestList';
import ErrorPage from './Components/Error';
import Inbox from './Components/Inbox';
import { PersistGate } from "redux-persist/integration/react";

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/feed',
        element: <Feed />
      },
      {
        path: '/userprofile/:id',
        element: <UserProfile />
      },
      {
        path: '/inbox',
        element: <Inbox />
      },
      {
        path: '/inbox/:chatId',
        element: <Inbox />,
      },
      {
        path: 'requests',
        element: <MyRequestList />
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

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
