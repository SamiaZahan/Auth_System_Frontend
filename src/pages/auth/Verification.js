import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../../constants/ApiConstants";

function Verification() {
    const history = useHistory();
    let q = new URLSearchParams(window.location.search)
    let qAuth = q.get("auth")
    let qOtp = parseInt(q.get("otp"))
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [showVerificationForm, setShowVerificationForm] = useState(false)
    const [showOtpSubmissionForm, setShowOtpSubmissionForm] = useState(false)
    const [isLoginButtonShowing, setIsLoginButtonShowing] = useState(false)

    useEffect(() => {
        const Verification = () => {
            const verifyEmailData = {auth:qAuth, otp: qOtp};
            axios.post(API_BASE_URL + '/v1/verify-email', verifyEmailData)
                .then((result) => {
                    setShowVerificationForm(true)
                    setSuccessMessage(result.data.message)
                    setIsSuccessMessage(true)
                    setIsErrorMessage(false)
                })
                .catch(function (error) {
                    console.log("error check", error.response.data)
                    setErrorMessage(error.response.data.message);
                    setIsErrorMessage(true)
                    setIsSuccessMessage(false)
                })
        }
        Verification()
    }, [qAuth, qOtp])

    const [mobile, setMobile] = useState("")
    const [otp, setOtp] = useState("")

    const sendOTP = (e) => {
        e.preventDefault()

        if (mobile === "") {
            alert("Please input the mobile number")
        }

        axios.post(API_BASE_URL + "/v1/send-mobile-verification-otp", {mobile})
            .then(function (response) {
                setShowVerificationForm(false)
                setShowOtpSubmissionForm(true)
                setSuccessMessage(response.data.message)
                setIsSuccessMessage(true)
                setIsErrorMessage(false)
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message);
                setIsErrorMessage(true)
                setIsSuccessMessage(false)
            });

    }

    const verifyMobile = (e) => {
        e.preventDefault()

        if (mobile === "") {
            alert("Please input the mobile number")
        }

        if (otp === "") {
            alert("Please input the OTP")
        }

        axios.post(API_BASE_URL + "/v1/verify-mobile", {mobile, otp: parseInt(otp), auth: qAuth})
            .then(function (response) {
                console.log("verify message", response.data)
                setShowVerificationForm(false)
                setShowOtpSubmissionForm(false)
                setSuccessMessage(response.data.message)
                setIsSuccessMessage(true)
                setIsLoginButtonShowing(true)
                setIsErrorMessage(false)
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message);
                setIsErrorMessage(true)
                setIsSuccessMessage(false)
                setIsLoginButtonShowing(false)
            });

    }
    const goToLogin = (e) => {
        e.preventDefault()
        history.push('/login')
    }


    return (
        <>
            <div id="airbringr-background" className="container-fluid">
                <div className="row justify-content-center">
                    <div id="myform" className="col-lg-4 col-md-6 col-sm-6 mt-5 p-4 alert-success mb-5 text-center"
                         style={{background: "#ffffff"}}>
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
                            {showVerificationForm ?
                                <form onSubmit={sendOTP} className="mt-5">
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="phone"
                                               placeholder="Enter phone" onChange={e => setMobile(e.target.value)}/>
                                    </div>
                                    <button className="btn mt-4 btn-block text-white text-uppercase" type="submit"
                                            style={{background: "#1ba7f9"}}>Send OTP</button>
                                </form>
                                : ""}
                        </div>
                        <div className="text-center" style={{background: "#ffffff"}}>
                            {showOtpSubmissionForm ?
                                <form onSubmit={verifyMobile} className="mt-5">
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="otp"
                                               placeholder="Enter OTP" onChange={e => setOtp(e.target.value)}/>
                                    </div>
                                    <button className="btn btn-block text-white mt-4 text-uppercase" type="submit"
                                            style={{background: "#1ba7f9"}}>Verify Mobile Number</button>
                                </form>
                                : ""}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Verification;