import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL, LEGACY_WEBSITE_URL} from "../../constants/ApiConstants";

function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [otpSent] = useState(false)

    const submitForm = (e) => {
        e.preventDefault();
        if (isPhone(emailOrPhone) || isEmail(emailOrPhone)) {
            if (isPhone(emailOrPhone)) {
                axios.post(API_BASE_URL + '/v1/send-sms-otp', {mobile: emailOrPhone})
                    .then((r) => {
                        setSuccessMessage(r.data.message);
                        setIsSuccessMessage(true)
                        setIsErrorMessage(false)
                        window.location = LEGACY_WEBSITE_URL + '/verify-otp/?phone=' + emailOrPhone
                    })
                    .catch(err => {
                        setErrorMessage(err.response.data.message)
                        setIsErrorMessage(true)
                        setIsSuccessMessage(false)
                    })
            }
            if (isEmail(emailOrPhone)) {
                setSuccessMessage("We have e-mailed an OPT.");
            }
            setErrMessage("");
        } else {
            if (/^[0-9]+$/.test(emailOrPhone[0])) {
                if (!isPhone(emailOrPhone)) {
                    setErrMessage("Enter valid phone number");
                }
            } else if (/^[a-z]+$/.test(emailOrPhone[0].toLowerCase())) {
                if (!isEmail(emailOrPhone)) {
                    setErrMessage("Enter valid email");
                }
            } else {
                setErrMessage("Email format or Phone number is not valid");
            }

        }
    }
    const isPhone = (value) => {
        const phoneFormat = /^[0-9]+$/;
        return (phoneFormat.test(value) && (value.length === 11));
    }
    const isEmail = (value) => {
        const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return mailFormat.test(value);
    }

    const [otp, setOtp] = useState("")
    const submitOtp = (e) => {
        e.preventDefault()
        if (otp === "") {
            alert('Please input OTP')
        }

        axios.post(LEGACY_WEBSITE_URL + '/verify-phone', {phone: emailOrPhone, otp: parseInt(otp)})
            .then((r) => {
                setSuccessMessage(r.data.message);
                setIsSuccessMessage(true)
                setIsErrorMessage(false)
                window.location =  LEGACY_WEBSITE_URL
            })
            .catch(err => {
                setErrorMessage("NOT OK")
                setIsErrorMessage(true)
                setIsSuccessMessage(false)
            })
    }

    return (
        <>
            <section id="airbringr-background">
                <div className="container">
                    <div className="row justify-content-center">
                        <div id="myform" className="col-lg-4 col-md-6 col-sm-6 mt-5 mb-5 p-4 pt-3 pb-3 rounded"
                             style={{background: "#ffffff"}}>
                            <div>
                                <h5 id="form-header" className="mt-3 mb-3">Sign In to continue</h5>
                            </div>
                            {successMessage && isSuccessMessage &&
                            <div className="alert alert-success m-1 p-1 text-center" role="alert">
                                {successMessage}
                            </div>
                            }
                            {errorMessage && isErrorMessage &&
                            <div className="alert alert-danger m-1 p-1 text-center" role="alert">
                                {errorMessage}
                            </div>
                            }
                            {/*<div className="d-grid gap-2 mt-4">
                                <Link to="https://airbringr.com/auth/facebook"
                                   className="btn btn-block text-white" style={{background: "#4569ad"}}>
                                    <i className="fab fa-facebook-f"></i>
                                    Sign Up with Facebook
                                </Link>
                            </div>*/}

                            {/*<div className="text-center">
                                or
                            </div>*/}

                            {!otpSent &&
                            <form onSubmit={submitForm}>
                                <div className="form-group">
                                    <label htmlFor="name">Phone number <span style={{color: "red"}}>*</span></label>
                                    <input
                                        type="text" className="form-control"
                                        id="emailOrPhone"
                                        onChange={e => setEmailOrPhone(e.target.value)}
                                        required autoFocus autoComplete='off'
                                    />
                                    <div className="text-danger">{errMessage}</div>
                                </div>

                                <div className="d-grid gap-2 mt-4 fst-normal" style={{"font-size": ".1rem"}}>
                                    <button className="btn btn-block btn-custom text-white text-uppercase" type="submit"
                                            style={{background: "#1ba7f9"}}>
                                        Send OTP
                                    </button>
                                </div>
                            </form>}

                            {otpSent &&
                            <form onSubmit={submitOtp}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">OTP <span style={{color: "red"}}>*</span></label>
                                    <input
                                        type="number" className="form-control"
                                        id="otp"
                                        onChange={(e) => setOtp(e.target.value)}
                                        required autoFocus autoComplete='off'
                                    />
                                    <div className="text-danger">{errMessage}</div>
                                </div>

                                <div className="d-grid gap-2 mt-4 fst-normal" style={{"font-size": ".1rem"}}>
                                    <button className="btn btn-custom btn-block text-white text-uppercase" type="submit"
                                            style={{background: "#1ba7f9"}}>
                                        Send OTP
                                    </button>
                                </div>
                            </form>}

                            <div className="d-grid gap-2  mt-4 mb-4 fst-normal">
                                <Link to="/register"
                                      className="btn btn-block btn-custom text-white border-1 border-secondary text-muted text-uppercase"
                                      style={{background: "#eceef0"}}>
                                    Not an user? Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;