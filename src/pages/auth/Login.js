import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL, LEGACY_WEBSITE_URL} from "../../constants/ApiConstants";

function Login() {
    const isPhone = (value) => {
        const phoneFormat = /^[0-9]+$/;
        return (phoneFormat.test(value) && (value.length === 11));
    }
    const isEmail = (value) => {
        const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return mailFormat.test(value);
    }
    const [phoneNumber, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [otp, setOtp] = useState("")
    const [otpSent] = useState(false)

    const submitPhoneNumber = (e) => {
        e.preventDefault();
        if (isPhone(phoneNumber)) {
            if (isPhone(phoneNumber)) {
                axios.post(API_BASE_URL + '/v1/send-sms-otp', {mobile: phoneNumber})
                    .then((r) => {
                        setSuccessMessage(r.data.message);
                        setIsSuccessMessage(true)
                        setIsErrorMessage(false)
                        window.location = LEGACY_WEBSITE_URL + '/verify-otp/?email_or_mobile=' + phoneNumber
                    })
                    .catch(err => {
                        setErrorMessage(err.response.data.message)
                        setIsErrorMessage(true)
                        setIsSuccessMessage(false)
                    })
            }
            if (isEmail(email)) {
                setSuccessMessage("We have e-mailed an OPT.");
            }
            setErrMessage("");
        } else {
            if (/^[0-9]+$/.test(phoneNumber[0])) {
                if (!isPhone(phoneNumber)) {
                    setErrMessage("Enter valid phone number");
                }
            } else if (/^[a-z]+$/.test(email[0].toLowerCase())) {
                if (!isEmail(email)) {
                    setErrMessage("Enter valid email");
                }
            } else {
                setErrMessage("Email format or Phone number is not valid");
            }

        }
    }

    const submitOtpForPhoneNumber = (e) => {
        e.preventDefault()
        if (otp === "") {
            alert('Please input OTP')
        }

        axios.post(LEGACY_WEBSITE_URL + '/verify-phone', {phone: phoneNumber, otp: parseInt(otp)})
            .then((r) => {
                setSuccessMessage(r.data.message);
                setIsSuccessMessage(true)
                setIsErrorMessage(false)
                window.location = LEGACY_WEBSITE_URL
            })
            .catch(err => {
                setErrorMessage("NOT OK")
                setIsErrorMessage(true)
                setIsSuccessMessage(false)
            })
    }

    const submitEmail = (e) => {
        e.preventDefault();
        if (isEmail(email)) {
            axios.post(API_BASE_URL + '/v1/send-email-otp', {email: email})
                .then((r) => {
                    setSuccessMessage(r.data.message);
                    setIsSuccessMessage(true)
                    setIsErrorMessage(false)
                    window.location = LEGACY_WEBSITE_URL + '/verify-otp/?email_or_mobile=' + email
                })
                .catch(err => {
                    setErrorMessage(err.response.data.message)
                    setIsErrorMessage(true)
                    setIsSuccessMessage(false)
                })
        } else {
            if (/^[0-9]+$/.test(phoneNumber[0])) {
                if (/^[a-z]+$/.test(email[0].toLowerCase())) {
                    if (!isEmail(email)) {
                        setErrMessage("Enter valid email");
                    }
                } else {
                    setErrMessage("Email format or Phone number is not valid");
                }

            }
        }
    }

    const submitOtpForEmail = (e) => {
        e.preventDefault()
        if (otp === "") {
            alert('Please input OTP')
        }

        axios.post(LEGACY_WEBSITE_URL + '/verify-email', {email: email, otp: parseInt(otp)})
            .then((r) => {
                setSuccessMessage(r.data.message);
                setIsSuccessMessage(true)
                setIsErrorMessage(false)
                window.location = LEGACY_WEBSITE_URL
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
                                <h5 id="form-header" className="mt-3 mb-3">Sign in with Mobile Number or Email</h5>
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
                            <ul className="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
                                <li style={{width: "50%"}} className="nav-item" role="presentation">
                                    <button style={{width: "100%"}} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-home" type="button" role="tab"
                                            aria-controls="pills-home" aria-selected="true">Mobile Number
                                    </button>
                                </li>
                                <li style={{width: "50%"}} className="nav-item" role="presentation">
                                    <button style={{width: "100%"}} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-profile" type="button" role="tab"
                                            aria-controls="pills-profile" aria-selected="false">Email
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                     aria-labelledby="pills-home-tab">
                                    {!otpSent &&
                                    <form onSubmit={submitPhoneNumber}>
                                        <div className="form-group">
                                            <label className="text-capitalize" htmlFor="name">Mobile number <span
                                                style={{color: "red"}}>*</span></label>
                                            <input
                                                type="number" className="form-control"
                                                id="emailOrPhone"
                                                onChange={e => setPhone(e.target.value)}
                                                required autoFocus autoComplete='off'
                                            />
                                            <div className="text-danger">{errMessage}</div>
                                        </div>

                                        <div className="d-grid gap-2 mt-4 fst-normal"
                                             style={{"font-size": ".1rem"}}>
                                            <button className="btn btn-block btn-custom text-white text-uppercase"
                                                    type="submit"
                                                    style={{background: "#1ba7f9"}}>
                                                Send OTP
                                            </button>
                                        </div>
                                    </form>}

                                    {otpSent &&
                                    <form onSubmit={submitOtpForPhoneNumber}>
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

                                        <div className="d-grid gap-2 mt-4 fst-normal"
                                             style={{"font-size": ".1rem"}}>
                                            <button className="btn btn-custom btn-block text-white text-uppercase"
                                                    type="submit"
                                                    style={{background: "#1ba7f9"}}>
                                                Send OTP
                                            </button>
                                        </div>
                                    </form>}
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                                     aria-labelledby="pills-profile-tab">
                                    {!otpSent &&
                                    <form onSubmit={submitEmail}>
                                        <div className="form-group">
                                            <label className="text-capitalize" htmlFor="name">Email <span
                                                style={{color: "red"}}>*</span></label>
                                            <input
                                                type="email" className="form-control"
                                                id="emailOrPhone"
                                                onChange={e => setEmail(e.target.value)}
                                                required autoFocus autoComplete='off'
                                            />
                                            <div className="text-danger">{errMessage}</div>
                                        </div>

                                        <div className="d-grid gap-2 mt-4 fst-normal"
                                             style={{"font-size": ".1rem"}}>
                                            <button className="btn btn-block btn-custom text-white text-uppercase"
                                                    type="submit"
                                                    style={{background: "#1ba7f9"}}>
                                                Send OTP
                                            </button>
                                        </div>
                                    </form>}

                                    {otpSent &&
                                    <form onSubmit={submitOtpForEmail}>
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

                                        <div className="d-grid gap-2 mt-4 fst-normal"
                                             style={{"font-size": ".1rem"}}>
                                            <button className="btn btn-custom btn-block text-white text-uppercase"
                                                    type="submit"
                                                    style={{background: "#1ba7f9"}}>
                                                Send OTP
                                            </button>
                                        </div>
                                    </form>}
                                </div>
                            </div>

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