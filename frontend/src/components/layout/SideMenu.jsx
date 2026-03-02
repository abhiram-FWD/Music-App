import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

import { IoIosSettings } from "react-icons/io";
import logo from "../../assets/wsa-logo.jpg";
import "../../css/sidemenu/SideMenu.css";
import { CiUser, CiServer } from "react-icons/ci";
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";

const SideMenu = ({ setView, view, openProfile }) => {
  const { token, userData } = useContext(PlayerContext);
  const getNavBtnClass = (item) =>
    `sidemenu-nav-btn ${view === item ? "active" : ""}`;
  return (
    <>
      <aside className="sidemenu-root">
        {/* Logo */}
        <div className="sidemenu-header">
          <img src={logo} alt="wsa-logo" className="sidemenu-logo-img" />
          <h2 className="sidemenu-logo-title">Synthesia</h2>
        </div>
        {/* Navigation */}
        <nav className="sidemenu-nav" aria-label="Main navigation">
          <ul className="sidemenu-nav-list">
            <li>
              <button
                className={getNavBtnClass("home")}
                onClick={() => setView("home")}
              >
                <AiOutlineHome className="sidemenu-nav-icon" size={18} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("search")}
                className={getNavBtnClass("search")}
              >
                <AiOutlineSearch className="sidemenu-nav-icon" size={18} />
                <span> Search</span>
              </button>
            </li>
            <li>
              <button
                className={getNavBtnClass("favourite")}
                onClick={() => setView("favourite")}
              >
                <AiOutlineHeart size={18} />
                <span>Favourite</span>
              </button>
            </li>
            {userData && userData.email === "admin@gmail.com" && (
              <li>
                <button
                  className={getNavBtnClass("admin")}
                  onClick={() => setView("admin")}
                >
                  <CiServer size={18} />
                  <span>Admin Panel</span>
                </button>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex-1"></div>
        <div className="sidemenu-profile-row">
          <div className="profile-placeholder">
            {userData && userData.image ? (
              <img src={userData.image} alt="User Avatar" className="w-[30px] h-[30px] rounded-full object-cover" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <CiUser size={30} />
            )}
          </div>

          <div className="sidemenu-username-wrapper">
            <div className="sidemenu-username">{userData ? userData.name : "Guest"}</div>
          </div>
          <div className="settings-container">
            <button type="button" className="sidemenu-settings-btn" onClick={openProfile}>
              <IoIosSettings size={20} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
