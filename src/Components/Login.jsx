import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        userName
        email
      }
    }
  }
`;

const Login = () => {
  const [user,setUser]=useState()
  const emailRef = useRef();
  const passwordRef = useRef();
  const [login, { loading, error ,data }] = useMutation(LOGIN);

  const handleButtonClick = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      console.log("Please enter the email!");
      emailRef.current.focus();
      return;
    }

    if (!password) {
      console.log("Please enter the password!");
      passwordRef.current.focus();
      return;
    }

    try {
      const response = await login({
        variables: { email, password },
      });

      setUser(response.data.login.user)

      console.log("Login Successful!", response.data);
      console.log("User:", response.data.login.user);

      // Optionally, you can redirect the user to a protected route after login
      // window.location.href = "/dashboard"; // Example: Redirect to a dashboard after login

    } catch (err) {
      console.error("Error during login:", err.message);
    }
  };

  return (
    <div>
      <input
        ref={emailRef}
        type="email"
        placeholder="Please enter your email!"
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Please enter your password"
      />
      <button onClick={handleButtonClick} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {data && (
        <p style={{ color: "green" }}>
          Welcome, {user.userName}! You are logged in.
        </p>
      )}
    </div>
  );
};

export default Login;
