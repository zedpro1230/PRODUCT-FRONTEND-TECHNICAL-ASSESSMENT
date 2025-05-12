import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import Pagination from "@mui/material/Pagination";
import Spiner from "./Spiner";
function AlbumTable() {
  // load spinner
  const [loading, setLoading] = useState(true);
  // State to store album data
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage, setAlbumsPerPage] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();
  // Get current page and page size from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageSizeParam = searchParams.get("pageSize");
    const pageParam = searchParams.get("current");

    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
    if (pageSizeParam) {
      setAlbumsPerPage(parseInt(pageSizeParam, 10));
    }
  }, [location.search]);

  // Update URL when page changes
  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("pageSize", albumsPerPage);
    searchParams.set("current", currentPage);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [currentPage, albumsPerPage, navigate, location.pathname]);

  // Get album data from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // Fetch albums
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        // Fetch users
        const usersResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setTimeout(() => {
          setAlbums(response.data);
          setUsers(usersResponse.data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);
  const albumsCalculated = albums.slice(
    (currentPage - 1) * albumsPerPage,
    currentPage * albumsPerPage
  );
  return (
    <section className="w-full flex flex-col justify-start items-center mt-[60px]">
      <div className="w-full h-[80px] bg-white fixed top-0 left-0"></div>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center mt-[20px]">
          <Spiner />
        </div>
      ) : (
        <div className="w-full    p-10 mb-10">
          <table className="min-w-full leading-normal mb-10">
            <thead className="bg-gray-100  uppercase text-[18px] ">
              <tr>
                <th className="text-start rounded-tl-[8px] p-4">ID</th>
                <th className="text-start p-4">Title</th>
                <th className="text-start p-4">User</th>
                <th className="text-start rounded-tr-[8px] p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {albums === null || users === null ? (
                <></>
              ) : (
                albumsCalculated.map((album, id) => {
                  const user = users.find((user) => user.id === album.userId);
                  return (
                    <tr
                      key={album.id}
                      className="bg-white border-b border-[#EEEEEE] hover:bg-gray-100"
                    >
                      <td className="p-4 text-[20px]">{album.id}</td>
                      <td className="p-4 text-[20px]">{album.title}</td>
                      <td className="p-4 flex flex-row items-center gap-2">
                        <img
                          className="w-[50px] h-[50px] rounded-full"
                          src={`https://ui-avatars.com/api/?name=${
                            user ? user.name : "Unknown"
                          }`}
                          alt="User Avatar"
                        />
                        <p
                          className="text-[#60B5FF] text-[20px] cursor-pointer"
                          onClick={() => {
                            navigate(`/users/${user.id}`, {
                              state: {
                                userId: user.id,
                              },
                            });
                          }}
                        >
                          {user ? user.name : "Unknown"}
                        </p>
                      </td>
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
                          <IconContext.Provider value={{ color: "white" }}>
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
          <Pagination
            count={Math.ceil(albums.length / albumsPerPage)}
            variant="outlined"
            page={currentPage}
            onChange={(event, value) => {
              setCurrentPage(value);
            }}
            showFirstButton
            showLastButton
            shape="rounded"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "gray",
                backgroundColor: "white", // Color of all items
              },
              "& .Mui-selected": {
                color: "purple", // Color of the selected item
                backgroundColor: "#EB5B00", // background color of selected item
              },
            }}
          />
        </div>
      )}
    </section>
  );
}

export default AlbumTable;
