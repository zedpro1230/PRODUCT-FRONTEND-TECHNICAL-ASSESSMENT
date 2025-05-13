import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IconContext } from "react-icons/lib";
import { BiPhotoAlbum } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
function SideBarResponsive() {
  // State to manage the visibility of the sidebar
  const [show, setShow] = useState(false);
  // navigate and location hooks
  const navigate = useNavigate();
  const location = useLocation();
  // State to manage the active item in the sidebar
  const [activeItem, setActiveItem] = useState("Album");
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
      className="fixed top-[80px] left-0 z-10 w-[40px] h-[40px] bg-white hidden justify-end items-center p-3 rounded-r-[8px]
    border-2 border-[#EEEEEE] max-desktop:flex"
      onClick={() => {
        setShow(!show);
      }}
    >
      <IconContext.Provider value={{ color: "black", size: "30px" }}>
        <RxHamburgerMenu />
      </IconContext.Provider>

      <div
        className={`w-screen h-screen fixed top-0 left-0  z-20 flex flex-row transition-all duration-200 ease-in-out ${
          show ? "translate-x-[0%]" : "translate-x-[-100%]"
        }`}
      >
        <div className="flex-3 h-full bg-white">
          <div className={` h-full w-full z-10 `}>
            <div
              className={` bg-white flex flex-col justify-between items-center p-3 gap-3`}
            >
              <div
                className={`w-full flex flex-col justify-start items-start gap-3`}
              >
                <div className={`overflow-visible  w-full`}>
                  <img
                    className={`
                     h-[60px] w-[150px] cursor-pointer max-desktop:h-[50px] max-desktop:w-[120px]`}
                    onClick={() => {
                      navigate("/albums/?pageSize=20&current=1");
                    }}
                    src="https://geekup.vn/Icons/geekup-logo-general.svg"
                    alt="Logo"
                  />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-3 ">
                  <div
                    className={`w-full h-[60px] flex items-center cursor-pointer justify-start px-[20px] gap-3 py-[5px] rounded-[8px]
                            ${
                              activeItem === "Album"
                                ? "bg-[#AFDDFF] rounded-[8px] hover:bg-none"
                                : "hover:bg-[#E5E1DA]"
                            }`}
                    onClick={() => handleNavigation("Album")}
                  >
                    <IconContext.Provider
                      value={{
                        className: `${
                          activeItem === "Album"
                            ? "fill-[#60B5FF]"
                            : "fill-black"
                        } text-[25px] max-desktop:text-[20px]`,
                      }}
                    >
                      <BiPhotoAlbum />
                    </IconContext.Provider>
                    <p
                      className={`text-[18px] max-desktop:text-[16px] ${
                        activeItem === "Album" ? "text-[#60B5FF]" : ""
                      }`}
                    >
                      Album
                    </p>
                  </div>
                  <div
                    className={`w-full h-[60px] flex items-center cursor-pointer justify-start px-[20px] gap-3 py-[5px] rounded-[8px]
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
                        className: `${
                          activeItem === "User"
                            ? "fill-[#60B5FF]"
                            : "fill-[black]"
                        } text-[25px] max-desktop:text-[20px]`,
                      }}
                    >
                      <FaRegCircleUser />
                    </IconContext.Provider>
                    <p
                      className={`text-[18px] max-desktop:text-[16px]  ${
                        activeItem === "User" ? "text-[#60B5FF]" : ""
                      }`}
                    >
                      User
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex-9 h-full bg-[#000000] opacity-45"
          onClick={() => {
            setShow(false);
          }}
        ></div>
      </div>
    </div>
  );
}

export default SideBarResponsive;
