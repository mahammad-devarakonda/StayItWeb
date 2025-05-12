import React, { useRef, useState, useEffect, useMemo } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Code } from "lucide-react";
import useAuth from "../Hooks/useAuth";
import getRandomImage from "../Utills/getRandomImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const authData = useAuth()
  const bgImage = useMemo(() => getRandomImage(), []);


  useEffect(() => {
    if (authData?.error) {
      console.error("Me query failed:", authData.error);
    }
    if (authData?.data?.Me) {
      navigate('/feed');
    }
  }, [authData])


  const handleButtonClick = async (e) => {
    e.preventDefault();
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (!email) {
      toast.error("Please enter the email!");
      emailRef?.current.focus();
      return;
    }

    if (!password) {
      toast.error("Please enter the password!");
      passwordRef?.current.focus();
      return;
    }

    try {
      const response = await login({
        variables: { email, password },
      });

      if (response?.data?.login?.message) {
        navigate('/2factorAuth', { state: { email } });
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch(err) {
      const errorMessage = err?.message || err?.graphQLErrors?.[0]?.message || "An unknown error occurred";
      toast.error(errorMessage); 
    }
  };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 md:p-8 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <form className="flex flex-col gap-5 sm:gap-7 border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-lg transition-all duration-300">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text flex items-center gap-2 justify-center">
            Bondly
          </h1>

          <input
            className="border border-gray-600 rounded-lg p-3 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
            ref={emailRef}
            type="email"
            placeholder="Email or Username"
            aria-label="Email or Username"
          />

          <div className="relative w-full">
            <input
              className="w-full border border-gray-600 rounded-lg p-3 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
              ref={passwordRef}
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors duration-200 cursor-pointer"
            >
              {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </span>
          </div>

          <button
            disabled={loading}
            onClick={handleButtonClick}
            className="bg-gradient-to-r from-red-500 to-pink-500 w-full text-white py-3 rounded-lg text-lg font-semibold hover:from-red-600 hover:to-pink-600 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-md flex items-center justify-center border border-gray-300 shadow-lg rounded-xl bg-white mt-4 p-4">
        <p className="text-sm sm:text-base">
          New to Bondly?{" "}
          <Link className="text-blue-400" to={"/register"}>
            Create account
          </Link>
        </p>
      </div>

      <div className="fixed top-4 right-4 z-20">
        <Link
          to="/developer"
          className="flex flex-col items-center text-gray-900"
        >
          <Code size={22} />
          <span className="text-[10px]">About Developer</span>
        </Link>
      </div>
      <ToastContainer />
    </div>

  );
};

export default Login;
