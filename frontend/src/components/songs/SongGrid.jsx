import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { FaPlay } from "react-icons/fa";
import "../../css/songs/SongGrid.css";

const SongGrid = ({ songs }) => {
  const { playWithId } = useContext(PlayerContext);

  if (!songs || songs.length === 0) {
    return <div className="text-white text-center mt-10">No favorites added yet.</div>;
  }

  return (
    <div className="song-grid-container">
      {songs.map((song) => (
        <div key={song.id} className="song-grid-card" onClick={() => playWithId(song.id)}>
          <img src={song.image} alt={song.name} className="song-grid-image" />

          <div className="song-grid-play-btn">
            <FaPlay color="white" size={12} />
          </div>

          <div className="song-grid-info">
            <h3 className="song-grid-title">{song.name}</h3>
            <p className="song-grid-artist">{song.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongGrid;
