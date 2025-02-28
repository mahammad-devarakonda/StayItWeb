import React, { useRef } from 'react'
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../Redux/userSlice";

const REGISTER = gql`
  mutation REGISTER($email:String!,$password:String!,$userName:String!){
    register(email: $email, password: $password , userName: $userName){
      token
      user {
        id
        userName
        email
      }
    }
  }
`;

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const navigate = useNavigate();
  const [register, { loading, data, error }] = useMutation(REGISTER);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleRegister = async (e) => {
    e.preventDefault();

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    const userName = usernameRef?.current?.value;

    if (!email) {
      alert("Please enter an email");
      emailRef?.current.focus();
      return;
    }

    if (!password) {
      alert("Please enter a password");
      passwordRef?.current.focus();
      return;
    }

    if (!userName) {
      alert("Please enter a username");
      usernameRef?.current.focus();
      return;
    }

    try {
      const response = await register({
        variables: { userName, email, password },
      });

      const token = response?.data?.register?.token;
      const userData = response?.data?.register?.user;

      sessionStorage.setItem("token", token);

      if (token && userData) {
        dispatch(addUser(userData)); // Save user in Redux
        navigate('/feed'); // Navigate to feed after successful registration
      } else {
        alert("Please try again.");
      }

    } catch (error) {
      console.error("Error during registration:", error?.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-3 sm:p-6 md:p-8"
      style={{
        backgroundImage: 'url("https://cdn.dribbble.com/users/1556898/screenshots/4390765/media/bd2606e02021ec45f6577959e13bb01c.gif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-sm sm:max-w-md md:max-w-mg">
        <form
          onSubmit={handleRegister}
          className="flex flex-col border border-gray-300 rounded-2xl gap-4 sm:gap-6 p-6 sm:p-8 shadow-lg bg-white"
        >
          <h1 className="text-xl sm:text-2xl font-medium font-serif text-left tracking-widest">
            StayIt
          </h1>
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-200"
            ref={usernameRef}
            type="text"
            placeholder="Username"
          />
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-200"
            ref={emailRef}
            type="email"
            placeholder="Email"
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
            {loading ? "Registering..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">Error: {error?.message}</p>}
          {data && (
            <p className="text-green-500 text-sm text-center">
              Welcome, {user?.userName}! Happy to use StayIt.
            </p>
          )}
        </form>
      </div>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-md flex items-center justify-center border border-gray-300 shadow-lg rounded-xl bg-white mt-4 p-4">
        <p className="text-sm sm:text-base">
          Have an account in StayIt? <Link className="text-blue-400" to={'/'}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
