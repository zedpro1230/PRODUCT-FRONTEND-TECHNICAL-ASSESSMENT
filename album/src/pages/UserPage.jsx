import React from "react";
import SideBar from "../components/SideBar";

import UserTable from "../components/UserTable";
import SideBarResponsive from "../components/SideBarResponsive";
function UserPage() {
  return (
    <div className=" bg-[#DDDDDD] relative flex flex-row">
      <SideBarResponsive />
      <SideBar />
      <UserTable />
    </div>
  );
}

export default UserPage;
