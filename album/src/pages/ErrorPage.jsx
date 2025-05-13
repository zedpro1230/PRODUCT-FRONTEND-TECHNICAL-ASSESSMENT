import React from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import ErrorImg from "../assets/images/404.svg";
import SideBarResponsive from "../components/SideBarResponsive";
function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className=" relative flex flex-row">
      <SideBarResponsive />
      <SideBar />
      <div className="w-full h-screen flex justify-center items-center flex-col gap-3">
        <img src={ErrorImg} alt="Error" className="w-[500px] h-[600px] mt-4" />
        <h1 className="text-3xl font-bold text-[#EEEEEE]">
          404 - Page Not Found
        </h1>
        <button
          className="mt-2 px-1 py-4 text-[18px] bg-blue-500 w-[200px] text-white rounded-[10px] cursor-pointer hover:bg-blue-700"
          onClick={() => navigate("/albums")}
        >
          Back Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
