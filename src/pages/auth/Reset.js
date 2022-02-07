import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../../constants/ApiConstants";

function Reset() {
    const history = useHistory();
    let q = new URLSearchParams(window.location.search)
    let qAuth = q.get("auth")
    let qOtp = parseInt(q.get("otp"))
    const [email, setEmail] = useState("");
    const [password,setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [showEmailInputForm, setShowEmailInputForm] = useState(false)
    const [showPassResetForm, setShowPassResetForm] = useState(false)
    const [isLoginButtonShowing, setIsLoginButtonShowing] = useState(false)


    useEffect(() => {
        const Verification = () => {
            if (qAuth === null && successMessage === null && errorMessage === null){
                setShowEmailInputForm(true)
                setShowPassResetForm(false)
            }
            else{
            const verifyEmailData = {auth:qAuth, otp: qOtp};
            axios.post(API_BASE_URL + '/v1/verify-email', verifyEmailData)
                .then((result) => {
                    setShowEmailInputForm(false)
                    setShowPassResetForm(true)
                    setIsSuccessMessage(true)
                    setIsErrorMessage(false)
                })
                .catch(function (error) {
                    setShowEmailInputForm(false)
                    setShowPassResetForm(false)
                    setErrorMessage("Email Verification failed".toUpperCase());
                    setIsErrorMessage(true)
                    setIsSuccessMessage(false)
                })
        }
    }
        Verification()
    }, [qAuth, qOtp])


    const submitEmailInputForm = (e) => {
        e.preventDefault();
        if (isEmail(email)) {
            axios.post(API_BASE_URL + "/v1/password-reset-email-link", {email})
            .then(function (response) {
                setShowEmailInputForm(false)
                setSuccessMessage(response.data.message.toUpperCase())
                setIsSuccessMessage(true)
                setIsErrorMessage(false)
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message.toUpperCase());
                setIsErrorMessage(true)
                setIsSuccessMessage(false)
            });
        } else {
            setErrorMessage("INPUT A VALID EMAIL");
            setIsErrorMessage(true)
            setIsSuccessMessage(false)
        }
    }
    const submitPassResetForm= (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            axios.post(API_BASE_URL + "/v1/password-reset", {auth:qAuth, password: password})
            .then(function (response) {
                setShowEmailInputForm(false)
                setShowPassResetForm(false)
                setSuccessMessage(response.data.message.toUpperCase())
                setIsSuccessMessage(true)
                setIsLoginButtonShowing(true)
                setIsErrorMessage(false)
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message.toUpperCase());
                setIsErrorMessage(true)
                setIsSuccessMessage(false)
                setIsLoginButtonShowing(false)

            });
        } else {
            setErrorMessage("Password and confirm password didn't match".toUpperCase());
            setIsErrorMessage(true)
            setIsSuccessMessage(false)
        }
    }
 
   
    const isEmail = (value) => {
        const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return mailFormat.test(value);
    }
    const goToLogin = (e) => {
        e.preventDefault()
        history.push('/login')
    }

    return (
            <div id="airbringr-background" className="container-fluid">
                <div className="row justify-content-center">
                    <div id="myform" className="col-lg-4 col-md-6 col-sm-6 mt-5 p-4 alert-success mb-5 text-center"
                         style={{background: "#ffffff"}}>   
                    <div>
                        <h5 id="form-header" className="mt-3">
                            Reset Password
                        </h5>
                    </div>                 
                    { successMessage && isSuccessMessage &&
                        <div>
                            <div className="alert alert-success p-2 m-0 text-center" role="alert">
                                {successMessage.toUpperCase()}
                            </div>
                        </div>
                    }
                    {errorMessage && isErrorMessage &&
                        <div className="alert alert-danger p-2 m-0 text-center" role="alert">
                            {errorMessage.toUpperCase()}
                        </div>
                    }
                    { isLoginButtonShowing &&
                        <button onClick={goToLogin} className="btn btn-block text-white mt-4 text-uppercase" type="submit"
                                style={{background: "#1ba7f9"}}>NOW LOGIN</button>
                    }
                    
                    <div className="text-center" style={{background: "#ffffff"}}>
                        {showEmailInputForm ?
                            <form className="p-2" method="POST" onSubmit={submitEmailInputForm} id="register" action="">
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Email address*</label>
                                    <input
                                        type="email" className="form-control"
                                        id="email" name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoFocus required autoComplete="off"
                                    />
                                </div>


                                <div className="d-grid gap-2 mt-4 fst-normal" style={{"font-size": ".1rem"}}>
                                    <button className="btn btn-block text-white text-uppercase"
                                            style={{background: "#1ba7f9"}}>
                                        Send Password Reset Link
                                    </button>
                                </div>
                            </form>
                        : ""}
                    </div>
                    <div className="text-center" style={{background: "#ffffff"}}>
                        {showPassResetForm ?
                            <form className="p-2" method="POST" onSubmit={submitPassResetForm} id="register" action="">
                            <div className="form-group mb-3">
                                    <label className="text-capitalize" htmlFor="name">Password<span
                                            style={{color: "red"}}>*</span></label>
                                        <input
                                            type="password" className="form-control"
                                            id="password"
                                            onChange={e => setPassword(e.target.value)}
                                            required autoFocus autoComplete='off'
                                        />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="text-capitalize" htmlFor="name">Confirm Password<span
                                            style={{color: "red"}}>*</span></label>
                                        <input
                                            type="password" className="form-control"
                                            id="password"
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required autoFocus autoComplete='off'
                                        />
                                </div>

                                <div className="d-grid gap-2 mt-4 fst-normal" style={{"font-size": ".1rem"}}>
                                    <button className="btn btn-block text-white text-uppercase"
                                            style={{background: "#1ba7f9"}}>
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reset;