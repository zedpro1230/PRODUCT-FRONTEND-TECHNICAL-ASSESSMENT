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
function UserDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = location.state || {};
  const navigateBack = () => {
    navigate(-1);
  };
  const [user, setUser] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId || id}`
        );
        setUser(userData.data);
        const userAlbumsData = await axios.get(
          `https://jsonplaceholder.typicode.com/albums`
        );
        setUserAlbums(userAlbumsData.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUser();
  }, [userId, id]);
  const userAlbumsFiltered = userAlbums.filter(
    (album) => album.userId === user.id
  );
  console.log(userAlbumsFiltered);
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
                Users
              </h1>
              <span className="text-[20px]">/Show</span>
            </div>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-10">
            <IconContext.Provider value={{ color: "black", size: "25px" }}>
              <FaArrowLeft onClick={navigateBack} className="cursor-pointer" />
            </IconContext.Provider>
            <p className="text-[25px]">Show User</p>
          </div>
          <div className="flex w-full bg-white  rounded-[10px] p-8 ">
            <div className="flex w-full border-2 border-solid border-[#EEEEEE] rounded-[10px] flex-col items-center justify-start">
              <div className="w-full flex flex-row p-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${
                    user ? user.name : "Unknown"
                  }`}
                  alt="userAVt..."
                  className="rounded-[50%] w-[50px] h-[50px]"
                />
                <div className="flex flex-col justify-start items-start ml-5 gap-5">
                  <p className="text-[20px] font-bold ">{user.name}</p>
                  <a className="text-[16px] text-[#60B5FF]" href={user.email}>
                    {user.email}
                  </a>
                </div>
              </div>
              <div className="w-[98%] bg-[#EEEEEE] h-[1px]"></div>
              <div className="w-full flex flex-col p-4">
                <h1 className="text-[20px] font-bold">Albums</h1>
                <table class="min-w-full leading-normal mb-10 ">
                  <thead className="bg-gray-100  uppercase text-[18px] ">
                    <tr>
                      <th className="text-start rounded-tl-[8px] p-4">ID</th>
                      <th className="text-start p-4">Title</th>

                      <th className="text-start rounded-tr-[8px] p-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user === null ? (
                      <></>
                    ) : (
                      userAlbumsFiltered.map((album) => {
                        return (
                          <tr
                            key={album.id}
                            className="bg-white  hover:bg-gray-100 border-b-2 border-[#EEEEEE]"
                          >
                            <td className="p-4 text-[20px]">{album.id}</td>
                            <td className="p-4 text-[20px]">{album.title}</td>
                            <td className="p-4">
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center
                      justify-center gap-2"
                                onClick={() => {
                                  navigate(`/albums/${album.id}`, {
                                    state: {
                                      albumId: album.id,
                                      albumTitle: album.title,
                                      userId: user ? user.id : null,
                                      userName: user ? user.name : "Unknown",
                                      userAvatar: `https://ui-avatars.com/api/?name=${
                                        user ? user.name : "Unknown"
                                      }`,
                                      userEmail: user ? user.email : "Unknown",
                                    },
                                  });
                                }}
                              >
                                <IconContext.Provider
                                  value={{ color: "white" }}
                                >
                                  <GrView className="text-[20px]" />
                                  Show
                                </IconContext.Provider>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default UserDetail;
