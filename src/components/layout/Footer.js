import React from "react";
import {Link} from "react-router-dom";
import pay_with_filename from '../../assets/images/pay_with_filename_1611589671029.png';
import payment_methods from '../../assets/images/payment_methods_filename_1611589671029.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';



function Footer() {
    return (
        <>
            <footer style={{background: "#1F2021"}}>
                <div className="container pt-5">
                    <div className="row pt-5">
                        <div className="col-3 text-white">
                            <h3 className="footer-header">WHY AIRBRINGR?</h3>
                            <ul className="footer-widget" style={{'line-height': '30px'}}>
                                <li>100% authentic products from USA</li>
                                <li>Most reliable platform to shop abroad</li>
                                <li>Best USD conversion rate</li>
                                <li>Lowest service charge</li>
                                <li>Secured payment options</li>
                                <li>Dedicated customer support</li>
                                <li>100% money back warranty</li>
                            </ul>
                        </div>

                        <div className="col-3 text-white">
                            <h3 className="footer-header">CUSTOMER SUPPORT</h3>
                            <ul className="footer-widget list-unstyled" style={{'line-height': '30px'}}>
                                <li><Link to="/#faq" style={{'text-decoration': 'none', color: '#fff'}}>FAQ</Link></li>
                                <li><Link to="/#works" style={{'text-decoration': 'none', color: '#fff'}}>
                                    How to place order
                                </Link></li>
                                <li><Link
                                    to="/return-and-refund-policy#return-refund-header" style={{'text-decoration': 'none', color: '#fff'}}>Return &amp; Refund</Link>
                                </li>
                                <li><Link to="/return-and-refund-policy#warranty" style={{'text-decoration': 'none', color: '#fff'}}>Warranty</Link></li>
                                <li><Link to="/return-and-refund-policy#cancel" style={{'text-decoration': 'none', color: '#fff'}}>Cancellation policy</Link></li>
                            </ul>
                        </div>

                        <div className="col-3 text-white">
                            <h3 className="footer-header">QUICK LINKS</h3>
                            <ul className="footer-widget list-unstyled" style={{'line-height': '30px'}}>
                                <li>
                                    <Link to="/#about" style={{'text-decoration': 'none', color: '#fff'}}>About AirBringr</Link>
                                </li>
                                <li>
                                    <Link to="/travel" style={{'text-decoration': 'none', color: '#fff'}}>Travel with AirBringr</Link>
                                </li>
                                <li>
                                    <Link to="/terms-of-service#terms-of-service-header" style={{'text-decoration': 'none', color: '#fff'}}>Terms of service</Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy#privacy-policy-header" style={{'text-decoration': 'none', color: '#fff'}}>Privacy policy</Link>
                                </li>
                            </ul>

                        </div>

                        <div className="col-3 text-white">
                            <h3 className="footer-header">CONTACT INFO</h3>
                            <address className="footer-widget">
                                <strong> Hotline :</strong>
                                <br/>+8801841247008<br/>
                                <strong> Email :</strong>
                                <br/>support@airbringr.com<br/>
                                <strong> Address :</strong>
                                <br/>House 29, Road 121,<br/>
                                Gulshan 1, Dhaka 1212,<br/>
                                Bangladesh<br/><br/>
                            </address>
                            <h3 className="footer-header">CONNECT WITH US</h3>
                            <div className="hstack gap-3 fs-1">
                                <div>
                                    <a href="https://www.facebook.com/Linkirbringr/" target="_blank" rel="noreferrer" style={{'text-decoration': 'none', color: '#fff'}}>
                                        <FontAwesomeIcon icon={faFacebookSquare} />
                                    </a>
                                </div>
                                <div>
                                    <a href="https://www.youtube.com/channel/UCkZ89G0-AMy45O93mDWuEHw" target="_blank" rel="noreferrer" style={{'text-decoration': 'none', color: '#fff'}}>
                                        <FontAwesomeIcon icon={faYoutubeSquare} />
                                    </a>
                                </div>
                                <div>
                                    <a href="https://www.instagram.com/Linkir.bringr/" target="_blank" rel="noreferrer" style={{'text-decoration': 'none', color: '#fff'}}>
                                        <FontAwesomeIcon icon={faInstagramSquare} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <img alt="01"
                                src={pay_with_filename}
                                style={{width: '100%', height:'auto'}}/>
                        </div>
                    </div>
                </div>

                <div className="container-fluid" style={{background: "#161718", 'font-size': '12px'}}>
                    <div className="row pt-3">
                        <div className="col-lg-6 text-start text-muted">
                            <p>&copy; 2021 AirBringr. All rights reserved.</p>
                        </div>
                        <div className="col-lg-6 text-end text-muted">
                            <p>Payment Methods: &nbsp;
                                <span>
                                    <img alt="02" src={payment_methods} style={{width:'165px', height:'31px'}}/>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;