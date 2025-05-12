import React from "react";
import SideBar from "../components/SideBar";

import UserTable from "../components/UserTable";
function UserPage() {
  return (
    <div className=" bg-[#DDDDDD] relative flex flex-row">
      <SideBar />
      <UserTable />
    </div>
  );
}

export default UserPage;
