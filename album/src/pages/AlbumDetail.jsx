import { BiPhotoAlbum } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import SideBar from "../components/SideBar";
import { FaArrowLeft } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import SideBarResponsive from "../components/SideBarResponsive";
import Spiner from "../components/Spiner";
import axios from "axios";
function AlbumDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { albumId } = location.state || {};
  const navigateBack = () => {
    navigate(-1);
  };
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [albumDetails, setAlbumDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const fetchPhotos = async () => {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/albums/${
              albumId || id
            }/photos`
          );
          const userIdData = await axios.get(`
          https://jsonplaceholder.typicode.com/albums/${albumId || id}`);
          setAlbumPhotos(response.data.slice(0, 10));
          setAlbumDetails(userIdData.data);
          if (albumDetails !== null) {
            const userInfoData = await axios.get(
              `https://jsonplaceholder.typicode.com/users/${albumDetails.userId}`
            );
            setUserDetails(userInfoData.data);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      };
      fetchPhotos();
    }, 500);
  });
  return (
    <section className="w-full flex flex-row  ">
      <SideBarResponsive />
      <SideBar />
      <div className="w-full ">
        <div className="w-full h-[80px] bg-white fixed top-0 right-0"></div>

        <div className="w-full flex flex-col mt-[80px]  p-10 gap-5 max-desktop:px-3">
          <div className="w-full   flex flex-row justify-start items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <IconContext.Provider value={{ color: "grey", size: "20px" }}>
                <BiPhotoAlbum />
              </IconContext.Provider>
              <h1
                className="text-[20px] max-desktop:text-[18px] text-gray-400 rounded-[8px] p-1 hover:bg-[#5E686D] hover:text-[black] cursor-pointer"
                onClick={() => {
                  navigate("/albums");
                }}
              >
                Albums
              </h1>
              <span className="text-[18px] max-desktop:text-[16px]">/Show</span>
            </div>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-10">
            <IconContext.Provider
              value={{
                className:
                  "cursor-pointer hover:bg-[#EEEEEE] w-[35px] h-[35px] p-2 rounded-[25%]",
              }}
            >
              <FaArrowLeft onClick={navigateBack} />
            </IconContext.Provider>
            <p className="text-[25px] max-desktop:text-[20px] font-bold">
              Show Album
            </p>
          </div>
          <div className="flex w-full bg-white  rounded-[10px] p-8 ">
            {!loading ? (
              <div className="flex w-full border-2 border-solid border-[#EEEEEE] rounded-[10px] flex-col items-center justify-start">
                <div className="w-full flex flex-row p-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${
                      userDetails ? userDetails.name : "Unknown"
                    }`}
                    alt="Users Avatar"
                    className="rounded-[50%] w-[50px] h-[50px]"
                  />
                  <div className="flex flex-col justify-start items-start ml-5 gap-5">
                    <p
                      className="text-[20px] font-bold text-[#60B5FF] cursor-pointer"
                      onClick={() => {
                        navigate(`/users/${userDetails.id}`, {
                          state: { userId: userDetails.id },
                        });
                      }}
                    >
                      {userDetails.name}
                    </p>
                    <a
                      className="text-[16px] text-[#60B5FF]"
                      href={`mailto:${userDetails.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {userDetails.email}
                    </a>
                  </div>
                </div>
                <div className="w-[98%] bg-[#EEEE] h-[1px]"></div>
                <div className="w-full flex flex-col p-4">
                  <h1 className="text-black font-bold text-[20px] max-desktop:text-[18px]">
                    {albumDetails.title}
                  </h1>
                  <ul className="w-full flex flex-wrap">
                    {albumPhotos.map((photo, index) => (
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
            ) : (
              <div className="w-full h-[500px] flex justify-center items-center">
                <Spiner />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default AlbumDetail;
