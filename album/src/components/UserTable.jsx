import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import axios from "axios";
function UserTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch albums
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        // Fetch users
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchUsers();
  }, []);
  console.log(users);
  return (
    <section className="w-full flex flex-col justify-start items-start">
      <div className="w-full h-[80px] bg-white fixed top-0 left-0"></div>
      <div className="w-full flex flex-col justify-start px-10 items-start gap-2 ">
        <h1 className="text-3xl font-bold text-center mt-10">Users</h1>
        <div className="w-full     mb-10">
          <table className="min-w-full leading-normal mb-10">
            <thead className="bg-gray-100  uppercase text-[20px] ">
              <tr>
                <th className="text-start px-4 py-2 rounded-tl-[8px]">ID</th>
                <th className=" text-start px-4 py-2">Avatar</th>
                <th className="text-start px-4 py-2">Name</th>
                <th className="text-start px-4 py-2">Email</th>
                <th className="text-start px-4 py-2">Phone</th>
                <th className="text-start px-4 py-2">Website</th>
                <th className="text-start px-4 py-2 rounded-tr-[8px] p-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users !== null ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b-2 border-[#EEEEEE] hover:bg-gray-100"
                  >
                    <td className=" px-4 py-2">{user.id}</td>
                    <td className=" px-4 py-2">
                      <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={`https://ui-avatars.com/api/?name=${
                          user ? user.name : "Unknown"
                        }`}
                        alt="User Avatar"
                      />
                    </td>
                    <td className=" px-4 py-2 text-[20px]">{user.name}</td>
                    <td className=" px-4 py-2 text-[20px] text-[#60B5FF] cursor-pointer">
                      {user.email}
                    </td>
                    <td className=" px-4 py-2 text-[20px] text-[#60B5FF] cursor-pointer">
                      {user.phone}
                    </td>
                    <td className=" px-4 py-2 text-[20px] text-[#60B5FF] cursor-pointer">
                      {user.website}
                    </td>
                    <td className="p-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center
                      justify-center gap-2"
                        onClick={() => {
                          navigate(`/users/${user.id}`, {
                            state: {
                              userId: user.id,
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
                ))
              ) : (
                <p>No users found.</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default UserTable;
