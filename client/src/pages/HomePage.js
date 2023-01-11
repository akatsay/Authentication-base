import React, { useContext } from "react"
import { toast, Slide } from "react-toastify"
import { AuthContext } from "../context/AuthContext"

import "../styles/homePage.css"

export const HomePage = () => {

    const auth = useContext(AuthContext)

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
            });
    }

    return (
        <>
            <div className="homepage-container">
                <h1 className="page-title">HomePage</h1>
                <button className="auth-action-btn grow" onClick={logoutHandler}>Log out</button>
            </div>
        </>
    )
}