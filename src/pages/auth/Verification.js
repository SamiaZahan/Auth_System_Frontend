import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../../constants/ApiConstants";
import {queries} from "@testing-library/react";

function Verification(props) {
    let q = new URLSearchParams(window.location.search)
    let qAuth = q.get("auth")
    let qOtp = parseInt(q.get("otp"))
    const [data] = useState({auth: qAuth, otp: qOtp})
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [showVerificationForm, setShowVerificationForm] = useState(false)
    const [showOtpSubmissionForm, setShowOtpSubmissionForm] = useState(false)

    const Verification = () => {
        const data1 = {auth: data.auth, otp: data.otp};
        axios.post(API_BASE_URL + '/v1/verify-email', data1)
            .then((result) => {
                console.log("dfsvfd", result)
                setMessage(result.data.message)
                setShowVerificationForm(true)
            })
            .catch((error) => {
                console.log("eroor message check ....", error.response)
                setMessage(error.response.data.message)
            })
            .finally(() => setIsLoading(false))
    }
    useEffect(() => {
        Verification()
    }, [false])

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
                console.log(response.data)
            })
            .catch(function (error) {
                alert(error.response.data.message.toUpperCase());
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
                setShowVerificationForm(false)
                setShowOtpSubmissionForm(false)
                console.log(response.data)
            })
            .catch(function (error) {
                alert(error.response.data.message.toUpperCase());
            });

    }


    return (
        <>
            <div id="airbringr-background" className="container-fluid">
                <div className="row justify-content-center">
                    <div id="myform" className="col-4 mt-5 p-5 alert-success mb-5 text-center"
                         style={{background: "#ffffff"}}>
                        {isLoading ? "Loading" :
                            <div className="alert alert-success p-2 text-center" role="alert">
                                {message.toUpperCase()}
                            </div>
                        }

                        <div className="pt-4 text-center" style={{background: "#ffffff"}}>
                            {showVerificationForm ?
                                <form onSubmit={sendOTP}>
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="phone"
                                               placeholder="Enter phone" onChange={e => setMobile(e.target.value)}/>
                                    </div>
                                    <button className="btn mt-3 btn-block text-white text-uppercase" type="submit"
                                            style={{background: "#1ba7f9"}}>Submit</button>
                                </form>
                                : ""}
                        </div>
                        <div className="pt-2 text-center" style={{background: "#ffffff"}}>
                            {showOtpSubmissionForm ?
                                <form onSubmit={verifyMobile}>
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="otp"
                                               placeholder="Enter OTP" onChange={e => setOtp(e.target.value)}/>
                                    </div>
                                    <button className="btn btn-block text-white text-uppercase" type="submit"
                                            style={{background: "#1ba7f9"}}>Submit</button>
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