import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/Illustration.svg";
import GoogleIcon from "../assets/Frame 1116607310.svg";
import FacebookIcon from "../assets/Vector.svg";
import KeyIcon from "../assets/key.svg";
import MailIcon from "../assets/mail.svg";
import UserIcon from "../assets/account_circle.svg";
import VisibilityIcon from "../assets/visibility.svg";
import axios from "axios";

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    expiresInMins: 30,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@.$!%*?&]{8,}$/;

    if (formData.username !== "emilys") {
      newErrors.username = "Username must be 'emilys'";
    }
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, including uppercase, lowercase, and a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    console.log("Form data being sent:", {
      username: formData.username,
      password: formData.password,
      email: formData.email || undefined,
      expiresInMins: formData.expiresInMins || 30,
    });

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: formData.username,
          password: formData.password,
          email: formData.email || undefined,
          expiresInMins: formData.expiresInMins || 30,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = JSON.stringify(response.data);
      localStorage.setItem("token", token);

      navigate("/mainpage");
    } catch (error) {
      setErrors({ form: "Login failed. Please check your credentials." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:w-full md:h-screen flex justify-between items-center p-6 bg-gray-100 sm:p-10 md:p-[75px]">
      <div className="w-full flex flex-col md:flex-row justify-around items-center">
        <div className=" mb-6 md:mb-0">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="w-[100%] md:w-[541px] h-auto object-contain"
          />
        </div>

        <div className="w-full md:w-[761px] p-6 md:p-10 gap-2.5 border border-gray-200 rounded-2xl flex flex-col justify-center shadow-lg bg-white">
          <div className="flex flex-col text-start leading-12">
            <p className="font-poppins font-medium text-[1.75rem] sm:text-[2.25rem] text-[#1C1B1F]">
              Welcome to
              <br />
              <span className="font-poppins font-black text-[#6358DC]">
                Unstop
              </span>
            </p>
          </div>

          <div>
            <button className="w-full shadow-md flex items-center justify-center mb-4 space-x-3 border border-[#E2E2E2] bg-[#FFFFFF] py-6 rounded-lg">
              <img
                src={GoogleIcon}
                alt="Login with Google"
                className="w-8 h-8"
              />
              <p className="text-gray-700 font-poppins font-medium">
                Login with Google
              </p>
            </button>
            <button className="w-full shadow-md flex items-center justify-center mb-4 space-x-3 border border-[#E2E2E2] bg-[#FFFFFF] py-6 rounded-lg">
              <img
                src={FacebookIcon}
                alt="Login with Facebook"
                className="w-8 h-8"
              />
              <p className="text-gray-700 font-poppins font-medium">
                Login with Facebook
              </p>
            </button>
          </div>

          <div className="flex justify-between items-center gap-8">
            <div className="w-1/2 text-[#BFBFBF] hidden sm:block">
              <hr />
            </div>
            <p className="font-poppins font-regular">OR</p>
            <div className="w-1/2 text-[#BFBFBF] hidden sm:block">
              <hr />
            </div>
          </div>

          <div>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <div className="p-4 gap-2.5 mb-4 space-x-2 flex items-center rounded-xl bg-[#F4F4F4]">
                  <img src={UserIcon} alt="" className="w-6" />
                  <div className="gap-1 w-full">
                    <span className="font-poppins font-regular text-[12px] text-[#1C1B1F]">
                      User Name
                    </span>
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      name="username"
                      onChange={inputHandler}
                      placeholder="Enter User Name"
                      className="block w-full focus:outline-none bg-transparent font-poppins font-bold"
                      required
                    />
                    {errors.username && (
                      <p className="text-red-500">{errors.username}</p>
                    )}
                  </div>
                </div>

                <div className="p-4 gap-2.5 mb-4 space-x-2 flex items-center rounded-xl bg-[#F4F4F4]">
                  <img src={MailIcon} alt="" className="w-6" />
                  <div className="gap-1 w-full">
                    <span className="font-poppins font-regular text-[12px] text-[#1C1B1F]">
                      Email
                    </span>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      name="email"
                      onChange={inputHandler}
                      placeholder="abc@email.com"
                      className="block w-full focus:outline-none bg-transparent font-poppins font-bold"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="p-4 gap-2.5 mb-4 space-x-2 flex items-center rounded-xl bg-[#F4F4F4]">
                  <img src={KeyIcon} alt="" className="w-6" />
                  <div className="gap-1 w-full flex flex-col">
                    <span className="font-poppins font-regular ml-1 text-[12px] text-[#1C1B1F]">
                      Password
                    </span>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      name="password"
                      onChange={inputHandler}
                      placeholder="*********"
                      className="block w-full focus:outline-none bg-transparent font-poppins font-bold"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  <img
                    src={VisibilityIcon}
                    alt="Toggle Password Visibility"
                    className="w-6 cursor-pointer"
                    onClick={() => setPasswordVisible((prev) => !prev)}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center my-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="w-[18px] h-[18px] border border-[#D9D9D9] bg-[#E2E2E2] rounded-[4px] mr-2 checked:bg-[#6358DC] focus:ring-0"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-[#1C1B1F] font-poppins font-regular text-[16px]"
                  >
                    Remember Me
                  </label>
                </div>
                <p className="text-[#6358DC] font-poppins font-regular text-[16px]">
                  Forgot Password?
                </p>
              </div>

              <button className="w-full flex items-center justify-center mb-4 space-x-3 bg-[#6358DC] py-6 rounded-lg">
                <p className="text-white font-poppins font-medium">Login</p>
              </button>
            </form>

            <p className="text-black font-poppins text-center font-regular text-[16px]">
              Don't have an account?
              <span className="text-[#6358DC] ml-0.5"> Register</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
