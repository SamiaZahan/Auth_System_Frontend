import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL, LEGACY_WEBSITE_URL} from "../../constants/ApiConstants";

function Login() {
    console.log(LEGACY_WEBSITE_URL)
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [message, setMessage] = useState('');
    const [otpSent, setOtpSent] = useState(false)

    const submitForm = (e) => {
        e.preventDefault();
        if (isPhone(emailOrPhone) || isEmail(emailOrPhone)) {
            console.log("Login info (email or Phone): " + emailOrPhone);

            if (isPhone(emailOrPhone)) {
                axios.post(API_BASE_URL + '/v1/send-sms-otp', {mobile: emailOrPhone})
                    .then((r) => {
                        setMessage(r.data.message);
                        window.location = "https://airbringr.dev/verify-otp/?phone=" + emailOrPhone
                    })
                    .catch(e => {
                        setMessage(e.response.data.message)
                    })
            }
            if (isEmail(emailOrPhone)) {
                setMessage("We have e-mailed an OPT.");
            }
            setErrMessage("");
        } else {
            if (/^[0-9]+$/.test(emailOrPhone[0])) {
                if (!isPhone(emailOrPhone)) {
                    setErrMessage("Enter valid phone number");
                    setMessage('');
                }
            } else if (/^[a-z]+$/.test(emailOrPhone[0].toLowerCase())) {
                if (!isEmail(emailOrPhone)) {
                    setErrMessage("Enter valid email");
                    setMessage('');
                }
            } else {
                setErrMessage("Email format or Phone number is not valid");
                setMessage('');
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

        axios.post('https://airbringr.dev/verify-phone', {phone: emailOrPhone, otp: parseInt(otp)})
            .then((r) => {
                setMessage(r.data.message);
                window.location = "https://airbringr.dev"
            })
            .catch(err => {
                setMessage("NO OK")
            })
    }

    return (
        <>
            <div id="airbringr-background" className="container-fluid">
                <div className="row justify-content-center">
                    <div id="myform" className="col-3 mt-5 mb-5 rounded" style={{background: "#ffffff"}}>
                        <div>
                            <h5 id="form-header" className="mt-3">Sign In to continue</h5>
                        </div>
                        {message &&
                        <div className="alert alert-success m-1 p-1 text-center" role="alert">
                            {message}
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

                        {!otpSent && <form onSubmit={submitForm}>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Phone number *</label>
                                <input
                                    type="text" className="form-control"
                                    id="emailOrPhone"
                                    onChange={e => setEmailOrPhone(e.target.value)}
                                    required autoFocus autoComplete='off'
                                />
                                <div className="text-danger">{errMessage}</div>
                            </div>

                            <div className="d-grid gap-2 mt-4 fst-normal" style={{"font-size": ".1rem"}}>
                                <button className="btn btn-block text-white text-uppercase" type="submit"
                                        style={{background: "#1ba7f9"}}>
                                    Send OTP
                                </button>
                            </div>
                        </form>}

                        {otpSent && <form onSubmit={submitOtp}>
                            <div className="form-group mb-3">
                                <label htmlFor="name">OTP *</label>
                                <input
                                    type="number" className="form-control"
                                    id="otp"
                                    onChange={(e) => setOtp(e.target.value)}
                                    required autoFocus autoComplete='off'
                                />
                                <div className="text-danger">{errMessage}</div>
                            </div>

                            <div className="d-grid gap-2 mt-4 fst-normal" style={{"font-size": ".1rem"}}>
                                <button className="btn btn-block text-white text-uppercase" type="submit"
                                        style={{background: "#1ba7f9"}}>
                                    Send OTP
                                </button>
                            </div>
                        </form>}

                        <div className="d-grid gap-2 mt-4 mb-4 fst-normal">
                            <Link to="/register"
                                  className="btn btn-block text-white border-1 border-secondary text-muted text-uppercase"
                                  style={{background: "#eceef0"}}>
                                Not an user? Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;