import React, { use } from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import SideBar from "../components/SideBar";
import { FaArrowLeft } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
function AlbumDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { albumId } = location.state || {};
  const navigateBack = () => {
    navigate(-1);
  };
  const [photos, setPhotos] = useState([]);
  const [albumInfo, setAlbumInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${albumId || id}/photos`
        );
        const userIdData = await axios.get(`
          https://jsonplaceholder.typicode.com/albums/${albumId || id}`);
        setPhotos(response.data.slice(0, 10));
        setAlbumInfo(userIdData.data);
        if (albumInfo !== null) {
          const userInfoData = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${albumInfo.userId}`
          );
          setUserInfo(userInfoData.data);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
    fetchPhotos();
  });
  return (
    <section className="w-full flex flex-row  ">
      <SideBar />
      <div className="w-full ">
        <div className="w-full h-[80px] bg-white "></div>
        <div className="w-full flex flex-col   p-10 gap-5">
          <div className="w-full   flex flex-row justify-start items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <IconContext.Provider value={{ color: "grey", size: "20px" }}>
                <BiPhotoAlbum />
              </IconContext.Provider>
              <h1
                className="text-[20px]  text-gray-400 rounded-[8px] p-1 hover:bg-[#5E686D] hover:text-[black] cursor-pointer"
                onClick={navigateBack}
              >
                Albums
              </h1>
              <span className="text-[20px]">/Show</span>
            </div>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-10">
            <IconContext.Provider value={{ color: "black", size: "25px" }}>
              <FaArrowLeft onClick={navigateBack} className="cursor-pointer" />
            </IconContext.Provider>
            <p className="text-[25px]">Show Album</p>
          </div>
          <div className="flex w-full bg-white  rounded-[10px] p-8 ">
            <div className="flex w-full border-2 border-solid border-[#EEEEEE] rounded-[10px] flex-col items-center justify-start">
              <div className="w-full flex flex-row p-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${
                    userInfo ? userInfo.name : "Unknown"
                  }`}
                  alt="userAVt..."
                  className="rounded-[50%] w-[50px] h-[50px]"
                />
                <div className="flex flex-col justify-start items-start ml-5 gap-5">
                  <p
                    className="text-[20px] font-bold text-[#60B5FF] cursor-pointer"
                    onClick={() => {
                      navigate(`/users/${userInfo.id}`, {
                        state: { userId: userInfo.id },
                      });
                    }}
                  >
                    {userInfo.name}
                  </p>
                  <a
                    className="text-[16px] text-[#60B5FF]"
                    href={userInfo.email}
                  >
                    {userInfo.email}
                  </a>
                </div>
              </div>
              <div className="w-[98%] bg-[#EEEE] h-[1px]"></div>
              <div className="w-full flex flex-col p-4">
                <h1 className="text-black font-bold text-[25px]">
                  {albumInfo.title}
                </h1>
                <ul className="w-full flex flex-wrap">
                  {photos.map((photo, index) => (
                    <li
                      key={index}
                      className="w-[200px] h-[200px] m-2 border-2 border-solid border-[#EEEE] rounded-[10px] relative"
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full rounded-[10px] "
                      />
                      <div
                        className="w-[200px] h-[200px] bg-black/20 absolute flex top-0 left-0 right-0 rounded-[10px] justify-center items-center gap-2 cursor-pointer
                      opacity-0 hover:opacity-100 transition-opacity duration-300"
                        onClick={() => {
                          window.open(photo.url, "_blank");
                        }}
                      >
                        <IconContext.Provider
                          value={{ color: "grey", size: "30px" }}
                        >
                          <GrView />
                        </IconContext.Provider>
                        Preview
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AlbumDetail;
