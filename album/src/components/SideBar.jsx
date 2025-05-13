import React from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
import { useState, useEffect, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../context/DataContext";
function SideBar() {
  // State to manage the active item in the sidebar
  const [activeItem, setActiveItem] = useState("Album");
  // Context to manage the sidebar state
  const [sideBar, setSideBar, , , ,] = useContext(DataContext);
  //navigate and location hooks
  const navigate = useNavigate();
  const location = useLocation();
  // Update the active item based on the current URL path
  useEffect(() => {
    if (location.pathname.startsWith("/users")) {
      setActiveItem("User");
    } else if (location.pathname.startsWith("/albums")) {
      setActiveItem("Album");
    }
  }, [location.pathname]);
  // Function to handle navigation and set the active item
  const handleNavigation = (item) => {
    setActiveItem(item);
    if (item === "User") {
      navigate("/users");
    } else if (item === "Album") {
      navigate("/albums?pageSize=20&current=1");
    }
  };
  return (
    <div
      className={` h-screen z-10  ${
        sideBar ? "w-[100px]" : "w-[256px]"
      } max-desktop:hidden`}
    >
      <div
        className={`  fixed left-0 top-0 h-screen bg-white flex flex-col justify-between items-center p-3 gap-3 transition-all duration-100 ${
          sideBar ? "w-[100px]" : "w-[256px]"
        }`}
      >
        <div
          className={`w-full flex flex-col justify-start items-start gap-3 `}
        >
          <div
            className={`overflow-visible ${
              sideBar ? "w-[150px] ml-[20px]" : "w-ful"
            }`}
          >
            <img
              className={`h-[60px] w-[150px] cursor-pointer`}
              onClick={() => {
                navigate("/albums/?pageSize=20&current=1");
              }}
              src="https://geekup.vn/Icons/geekup-logo-general.svg"
              alt="Logo"
            />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-3 ">
            <div
              className={`w-full h-[60px] flex items-center cursor-pointer py-[5px] rounded-[8px] ${
                sideBar
                  ? "justify-center px-[20px] gap-0"
                  : "justify-start px-[20px] gap-3"
              } 
              ${
                activeItem === "Album"
                  ? "bg-[#AFDDFF] rounded-[8px] hover:bg-none"
                  : "hover:bg-[#E5E1DA]"
              }`}
              onClick={() => handleNavigation("Album")}
            >
              <IconContext.Provider
                value={{
                  size: "25px",
                  className: `${
                    activeItem === "Album" ? "fill-[#60B5FF]" : "black"
                  }`,
                }}
              >
                <BiPhotoAlbum />
              </IconContext.Provider>
              <p
                className={`text-[20px]  ${
                  activeItem === "Album" ? "text-[#60B5FF]" : ""
                } ${sideBar ? "hidden" : "block"}`}
              >
                Album
              </p>
            </div>
            <div
              className={`w-full h-[60px] flex items-center cursor-pointer py-[5px] rounded-[8px] ${
                sideBar
                  ? " justify-center px-[20px] gap-0"
                  : "justify-start px-[20px] gap-3"
              } 
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
                  size: "25px",
                  className: `${
                    activeItem === "User" ? "fill-[#60B5FF]" : "black"
                  } `,
                }}
              >
                <FaRegCircleUser />
              </IconContext.Provider>
              <p
                className={`text-[20px]  ${
                  activeItem === "User" ? "text-[#60B5FF]" : ""
                } ${sideBar ? "hidden" : "block"}`}
              >
                User
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full flex justify-center items-center  p-2 cursor-pointer ${
            sideBar ? "rotate-180" : "rotate-0"
          } transition-all duration-300 ease-in-out`}
          onClick={() => setSideBar(!sideBar)}
        >
          <IconContext.Provider
            value={{
              className: "text-black",
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
