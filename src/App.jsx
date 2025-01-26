import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Feed from './Components/Feed';
import appStore from './Redux/Store';
import { Provider } from "react-redux";
import ProtectedRoute from './Components/ProtectedRoute';


const client = new ApolloClient({
  uri: "http://localhost:3000/graphql", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    element: <ProtectedRoute />, // ProtectedRoute wrapper
    children: [
      {
        path: '/feed',
        element: <Feed />
      },
    ],
  }
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
        <div>
          <Layout />
        </div>
      </Provider>
    </ApolloProvider>
  )
}

export default App