import React from "react";
import ProfilePic from "../assets/Frame 1116607307.svg";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center gap-[113px]">
      <div className="flex text-center leading-12">
        <p className="font-poppins font-medium text-[2.25rem] text-[#1C1B1F]">
          Welcome to
          <br />
          <span className="font-poppins font-black text-[2.875rem] text-[#6358DC]">
            Unstop
          </span>
        </p>
      </div>
      <div className="w-[267px] h-[311px] p-5 gap-5 shadow-lg rounded-2xl border border-[#E2E2E2] flex flex-col items-center">
        <img src={ProfilePic} alt="" className="w-[120px]" />
        <div className="space-y-3 text-center ">
          <h2 className="text-[#6358DC] font-poppins font-bold text-[16px] leading-[19.36px]">
            Michael Dam
          </h2>
          <div className="space-y-2">
            <h3 className="text-[#383838] font-poppins font-medium text-[12px] leading-[14.52px]">
              example@gmail.com
            </h3>
            <p className="text-[#383838] font-poppins font-medium text-[12px] leading-[14.52px]">
              Female
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-[137px] h-12 flex items-center justify-center mb-4 gap-5 bg-[#6358DC] py-5 text-white font-poppins font-medium rounded-2xl"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default MainPage;
