import React from "react";
import {Link} from 'react-router-dom';
import {LEGACY_WEBSITE_URL} from "../../constants/ApiConstants";

function Navbar() {
    const goToHome = (e) => {
        e.preventDefault()
        window.location = LEGACY_WEBSITE_URL
    }
    return (
        <>
            <nav className="py-2 sticky-top" style={{background: "#28aefc"}} aria-label="Secondary navigation">
                <div className="container-fluid d-flex align-items-md-center"
                     style={{height: "54px", padding: "8px 16px"}}>
                    <div>
                        <Link className="navbar-brand mx-3" onClick={goToHome}>
                            <img className="img-fluid" style={{width: "7.5rem"}}
                                 src="https://airbringr-assets.s3-ap-southeast-1.amazonaws.com/brandpanel/logo/1611564466122-white.png"
                                 alt=""/>
                        </Link>
                    </div>
                    <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
                        <li className="nav-item col-6 col-md-auto">
                            <a target="_blank" rel="noreferrer" className="btn btn-sm mt-1 text-white" style={{background: "#14567d"}} href="https://www.youtube.com/embed/XWhLVlm8FcA">
                                How to Order
                            </a>
                        </li>
                        <li className="nav-item col-6 col-md-auto">
                            <Link className="nav-link p-2 text-white" to="/register">
                                Sing Up
                            </Link>
                        </li>
                        <li className="nav-item col-6 col-md-auto">
                            <Link className="nav-link p-2 text-white" to="/login">
                                Sing In
                            </Link>
                        </li>
                    </ul>
                    <a className="btn  mx-2 text-white"
                       href="#faq">FQA</a>
                </div>
            </nav>
        </>
    );
}

export default Navbar;

