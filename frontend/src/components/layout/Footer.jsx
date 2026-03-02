import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

import SongDetail from "../player/SongDetail";
import ControlArea from "../player/ControlArea";
import Features from "../player/Features";

import "../../css/footer/Footer.css";

const Footer = () => {
  const {
    time,
    playStatus,
    play,
    pause,
    track,
    seekBg,
    seekBar,
    seekSong,
    previous,
    next,
  } = useContext(PlayerContext);

  const playerState = {
    currentSong: track
      ? {
        name: track.name,
        artist_name: track.artist_name,
        image: track.cover,
      }
      : {
        name: "No Song",
        artist_name: "",
        image: "",
      },
    isPlaying: playStatus,
    currentTime: time.currentTime,
    duration: time.totalTime,
    volume: 50, // Volume implementation can be added later
  };

  return (
    <footer className="footer-root footer-glow">
      <SongDetail currentSong={playerState.currentSong} />
      <ControlArea
        playerState={playerState}
        onPlay={play}
        onPause={pause}
        onPrevious={previous}
        onNext={next}
        seekBg={seekBg}
        seekBar={seekBar}
        seekSong={seekSong}
      />
      <Features playerState={playerState} />
    </footer>
  );
};

export default Footer;
