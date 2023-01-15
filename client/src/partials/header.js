import React, { useContext, useRef, useEffect, useCallback } from "react"
import { toast, Slide } from "react-toastify"
import { AuthContext } from "../context/AuthContext"
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import { useNavigate } from 'react-router-dom'

import "../styles/header.css"

export const Header = () => {

  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const [open, setOpen] = useDetectOutsideClick(dropdownRef, false);

  const auth = useContext(AuthContext)

  const handleOpen = () => setOpen(!open);

  const logoutHandler = () => {
    auth.logout()
    toast.warning("Logged out", {
        style: {backgroundColor: "#555", color: "white"},
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        })
  }



    return (
      <nav className="navbar">
        <div className="brand-title">Authentication</div>
          { auth.isAuthenticated
            ?
            <div ref={dropdownRef} className="dropdown">
              <button className="drop-trigger" onClick={handleOpen}>
                <p>Logged in as:</p>
                <i>{auth.userEmail}</i>
              </button>
              {open ? (
                <ul className="dropdown-menu">
                  <li className="menu-item">
                    <button onClick={() => {navigate("/account")}}>Account settings</button>
                  </li>
                  <li className="menu-item">
                    <button onClick={logoutHandler} className="logout-btn">Logout</button>
                  </li>
                </ul>
              ) : null}
        </div>
            :
            null
          }


        {/* <div className="dropdown">
          {auth.isAuthenticated
            ? 
            <span className="drop-trigger">
              <p>Logged in as:</p>
              <i>{auth.userEmail}</i>
            </span>
            :
            null
          }
          <div className="dropdown-menu">
            <button onClick={logoutHandler} className="logout">Logout</button>
          </div>
        </div> */}
      </nav>
    )
}