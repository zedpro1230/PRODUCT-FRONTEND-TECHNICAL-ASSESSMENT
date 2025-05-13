import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import Pagination from "@mui/material/Pagination";
import { DataContext } from "../context/DataContext";
import Spiner from "./Spiner";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
function AlbumTable() {
  // load spinner
  const [loading, setLoading] = useState(true);
  // State to store album and users data
  const [, , albums, setAlbums, users, setUsers] = useContext(DataContext);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage, setAlbumsPerPage] = useState(20);
  // default page size
  const [defaultPageSize, setDefaultPageSize] = useState([10, 20, 50, 100]);
  // State to store calculated albums for the current page and page size
  const [albumsCalculated, setAlbumsCalculated] = useState([]);
  // navigate and location hooks
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

  // Get albums and users data from API
  useEffect(() => {
    // check null or empty albums and users
    if (!albums?.length || !users?.length) {
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
          // Set timeout to simulate loading
          setTimeout(() => {
            setAlbums(response.data);
            setUsers(usersResponse.data);
            setLoading(false);
          }, 500);
        } catch (error) {
          console.error("Error fetching albums:", error);
          Error("Error while fetching data:", error);
        }
      };
      fetchAlbums();
    } else {
      setLoading(false);
    }
  }, [
    albums?.length,
    users?.length,
    setAlbums,
    setUsers,
    currentPage,
    albumsPerPage,
  ]);
  // update albumsCalculated when albums, currentPage or albumsPerPage changes
  useEffect(() => {
    if (albums && albums.length > 0) {
      setAlbumsCalculated(
        albums.slice(
          (currentPage - 1) * albumsPerPage,
          currentPage * albumsPerPage
        )
      );
    }
    // check if albumsPerPage from URL  is in defaultPageSize
    if (!defaultPageSize.includes(albumsPerPage)) {
      setDefaultPageSize((prev) =>
        [...prev, albumsPerPage].sort((a, b) => a - b)
      );
    }
  }, [albums, currentPage, albumsPerPage, defaultPageSize]);
  // selct albums per page
  console.log(defaultPageSize);
  const handleChange = (event) => {
    setAlbumsPerPage(event.target.value);
  };
  return (
    <section className="w-full flex flex-9 flex-col justify-start items-center mt-[60px]">
      <div className="w-full h-[80px] bg-white fixed top-0 left-0"></div>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center mt-[20px]">
          <Spiner />
        </div>
      ) : (
        <div className="w-full   flex justify-center items-center flex-col p-10 mb-10 max-desktop:px-3">
          <table className="min-w-full leading-normal mb-10">
            <thead className="bg-gray-100  uppercase text-[18px] max-desktop:text-[16px] border-b-[2px] border-[#EEEEEE]">
              <tr>
                <th className="text-start rounded-tl-[8px] p-4 max-desktop:p-2">
                  ID
                </th>
                <th className="text-start p-4 max-desktop:p-2">Title</th>
                <th className="text-start p-4 max-desktop:p-2">User</th>
                <th className="text-start rounded-tr-[8px] p-4 max-desktop:p-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {albumsCalculated.map((album, id) => {
                const user = users.find((user) => user.id === album.userId);
                return (
                  <tr
                    key={album.id}
                    className="bg-white border-b border-[#EEEEEE] hover:bg-gray-100"
                  >
                    <td className="p-4 text-[16px] max-desktop:text-[14px] max-desktop:p-2">
                      {album.id}
                    </td>
                    <td className="p-4 text-[16px] max-desktop:text-[14px] max-desktop:p-2">
                      {album.title}
                    </td>
                    <td className="p-4 flex flex-row items-center gap-4 max-desktop:p-2">
                      <img
                        className="w-[50px] h-[50px] rounded-full max-desktop:w-[35px] max-desktop:h-[35px]"
                        src={`https://ui-avatars.com/api/?name=${
                          user ? user.name : "Unknown"
                        }`}
                        alt="User Avatar"
                      />
                      <p
                        className="text-[#60B5FF] text-[16px] max-desktop:text-[14px] cursor-pointer hover:text-blue-600"
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
                              userEmail: user ? user.email : "Unknown",
                            },
                          });
                        }}
                      >
                        <IconContext.Provider
                          value={{ className: "group-hover:text-blue-400" }}
                        >
                          <GrView className="group-hover:text-blue-400" />
                        </IconContext.Provider>

                        <p className="text-[16px] max-desktop:text-[14px] text-black group-hover:text-blue-400">
                          Show
                        </p>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-full flex flex-row items-center justify-end">
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
                  backgroundColor: "white",
                },
                "& .Mui-selected": {
                  color: "purple",
                  backgroundColor: "#EB5B00",
                },
              }}
            />
            <Select
              value={albumsPerPage}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                width: "150px",
                height: "50px",

                backgroundColor: "white",
                borderRadius: "8px",
                border: "2px solid #EEEEEE",
                "& .MuiSelect-icon": {
                  color: "#60B5FF",
                },
              }}
            >
              {defaultPageSize.map((size, index) => (
                <MenuItem key={index} value={size}>
                  {size}/ Page
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      )}
    </section>
  );
}

export default AlbumTable;
