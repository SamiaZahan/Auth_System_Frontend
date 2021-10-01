import React from "react";
import { Link } from 'react-router-dom';

function SubNavbar() {
    return (
        <>
            <div className="container-fluid">
                <div className="row fst-normal" style={{background:"#139bea"}}>
                    <div className="col-md-12">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/section/2">
                                    Apple Deals
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/section/39">
                                    Holiday Deals 2021 | upto 80% Discount
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/section/1">
                                    Hot Deals | upto 25% OFF
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/section/3">
                                    Electronics &amp; Gadgets
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/section/5">
                                    Watches
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/section/6">
                                    Beauty &amp; Fragrance
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/section/4">
                                    Shoes
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/section/20">
                                    COVID | Local Items
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubNavbar;