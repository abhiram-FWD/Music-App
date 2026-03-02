import React, { useState, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

import Footer from "../components/layout/Footer";
import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";
import EditProfile from "../components/profile/EditProfile";

import "../css/pages/HomePage.css";

const Homepage = () => {
  const [view, setView] = useState("home");
  const [showProfile, setShowProfile] = useState(false);
  const { songsData } = useContext(PlayerContext);

  return (
    <div className="homepage-root">
      <div className="homepage-main-wrapper">
        {/* Sidebar */}
        <div className="homepage-sidebar">
          <SideMenu setView={setView} view={view} openProfile={() => setShowProfile(true)} />
        </div>
        {/* Main Content */}
        <div className="homepage-content">
          <MainArea view={view} songs={songsData} />
        </div>
      </div>
      {/* Footer Player */}
      <Footer />

      {/* Modals */}
      {showProfile && <EditProfile onClose={() => setShowProfile(false)} />}
    </div>
  );
};


export default Homepage;
