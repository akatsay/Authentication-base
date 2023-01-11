import React from "react"

import "../styles/footer.css"

export const Footer = () => {

    return (
        <>
            <div className="footer">
                <p className="author">Created by akatsay <span className="smile">🙃</span></p>
                <i 
                    className="fa-brands fa-github grow" 
                    onClick={() => {
                        window.open('https://github.com/akatsay/Authentication-base', '_blank');
                    }}
                >
                </i>
                <p className="pustishka">Created by akatsay🙃</p>
            </div>
        </>
    )
}