import React, { useRef, useState } from 'react'
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from 'react-router-dom';


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
`

const Register = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef()
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const [register, { loading, data, error }] = useMutation(REGISTER);

  const handleRegister = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userName = usernameRef.current.value;

    if (!email) {
      alert("please enter email")
      emailRef.current.focus();
      return;
    }

    if (!password) {
      alert("Please enter password")
      passwordRef.current.focus();
      return;
    }

    if (!userName) {
      alert("Please enter password")
      userName.current.focus();
      return;
    }


    try {
      const response = await register({
        variables: { userName, email, password },
      })

      console.log(response);
      

      setUser(response?.data?.register?.user)
      navigate('/feed')
      console.log("Signup Successful!", response.data);

    } catch (error) {
      console.error("Error during registration:", error.message);
    }

  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5"
      style={{
        backgroundImage: 'url("https://cdn.dribbble.com/users/1556898/screenshots/4390765/media/bd2606e02021ec45f6577959e13bb01c.gif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <form onSubmit={handleRegister} className="flex flex-col w-full max-w-sm border border-gray-300 rounded-2xl gap-6 p-6 shadow-lg bg-white">
        <h1 className="text-5xl p-4 text-center">𝒮𝓉𝒶𝓎𝐼𝓉</h1>
        <input
          className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-green-200"
          ref={usernameRef}
          type="text"
          placeholder="Username"
        />
        <input
          className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-green-200"
          ref={emailRef}
          type="email"
          placeholder="Email"
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
            Welcome, {user?.userName}! happy to use StayIt.
          </p>
        )}
      </form>
      <div className="border-1 w-[380px] flex items-center justify-center border-gray-300 shadow-lg rounded-xl bg-white">
        <p className="p-4">Have a account in StayIt? <Link className="text-blue-400" to={'/'}>Sign In</Link> </p>
      </div>
    </div>
  )
}

export default Register