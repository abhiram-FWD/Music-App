import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

import Auth from "../auth/Auth";
import Playlist from "../player/Playlist";
import SearchBar from "../search/SearchBar";
import SongList from "../player/SongList";
import SongGrid from "../songs/SongGrid";
import Admin from "../../pages/Admin";

import "../../css/mainArea/MainArea.css";

const MainArea = ({ view, songs }) => {
  const { likedSongs, userData } = useContext(PlayerContext);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);

  // Map UI Labels to Album Names
  const categoryMap = {
    "Workout": "Workout Energy",
    "Chill": "Chill Lo-Fi",
    "Happy": "Happy Vibes",
    "Relaxing": "Relaxing Piano",
    "Rock": "Rock Classics"
  };

  useEffect(() => {
    let result = songs;

    // Filter by Category
    if (category !== "All") {
      const albumName = categoryMap[category];
      if (albumName) {
        result = result.filter(song => song.album === albumName);
      }
    }

    // Filter by Search Query
    if (searchQuery) {
      result = result.filter(song =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSongs(result);
  }, [category, searchQuery, songs]);

  return (
    <div className="mainarea-root">
      <div className="mainarea-top">
        <Auth />
        {view === "home" && <Playlist setCategory={setCategory} />}
        {view === "search" && <SearchBar setSearchQuery={setSearchQuery} />}
        {view === "admin" && userData?.email === "admin@gmail.com" && <div className="text-white text-2xl font-bold ml-4">Admin Dashboard</div>}
      </div>

      <div className="mainarea-scroll">
        {(view === "home" || view === "search") && <SongList songs={filteredSongs} />}

        {view === "favourite" && <SongGrid songs={songs.filter(song => likedSongs[song.id])} />}

        {view === "admin" && userData?.email === "admin@gmail.com" ? <Admin /> : view === "admin" ? <div className="text-white text-center mt-10">Access Denied</div> : null}
      </div>
    </div>
  );
};

export default MainArea;
