import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [errName, setErrName] = useState('');

    const [email, setEmail] = useState("");
    const [errEmail, setErrEmail] = useState('');
    const [message, setMessage] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        if (!isName(name)) {
            setErrName("Full name length minimum 6 chars");
        }
        if (!isEmail(email)) {
            setErrEmail("Please valid email.");
        }
        if (isName(name) && isEmail(email)) {
            console.log("User name: " + name);
            console.log("User email: " + email);
            setName('');
            setEmail('');
            setErrName('');
            setErrEmail('');
            setMessage("We have e-mailed an OTP.");
        }
    }
    const isName = (value) => {
        return (value.length > 5);
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
                                <h5 id="form-header" className="mt-3">Sign Up to continue</h5>
                            </div>
                            {message &&
                            <div className="alert alert-success m-1 p-1 text-center" role="alert">
                                {message}
                            </div>
                            }
                            <div className="d-grid gap-2 mt-4">
                                <a href="https://airbringr.com/auth/facebook"
                                   className="btn btn-block text-white" style={{background: "#4569ad"}}>
                                    <i className="fab fa-facebook-f"></i>
                                    Sign Up with Facebook
                                </a>
                            </div>

                            <div className="text-center">
                                or
                            </div>
                            <input type="hidden" name="_token" value="PEIP57hzoSsKlaDUymJScvE8dsV0tG7rZHE81YGM"/>

                            <input type="hidden" id="_signup_as" name="_signup_as" value=""/>

                            <div className="form-group mb-3">
                                <label htmlFor="name">Full name *</label>
                                <input
                                    type="text" className="form-control"
                                    id="name" name="name" autoComplete="off"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required autoFocus
                                />
                                <div className="text-danger">{errName}</div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email address *</label>
                                <input
                                    type="email" className="form-control"
                                    id="email" name="email" autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="text-danger">{errEmail}</div>
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button className="btn btn-block text-white text-uppercase" style={{background: "#1ba7f9"}}>
                                    Sign Up
                                </button>
                            </div>

                            <div className="d-grid gap-2 mt-4 mb-3">
                                <Link to="/login"
                                   className="btn btn-block text-white border-1 border-secondary text-muted text-uppercase"
                                   style={{background: "#eceef0"}}>
                                    Existing user? Sign In
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;