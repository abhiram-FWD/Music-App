import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Admin from "./pages/Admin";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

import "./App.css";

import { PlayerContext } from "./context/PlayerContext";

function App() {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <audio ref={audioRef} src={track ? track.file : ""} preload="auto"></audio>
    </div>
  );
}

export default App;
