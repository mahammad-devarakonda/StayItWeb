import React, { useRef, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from '../Redux/authSlice'

const VERIFY_OTP = gql`
  mutation VERIFYOTP($email: String!, $otp: String!) {
    verifyOTP(email: $email, otp: $otp) {
      message
      token
      user {
        id
        userName
        email
        avatar
      }
    }
  }
`;

const OTPInput = ({ length = 4 }) => {
  const [inputArray, setInputArray] = useState(new Array(length).fill(""));
  const arrayRef = useRef([]);
  const location = useLocation();
  const email = location.state?.email || "";
  const otp = inputArray.join("").trim();
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    arrayRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newArray = [...inputArray];
    newArray[index] = value.slice(-1);
    setInputArray(newArray);

    if (value && index < length - 1) {
      arrayRef.current[index + 1]?.focus();
    }
  };

  const handleBackSpace = (e, index) => {
    if (e.key === "Backspace" && !inputArray[index] && index > 0) {
      arrayRef.current[index - 1]?.focus();
    }

    if (e.key === "Enter") {
      handleSubmitOTP();
    }


  };

  const [verifyOTPMutation, { loading, error }] = useMutation(VERIFY_OTP);

  const handleSubmitOTP = async () => {
    try {
      const response = await verifyOTPMutation({
        variables: { email, otp },
      });

      const userData = response?.data?.verifyOTP?.user
      const token = response?.data?.verifyOTP?.token

      if (token && userData) {
        dispatch(loginSuccess({ user: userData, token }));
        navigate('/feed')
      } else {
        alert("Invalid OTP or something went wrong");
      }

    } catch (err) {
      console.error("OTP Verification Failed:", err);
      alert("OTP Verification Failed. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 md:p-8"
      style={{
        backgroundImage:
          'url("https://cdn.dribbble.com/users/1556898/screenshots/4390765/media/bd2606e02021ec45f6577959e13bb01c.gif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="glass-container flex flex-col items-center p-6 rounded-xl shadow-lg bg-white">
        <h1 className="text-2xl sm:text-3xl font-semibold text-black tracking-wide">
          Enter OTP
        </h1>
        <p className="text-xs text-gray-500">
          OTP sent to registered email. Please enter it below.
        </p>
        <div className="flex gap-2 p-10">
          {inputArray.map((input, index) => (
            <input
              key={index}
              type="text"
              className="w-14 h-14 border border-black rounded-md text-center text-2xl"
              value={input}
              ref={(input) => (arrayRef.current[index] = input)}
              onChange={(e) => handleChange(e.target.value, index)}
              maxLength={1}
              onKeyDown={(e) => handleBackSpace(e, index)}
            />
          ))}
        </div>
        <button
          onClick={handleSubmitOTP}
          className="bg-red-500 w-full text-white py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 cursor-pointer text-center"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Submit"}
        </button>
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    </div>
  );
};

export default OTPInput;