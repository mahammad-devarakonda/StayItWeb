import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Eye, EyeOff, Code } from "lucide-react";


const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
     message
    }
  }
`;

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [login, { loading, error, data }] = useMutation(LOGIN);
  const [showPassword, setShowPassword] = useState(false)

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (!email) {
      alert("Please enter the email!");
      emailRef?.current.focus();
      return;
    }

    if (!password) {
      alert("Please enter password");
      passwordRef?.current.focus();
      return;
    }

    try {
      const response = await login({
        variables: { email, password },
      });

      if (response?.data?.login?.message) {
        alert(response?.data?.login?.message);
        navigate('/2factorAuth', { state: { email } });
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err?.message);
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
          className="flex flex-col border border-gray-300 rounded-2xl gap-4 sm:gap-6 p-6 sm:p-8 shadow-lg bg-white"
        >
          <h1 className="text-xl sm:text-2xl font-medium font-serif text-left tracking-widest">
            Bondly
          </h1>
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-200"
            ref={emailRef}
            type="email"
            placeholder="Email or Username"
            aria-label="Email or Username"
          />

          <div className="w-full relative">
            <input
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-200"
              ref={passwordRef}
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" /> : <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />}</button>
          </div>

          <button
            disabled={loading}
            onClick={handleButtonClick}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 cursor-pointer text-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">Error: {error?.message}</p>}
          {data && (
            <p className="text-green-500 text-sm text-center">
              Welcome,! You are logged in.
            </p>
          )}
        </form>
      </div>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-md flex items-center justify-center border border-gray-300 shadow-lg rounded-xl bg-white mt-4 p-4">
        <p className="text-sm sm:text-base">New to Bondly? <Link className="text-blue-400" to={'/register'}>Create account</Link></p>
      </div>
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/developer"
          className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition"
        >
          <Code size={22} />
          <span className="text-[10px]">About Developer</span>
        </Link>
      </div>

    </div>
  );
};

export default Login;
