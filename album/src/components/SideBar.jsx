import React from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
import { useState, useEffect, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { ActiveItemSideBar } from "../hooks/ActiveItemSideBar";
function SideBar() {
  const [activeItem, setActiveItem] = useState("Album");
  const [sideBar, setSideBar] = useContext(ActiveItemSideBar);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/users")) {
      setActiveItem("User");
    } else if (location.pathname.startsWith("/albums")) {
      setActiveItem("Album");
    }
  }, [location.pathname]);

  const handleNavigation = (item) => {
    setActiveItem(item);
    if (item === "User") {
      navigate("/users");
    } else if (item === "Album") {
      navigate("/albums/?pageSize=20&current=1");
    }
  };
  return (
    <div
      className={` h-screen   z-10 ${!sideBar ? "w-[256px]" : "w-[100px]"}  `}
    >
      <div
        className={`  fixed left-0 top-0 h-screen bg-white flex flex-col justify-between items-center p-3 gap-3 transition-all duration-100
    ${!sideBar ? "w-[256px]" : "w-[100px]"}  `}
      >
        <div
          className={`w-full flex flex-col justify-start items-start gap-3 
        
     `}
        >
          <div
            className={` flex justify-start items-center overflow-visible ${
              !sideBar ? "w-full" : "w-[150px]"
            }`}
          >
            <img
              className={`
         h-[60px] w-[150px] `}
              onClick={() => {
                navigate("/albums/?pageSize=20&current=1");
              }}
              src="https://geekup.vn/Icons/geekup-logo-general.svg"
              alt="Logo"
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-3 ">
            <div
              className={`w-full h-[60px] flex items-center ${
                !sideBar
                  ? "justify-start px-[20px] gap-1"
                  : "justify-center px-[20px] gap-0"
              } py-[5px] rounded-[8px]
${
  activeItem === "Album"
    ? "bg-[#AFDDFF] rounded-[8px] hover:bg-none"
    : "hover:bg-[#E5E1DA]"
}`}
              onClick={() => handleNavigation("Album")}
            >
              <IconContext.Provider
                value={{
                  color: activeItem === "Album" ? "#60B5FF" : "black",
                  size: "25px",
                }}
              >
                <BiPhotoAlbum />
              </IconContext.Provider>
              <p
                className={`text-[20px] font-bold ${
                  activeItem === "Album" ? "text-[#60B5FF]" : ""
                }
            ${sideBar ? "hidden" : "block"}`}
              >
                Album
              </p>
            </div>
            <div
              className={`w-full h-[60px] flex items-center ${
                !sideBar
                  ? "justify-start px-[20px] gap-1"
                  : "justify-center px-[20px] gap-0"
              } py-[5px] rounded-[8px]
${
  activeItem === "User"
    ? "bg-[#AFDDFF] rounded-[8px] hover:bg-none"
    : "hover:bg-[#E5E1DA]"
}`}
              onClick={() => {
                handleNavigation("User");
              }}
            >
              <IconContext.Provider
                value={{
                  color: activeItem === "User" ? "#60B5FF" : "black",
                  size: "25px",
                }}
              >
                <FaRegCircleUser />
              </IconContext.Provider>
              <p
                className={`text-[20px] font-bold ${
                  activeItem === "User" ? "text-[#60B5FF]" : ""
                }
            ${sideBar ? "hidden" : "block"}
            `}
              >
                User
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full flex justify-center items-center  p-2 cursor-pointer
        ${!sideBar ? "rotate-0" : "rotate-180"}
        transition-all duration-300 ease-in-out
        `}
          onClick={() => setSideBar(!sideBar)}
        >
          <IconContext.Provider
            value={{
              color: "black",
              size: "25px",
            }}
          >
            <FaArrowLeft />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
