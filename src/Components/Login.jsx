import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from "../Redux/userSlice";

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        userName
        email
      }
    }
  }
`;

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [login, { loading, error, data }] = useMutation(LOGIN);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      alert("Please enter the email!");
      emailRef.current.focus();
      return;
    }

    if (!password) {
      alert("Please enter password");
      passwordRef.current.focus();
      return;
    }

    try {
      const response = await login({
        variables: { email, password },
      });

      const token = response?.data?.login?.token;
      const userData = response?.data?.login?.user;

      sessionStorage.setItem("token", token);

      if (token && userData) {
        dispatch(addUser(userData));
        navigate('/feed');
      } else {
        alert("Invalid login, please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 md:p-8"
      style={{
        backgroundImage: 'url("https://cdn.dribbble.com/users/1556898/screenshots/4390765/media/bd2606e02021ec45f6577959e13bb01c.gif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-sm sm:max-w-md md:max-w-md">
        <form
          onSubmit={handleButtonClick}
          className="flex flex-col border border-gray-300 rounded-2xl gap-4 sm:gap-6 p-6 sm:p-8 shadow-lg bg-white"
        >
          <h1 className="text-xl sm:text-2xl font-medium font-serif text-left tracking-widest">
            StayIt
          </h1>
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-200"
            ref={emailRef}
            type="email"
            placeholder="Email or Username"
          />
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-200"
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
          <button
            disabled={loading}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 cursor-pointer text-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">Error: {error.message}</p>}
          {data && (
            <p className="text-green-500 text-sm text-center">
              Welcome, {user.userName}! You are logged in.
            </p>
          )}
        </form>
      </div>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-md flex items-center justify-center border border-gray-300 shadow-lg rounded-xl bg-white mt-4 p-4">
        <p className="text-sm sm:text-base">New to StayIt? <Link className="text-blue-400" to={'/register'}>Create account</Link></p>
      </div>
    </div>
  );
};

export default Login;
