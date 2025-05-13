import React from "react";
import SideBar from "../components/SideBar";
import AlbumTable from "../components/AlbumTable";
import SideBarResponsive from "../components/SideBarResponsive";

function AlbumPage() {
  return (
    <div className=" bg-[#DDDDDD] relative flex flex-row">
      <SideBarResponsive />
      <SideBar />
      <AlbumTable />
    </div>
  );
}

export default AlbumPage;
