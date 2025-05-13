import { BiPhotoAlbum } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import SideBar from "../components/SideBar";
import { FaArrowLeft } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import SideBarResponsive from "../components/SideBarResponsive";
import axios from "axios";
import Spiner from "../components/Spiner";
function UserDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = location.state || {};
  const navigateBack = () => {
    navigate(-1);
  };
  const [user, setUser] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId || id}`
        );
        setUser(userResponse.data);
        const albumsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/albums`
        );
        setAlbums(albumsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUser();
  }, [userId, id]);
  const filteredAlbums = albums.filter((album) => album.userId === user.id);

  return (
    <section className="w-full flex flex-row  ">
      <SideBarResponsive />
      <SideBar />
      <div className="w-full ">
        <div className="w-full h-[80px] bg-white fixed top-0 right-0"></div>
        <div className="w-full flex flex-col mt-[80px] p-10 gap-5 max-desktop:px-3">
          <div className="w-full   flex flex-row justify-start items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <IconContext.Provider value={{ color: "grey", size: "20px" }}>
                <BiPhotoAlbum />
              </IconContext.Provider>
              <h1
                className="text-[20px] max-desktop:text-[18px]  text-gray-400 rounded-[8px] p-1 hover:bg-[#5E686D] hover:text-[black] cursor-pointer"
                onClick={navigateBack}
              >
                Users
              </h1>
              <span className="text-[18px] max-desktop:text-[16px]">/Show</span>
            </div>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-8">
            <IconContext.Provider
              value={{
                className:
                  "cursor-pointer hover:bg-[#EEEEEE] w-[35px] h-[35px] p-2 rounded-[25%]",
              }}
            >
              <FaArrowLeft onClick={navigateBack} />
            </IconContext.Provider>
            <p className="text-[25px] max-desktop:text-[20px] font-bold">
              Show User
            </p>
          </div>
          <div className="flex w-full bg-white  rounded-[10px] p-8 ">
            {!loading ? (
              <div className="flex w-full border-2 border-solid border-[#EEEEEE] rounded-[10px] flex-col items-center justify-start">
                <div className="w-full flex flex-row p-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${
                      user ? user.name : "Unknown"
                    }`}
                    alt="Users Avatar"
                    className="rounded-[50%] w-[50px] h-[50px]"
                  />
                  <div className="flex flex-col justify-start items-start ml-5 gap-5">
                    <p className="text-[20px] font-bold ">{user.name}</p>
                    <a
                      className="text-[16px] text-[#60B5FF]"
                      href={`mailto:${user.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>
                <div className="w-[98%] bg-[#EEEEEE] h-[1px]"></div>
                <div className="w-full flex flex-col p-4 gap-2">
                  <h1 className="text-[20px] font-bold">Albums</h1>
                  <table class="min-w-full leading-normal mb-10 ">
                    <thead className="bg-gray-100  uppercase text-[18px] border-b-[2px] border-[#EEEEEE]">
                      <tr>
                        <th className="text-start rounded-tl-[8px] p-4 max-desktop:p-2">
                          ID
                        </th>
                        <th className="text-start p-4 max-desktop:p-2">
                          Title
                        </th>

                        <th className="text-start rounded-tr-[8px] p-4 max-desktop:p-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {user === null ? (
                        <></>
                      ) : (
                        filteredAlbums.map((album) => {
                          return (
                            <tr
                              key={album.id}
                              className="bg-white  hover:bg-gray-100 border-b-2 border-[#EEEEEE]"
                            >
                              <td className="p-4 text-[16px] max-desktop:text-[14px] max-desktop:p-2">
                                {album.id}
                              </td>
                              <td className="p-4 text-[16px] max-desktop:text-[14px] max-desktop:p-2">
                                {album.title}
                              </td>
                              <td className="p-4">
                                <button
                                  className="px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 cursor-pointer max-desktop:p-2
              border border-[#EEEEEE] text-[16px] max-desktop:text-[14px] hover:border-blue-400 group"
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
                                        userEmail: user
                                          ? user.email
                                          : "Unknown",
                                      },
                                    });
                                  }}
                                >
                                  <IconContext.Provider
                                    value={{
                                      className: "group-hover:text-blue-400",
                                    }}
                                  >
                                    <GrView className="text-[20px]" />
                                  </IconContext.Provider>
                                  <p className="text-[16px] max-desktop:text-[14px] text-black group-hover:text-blue-400">
                                    Show
                                  </p>
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
            ) : (
              <div className="w-full h-[500px] flex flex-col items-center justify-center">
                <Spiner />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default UserDetail;
