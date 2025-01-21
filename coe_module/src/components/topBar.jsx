import React from "react";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function HorizontalNavbar({ toggleVerticalNavbar }) {
  return (
    <div className="w-full flex justify-between z-1000">
      <div className="flex items-center px-5 ml-2">
        <h3 className="text-xl font-semibold">IQAC</h3>
        <div className="ml-2 cursor-pointer" onClick={toggleVerticalNavbar}>
          <MenuRoundedIcon className="text-button mt-2 text-3xl hover:bg-button hover:text-background-2 rounded transition-all duration-200" />
        </div>
      </div>

      <nav>
        <ul className="flex items-center justify-center z-9998 space-x-4">
          
          <li>
            <AccountCircleRoundedIcon className="text-button text-2xl hover:bg-button hover:text-background-2 rounded transition-all duration-200" />
          </li>
          <li>
            <SettingsRoundedIcon className="text-button text-2xl hover:bg-button hover:text-background-2 rounded transition-all duration-200" />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HorizontalNavbar;
