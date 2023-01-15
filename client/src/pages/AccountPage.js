import React, { useContext, useState, useEffect, useRef } from "react"
import { toast, Slide } from "react-toastify"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom'
import { useHttp } from "../hooks/http.hook"

import "../styles/accountPage.css"

export const AccountPage = () => {

    const nameRef = useRef(null)
    const oldPasswordRef = useRef(null)
    const newPasswordRef = useRef(null)    

    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [showChangeNameMenu, setShowChangeNameMenu] = useState(false)
    const [showChangePasswordMenu, setShowChangePasswordMenu] = useState(false)
    const [changeNameErrorMessageDetails, setChangeNameErrorMessageDetails] = useState({})
    const [changePasswordErrorMessageDetails, setChangePasswordErrorMessageDetails] = useState({})

    const [nameForm, setNameForm] = useState({
        name: "",
        userId: auth.userId
    })

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        userId: auth.userId
    })

    const navigate = useNavigate()

    const NameChangeHandler = (event) => {
        setNameForm({...nameForm, [event.target.name]: event.target.value})
    }

    const nameChangeSubmitHandler = async () => {
        try {
            const data = await request("/api/account/name", "post", {...nameForm})
            auth.userName = nameForm.name
            setChangeNameErrorMessageDetails({})
            nameRef.current.style.borderBottomColor = ""
            setShowChangeNameMenu(false)
            setNameForm({...nameForm, name: "" })
            toast.success(data.message, {
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
        } catch (e) {
            
        }
    }

    const passwordChangeHandler = (event) => {
        setPasswordForm({...passwordForm, [event.target.name]: event.target.value})
    }

    const passwordChangeSubmitHandler = async () => {
        try {
            const data = await request("/api/account/password", "post", {...passwordForm})
            setChangePasswordErrorMessageDetails({})
            oldPasswordRef.current.style.borderBottomColor = ""
            newPasswordRef.current.style.borderBottomColor = ""
            setShowChangePasswordMenu(false)
            setPasswordForm({...passwordForm, oldPassword: "", newPassword: ""})
            toast.success(data.message, {
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
        } catch (e) {
            
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
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
            if (error.cause !== undefined) {
                if (error.cause.origin === "name") {
                    setChangeNameErrorMessageDetails(error.cause)
                    nameRef.current.focus()
                    nameRef.current.style.borderBottomColor = "#FF7276"
                } else if (error.cause.origin === "oldPassword") {
                    setChangePasswordErrorMessageDetails(error.cause)
                    oldPasswordRef.current.focus()
                    oldPasswordRef.current.style.borderBottomColor = "#FF7276"
                    newPasswordRef.current.style.borderBottomColor = ""
                } else if (error.cause.origin === "newPassword") {
                    setChangePasswordErrorMessageDetails(error.cause)
                    newPasswordRef.current.focus()
                    newPasswordRef.current.style.borderBottomColor = "#FF7276"
                    oldPasswordRef.current.style.borderBottomColor = ""
                }
            }
            clearError()
        }
    }, [error, clearError])

    return (
        <>
            <div className="account-page-container">
                <button onClick={() => {navigate("/home")}}>{"<-"}Back to Home Page</button>
                <h1 className="page-title">Account settings</h1>
                <div className="settings-container">
                    <div className="setting-wrapper">
                        <label className="setting-label">Your email: </label>
                        <label className="parameter-label">{auth.userEmail}</label>
                        <button className="pustishka">Change</button>
                    </div>
                    <div className="setting-wrapper">
                        <label className="setting-label">Your name: </label>
                        <label className="parameter-label">{auth.userName}</label>
                        <button 
                            onClick={() => 
                                {
                                    setShowChangeNameMenu(!showChangeNameMenu);
                                    showChangeNameMenu ? setShowChangePasswordMenu(false) : setShowChangePasswordMenu(false);
                                    !showChangeNameMenu ? setChangeNameErrorMessageDetails({}) : setChangeNameErrorMessageDetails({});
                                    !showChangeNameMenu ?  setNameForm({...nameForm, name: ""}) : setNameForm({...nameForm, name: ""})
                                }
                            }  
                            className="change-btn"
                        >
                            {!showChangeNameMenu ? "Change" : "Cancel"}
                        </button>
                    </div>
                    {showChangeNameMenu
                        ?
                        <div className="change-menu">
                            <input 
                                ref={nameRef}
                                className="input input-name"
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="off"
                                onChange={NameChangeHandler}
                                placeholder={auth.userName}
                            />
                            <button 
                                onClick={nameChangeSubmitHandler}
                                disabled={loading ? true : false}
                            >
                            Change name
                            </button>
                            { 
                                JSON.stringify(changeNameErrorMessageDetails) === "{}"
                                ? 
                                    null
                                :
                                    <div className="error-details">
                                        * {changeNameErrorMessageDetails.details}
                                    </div>
                                
                            }
                        </div>
                        :
                        null
                    }
                    <div className="setting-wrapper">
                        <button 
                            onClick={() => 
                                {
                                    setShowChangePasswordMenu(!showChangePasswordMenu);
                                    showChangePasswordMenu ? setShowChangeNameMenu(false) : setShowChangeNameMenu(false);
                                    !showChangePasswordMenu ? setChangePasswordErrorMessageDetails({}) : setChangePasswordErrorMessageDetails({});
                                    !showChangePasswordMenu ?  setPasswordForm({...passwordForm, oldPassword: "", newPassword: ""}) : setPasswordForm({...passwordForm, oldPassword: "", newPassword: ""})
                                }
                            } 
                            className="change-btn"
                        >
                            {!showChangePasswordMenu ? "Change Password" : "Cancel"}
                        </button>
                    </div>
                    {showChangePasswordMenu
                        ?
                        <div className="change-menu">
                            <input 
                                ref={oldPasswordRef}
                                className="input input-old-password"
                                id="oldPassword"
                                name="oldPassword"
                                type="password"
                                autoComplete="off"
                                onChange={passwordChangeHandler}
                                placeholder="Input your old password"
                            />
                            <input 
                                ref={newPasswordRef}
                                className="input input-new-password"
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="off"
                                onChange={passwordChangeHandler}
                                placeholder="Input your new password"
                            />
                            <button 
                                onClick={passwordChangeSubmitHandler}
                                disabled={loading ? true : false}
                            >
                            Change it!
                            </button>
                            { JSON.stringify(changePasswordErrorMessageDetails) === "{}"
                                ? 
                                    null
                                :
                                    <div className="error-details">
                                        * {changePasswordErrorMessageDetails.details}
                                    </div>
                            }
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </>
    )
}