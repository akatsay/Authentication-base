import React, { useContext } from "react"
import { toast, Slide } from "react-toastify"
import { AuthContext } from "../context/AuthContext"

import "../styles/homePage.css"

export const HomePage = () => {

    const auth = useContext(AuthContext)

    return (
        <>
            <div className="homepage-container">
                <h1 className="page-title">HomePage</h1>
                <h2>Hello, {auth.userName} !</h2>
            </div>
        </>
    )
}