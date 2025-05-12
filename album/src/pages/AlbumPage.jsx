import React from "react";
import SideBar from "../components/SideBar";
import AlbumTable from "../components/AlbumTable";
function AlbumPage() {
  return (
    <div className=" bg-[#DDDDDD] relative flex flex-row">
      <SideBar />
      <AlbumTable />
    </div>
  );
}

export default AlbumPage;
