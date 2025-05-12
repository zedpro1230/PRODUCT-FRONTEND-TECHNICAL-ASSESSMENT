import React from "react";

function NavBar() {
  return (
    <nav className="w-full flex justify-start items-center bg-white  p-4 fixed top-0 left-0 z-10 right-0">
      <img
        className="
        w-[150px] h-[60px] cursor-pointer"
        src="https://geekup.vn/Icons/geekup-logo-general.svg"
        alt="Logo"
      />
    </nav>
  );
}

export default NavBar;
