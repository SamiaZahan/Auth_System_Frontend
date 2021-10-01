import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="py-2 sticky-top" style={{background: "#28aefc"}} aria-label="Secondary navigation">
                <div className="container-fluid d-flex align-items-md-center" style={{height:"54px", padding:"8px 16px"}}>
                    <div>
                        <Link className="navbar-brand mx-3" to="/">
                            <img className="img-fluid" style={{width: "7.5rem"}}
                                 src="https://airbringr-assets.s3-ap-southeast-1.amazonaws.com/brandpanel/logo/1611564466122-white.png"
                                 alt=""/>
                        </Link>
                    </div>
                    <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
                        <li className="nav-item col-6 col-md-auto">
                            <a className="btn btn-sm mt-1 text-white" style={{background: "#14567d"}} href="#">
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
                       href="#">FQA</a>
                </div>
            </nav>
        </>
    );
}

export default Navbar;

