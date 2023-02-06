import React, { useContext, useRef, useState } from "react"
import { toast, Slide } from "react-toastify"
import { AuthContext } from "../context/AuthContext"
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import { useNavigate } from 'react-router-dom'

import "../styles/header.css"

export const Header = () => {

  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  
  const [clicked, setClicked] = useState(false) //Flag to prevent animation when page
  const [open, setOpen] = useDetectOutsideClick(dropdownRef, false);

  const auth = useContext(AuthContext)

  const handleClicked = () => setClicked(true)

  const handleOpen = () => setOpen(!open)

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
            <div ref={dropdownRef} className={`dropdown ${auth.isAuthenticated ? "" : "hide"}`}>
              <button className="drop-trigger big" onClick={() => {handleOpen(); handleClicked();}}>
                <p>Logged in as:</p>
                <i>{auth.userEmail}</i>
              </button>
              <button className="drop-trigger small" onClick={handleOpen}>
                <span></span>
                <span></span>
                <span></span>
              </button>
              <ul className={`dropdown-menu ${open ? "show" : "hide"}`}>
                <li className="menu-item">
                  <button onClick={() => {navigate("/account")}} className="account-nav-btn">Account-settings</button>
                </li>
                <li className="menu-item">
                  <button onClick={logoutHandler} className="logout-btn">Logout</button>
                </li>
              </ul>
        </div>
      </nav>
    )
}