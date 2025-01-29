import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Feed from './Components/Feed';
import appStore from './Redux/Store';
import { Provider } from "react-redux";
import ProtectedRoute from './Components/ProtectedRoute';
import {setContext} from "@apollo/client/link/context"



const httpLink=createHttpLink({
  uri:"http://localhost:3000/graphql"
})


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token"); // Replace with your token logic
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  link:authLink.concat(httpLink),
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