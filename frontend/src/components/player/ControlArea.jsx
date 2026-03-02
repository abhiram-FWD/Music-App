import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { GiPauseButton } from "react-icons/gi";
import { FaCirclePlay } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import "../../css/footer/ControlArea.css";

const ControlArea = ({ playerState, onPlay, onPause, onPrevious, onNext, seekBg, seekBar, seekSong }) => {
  const { likedSongs, toggleLike, track, token } = useContext(PlayerContext);
  const isLiked = track ? likedSongs[track.id] : false;
  return (
    <div className="control-root">
      {/* Control Buttons */}
      <div className="control-buttons">
        <button
          type="button"
          aria-label="previous"
          className="control-icon-btn"
          onClick={onPrevious}
        >
          <TbPlayerTrackPrevFilled color="#a855f7" size={24} />
        </button>
        <button type="button" aria-label="play" className="control-play-btn" onClick={playerState.isPlaying ? onPause : onPlay}>
          {playerState.isPlaying ? (
            <GiPauseButton color="#a855f7" size={42} />
          ) : (
            <FaCirclePlay color="#a855f7" size={42} />
          )}
        </button>

        <button type="button" aria-label="next" className="control-icon-btn" onClick={onNext}>
          <TbPlayerTrackNextFilled color="#a855f7" size={24} />
        </button>
        {token && (
          <button type="button" aria-label="like" className="control-icon-btn" onClick={() => track && toggleLike(track.id)}>
            {isLiked ? <FaHeart color="#a855f7" size={22} /> : <FaRegHeart color="#a855f7" size={22} />}
          </button>
        )}
      </div>

      <div className="w-full flex items-center gap-2 text-xs font-medium text-gray-400">
        <span>{playerState.currentTime.minute}:{playerState.currentTime.second.toString().padStart(2, "0")}</span>

        <div className="control-progress-wrapper flex-1 h-1 bg-gray-800 rounded-full cursor-pointer overflow-hidden" ref={seekBg} onClick={seekSong}>
          <div ref={seekBar} className="h-full bg-purple-500 rounded-full" style={{ width: '0%', backgroundColor: '#a855f7' }}></div>
        </div>

        <span>{isNaN(playerState.duration.minute) ? "0" : playerState.duration.minute}:{isNaN(playerState.duration.second) ? "00" : playerState.duration.second.toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
};

export default ControlArea;
