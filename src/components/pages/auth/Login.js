import React, {useState} from "react";
import {Link} from "react-router-dom";

function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const [message, setMessage] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        if (isPhone(emailOrPhone) || isEmail(emailOrPhone)){
            console.log("Login info (email or Phone): "+ emailOrPhone);
            setEmailOrPhone('');
            if(isPhone(emailOrPhone)){
                setMessage("We have messaged an OTP.");
            }
            if(isEmail(emailOrPhone)){
                setMessage("We have e-mailed an OPT.");
            }
            setErrMessage("");
        }else {
            if(/^[0-9]+$/.test(emailOrPhone[0])){
                if(!isPhone(emailOrPhone)){
                    setErrMessage("Enter valid phone number");
                    setMessage('');
                }
            }else if(/^[a-z]+$/.test(emailOrPhone[0].toLowerCase())){
                if(!isEmail(emailOrPhone)){
                    setErrMessage("Enter valid email");
                    setMessage('');
                }
            }else {
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
    return (
        <>
            <div id="airbringr-background" className="container-fluid">
                <div className="row justify-content-center">
                    <div  id="myform" className="col-3 mt-5 mb-5 rounded" style={{background: "#ffffff"}}>
                        <form className="p-2" method="POST" onSubmit={submitForm} id="register" action="">
                            <div>
                                <h5 id="form-header" className="mt-3">Sign In to continue</h5>
                            </div>
                            {message &&
                            <div className="alert alert-success m-1 p-1 text-center" role="alert">
                                {message}
                            </div>
                            }
                            <div className="d-grid gap-2 mt-4">
                                <Link to="https://airbringr.com/auth/facebook"
                                   className="btn btn-block text-white" style={{background: "#4569ad"}}>
                                    <i className="fab fa-facebook-f"></i>
                                    Sign Up with Facebook
                                </Link>
                            </div>

                            <div className="text-center">
                                or
                            </div>
                            <input type="hidden" name="_token" value="PEIP57hzoSsKlaDUymJScvE8dsV0tG7rZHE81YGM"/>

                            <input type="hidden" id="_signup_as" name="_signup_as" value=""/>

                            <div className="form-group mb-3">
                                <label htmlFor="name">Email address or Phone number *</label>
                                <input
                                    type="text" className="form-control"
                                    id="emailOrPhone" name="emailOrPhone"
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                    required autoFocus autoComplete='off'
                                />
                                <div className="text-danger">{errMessage}</div>
                            </div>
                            <div className="form-check text-left">
                                <input className="form-check-input" type="checkbox"
                                       name="remember" id="remember"/>
                                <label className="form-check-label" htmlFor="remember">
                                    Remember Me
                                </label>
                            </div>

                            <div className="d-grid gap-2 mt-4 fst-normal" style={{"font-size": ".1rem"}}>
                                <button className="btn btn-block text-white text-uppercase" style={{background: "#1ba7f9"}}>
                                    Sign In
                                </button>
                            </div>

                            <div className="d-grid gap-2 mt-4 fst-normal">
                                <Link to="/register"
                                   className="btn btn-block text-white border-1 border-secondary text-muted text-uppercase"
                                   style={{background: "#eceef0"}}>
                                    Not an user? Sign Up
                                </Link>
                            </div>
                            <div className="d-grid gap-2 mt-2 mb-3">
                                <Link to="/reset" className="btn btn-block text-muted text-center fst-normal" >
                                    Forgot Your Password?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;