import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { IoVolumeHighOutline } from "react-icons/io5";
import { TbArrowsShuffle } from "react-icons/tb";
import { RiLoopRightLine } from "react-icons/ri";

import "../../css/footer/Feature.css";

const Features = () => {
  const {
    volume, setVolume,
    speed, setSpeed,
    loop, setLoop
  } = useContext(PlayerContext);

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  return (
    <div className="features-root">
      <div className="features-row">
        {/* Mute */}
        {/* Mute/Unmute */}
        <button className="features-btn" aria-label="mute" onClick={toggleMute}>
          {volume === 0 ? <IoVolumeHighOutline color="gray" size={26} /> : <IoVolumeHighOutline color="#a855f7" size={26} />}
        </button>

        {/* Shuffle */}
        <button className="features-btn" aria-label="shuffle">
          <TbArrowsShuffle color="#9ca3af" size={26} />
        </button>

        {/* Loop */}
        {/* Loop */}
        <button className="features-btn" aria-label="loop" onClick={() => setLoop(!loop)}>
          <RiLoopRightLine color={loop ? "#a855f7" : "#9ca3af"} size={26} />
        </button>

        {/* Playback Speed */}
        <label className="features-speed-label">
          <select
            className="features-speed-select"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </label>
      </div>

      {/* Volume */}
      <div className="features-volume-wrapper">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="features-volume-range"
        />
      </div>
    </div>
  );
};

export default Features;
