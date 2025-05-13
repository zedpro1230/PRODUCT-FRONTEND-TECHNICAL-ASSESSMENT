import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import Spiner from "./Spiner";
import axios from "axios";
import { DataContext } from "../context/DataContext";
function UserTable() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [, , , , users, setUsers] = useContext(DataContext);
  useEffect(() => {
    if (!users?.length) {
      const fetchUsers = async () => {
        try {
          // Fetch albums
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          setUsers(response.data);
          setLoading(false);
          // Fetch users
        } catch (error) {
          console.error("Error fetching albums:", error);
        }
      };
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [users, setUsers]);

  return (
    <section className="w-full flex flex-9 flex-col justify-start items-start mt-[60px]">
      <div className="w-full h-[80px] bg-white fixed top-0 left-0"></div>

      <div className="w-full flex flex-col justify-start px-10 items-start gap-2 max-desktop:px-3">
        <h1 className="text-3xl font-bold text-center mt-10">Users</h1>
        <div className="w-full     mb-10">
          {!loading ? (
            <table className="min-w-full leading-normal mb-10">
              <thead className="bg-gray-100  uppercase text-[18px] max-desktop:text-[16px]">
                <tr>
                  <th className="text-start p-4 rounded-tl-[8px]  max-desktop:p-2">
                    ID
                  </th>
                  <th className="text-start p-4 max-desktop:p-2">Avatar</th>
                  <th className="text-start p-4 max-desktop:p-2">Name</th>
                  <th className="text-start p-4 max-desktop:p-2">Email</th>
                  <th className="text-start p-4 max-desktop:p-2">Phone</th>
                  <th className="text-start p-4 max-desktop:p-2">Website</th>
                  <th className="text-start p-4 rounded-tr-[8px] max-desktop:p-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white border-b-2 border-[#EEEEEE] hover:bg-gray-100"
                    >
                      <td className=" p-4 text-[16px] max-desktop:text-[14px] max-desktop:p-2">
                        {user.id}
                      </td>
                      <td className=" p-4 max-desktop:p-2">
                        <img
                          className="w-[50px] h-[50px] rounded-full max-desktop:w-[35px] max-desktop:h-[35px]"
                          src={`https://ui-avatars.com/api/?name=${
                            user ? user.name : "Unknown"
                          }`}
                          alt="User Avatar"
                        />
                      </td>
                      <td className=" p-4 text-[16px] max-desktop:text-[14px] max-desktop:p-2">
                        {user.name}
                      </td>
                      <td className=" p-4 text-[16px] max-desktop:text-[14px] max-desktop:p-2 text-[#60B5FF] cursor-pointer">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td className=" p-4 text-[16px] max-desktop:text-[14px] max-desktop:p-2 text-[#60B5FF] cursor-pointer">
                        <a href={`tel:${user.phone}`}>{user.phone}</a>
                      </td>
                      <td className=" p-4 text-[16px] max-desktop:text-[14px] max-desktop:p-2 text-[#60B5FF] cursor-pointer">
                        <a
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.website}
                        </a>
                      </td>
                      <td className="p-4">
                        <button
                          className="px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 cursor-pointer
              border border-[#EEEEEE] text-[20px] max-desktop:p-2 hover:border-blue-400 group"
                          onClick={() => {
                            navigate(`/users/${user.id}`, {
                              state: {
                                userId: user.id,
                              },
                            });
                          }}
                        >
                          <IconContext.Provider
                            value={{ className: "group-hover:text-blue-400" }}
                          >
                            <GrView className="text-[20px]" />
                          </IconContext.Provider>
                          <p className="text-[16px] max-desktop:text-[14px] text-black group-hover:text-blue-400">
                            Show
                          </p>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex justify-center items-center h-[300px]">
              <Spiner />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UserTable;
