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
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const user = useSelector((state) => state.user); 
  const [login, { loading, error, data }] = useMutation(LOGIN);

  const handleButtonClick = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      alert("Please enter the email!");
      emailRef.current.focus();
      return;
    }

    if (!password) {
      alert("Please enter password")
      passwordRef.current.focus();
      return;
    }

    try {
      const response = await login({
        variables: { email, password },
      });

      const token= response?.data?.login?.token
      const userData=response?.data?.login?.user
     
      sessionStorage.setItem("token", token);
      
      if (token && userData) {
        dispatch(addUser(userData)); // Save user in Redux
        navigate('/feed'); // Navigate to feed after successful login
      } else {
        alert("Invalid login, please try again.");
      }

    } catch (err) {
      console.error("Error during login:", err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5"
      style={{
           backgroundImage: 'url("https://cdn.dribbble.com/users/1556898/screenshots/4390765/media/bd2606e02021ec45f6577959e13bb01c.gif")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}
    >
      <form onSubmit={handleButtonClick} className="flex flex-col w-full max-w-sm border border-gray-300 rounded-2xl gap-6 p-6 shadow-lg bg-white">
        <h1 className="text-5xl p-4 text-center">𝒮𝓉𝒶𝓎𝐼𝓉</h1>
        <input
          className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-green-200"
          ref={emailRef}
          type="email"
          placeholder="Email or Username"
        />
        <input
          className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-green-200"
          ref={passwordRef}
          type="password"
          placeholder="Password"
        />
        <button disabled={loading} className="bg-red-400 text-white py-2 rounded-md hover:bg-red-400 disabled:bg-gray-400 cursor-pointer">
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        {data && (
          <p style={{ color: "green" }}>
            Welcome, {user.userName}! You are logged in.
          </p>
        )}
      </form>
      <div className="border-1 w-[380px] flex items-center justify-center border-gray-300 shadow-lg rounded-xl bg-white">
        <p className="p-4">New to StayIt? <Link className="text-blue-400" to={'/register'}>Create account</Link> </p>
      </div>
    </div>
  );
};

export default Login;
