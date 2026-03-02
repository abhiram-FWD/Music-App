import React, { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "../../css/auth/Auth.css";
import "../../css/common/Modal.css";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null

  const closeAuth = () => setAuthMode(null);

  const { token, setToken } = useContext(PlayerContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    window.location.reload(); // clear state completely
  };

  return (
    <div className="auth-container">
      {!token ? (
        <>
          <button className="auth-btn signup" onClick={() => setAuthMode("signup")}>
            Signup
          </button>
          <button className="auth-btn login" onClick={() => setAuthMode("login")}>
            Login
          </button>
        </>
      ) : (
        <button className="auth-btn login" onClick={logout}>
          Logout
        </button>
      )}

      {authMode && (
        <div className="modal-backdrop" onClick={closeAuth}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeAuth}>
              &times;
            </button>
            {authMode === "login" ? (
              <Login closeAuth={closeAuth} openSignup={() => setAuthMode("signup")} />
            ) : (
              <Signup closeAuth={closeAuth} openLogin={() => setAuthMode("login")} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
