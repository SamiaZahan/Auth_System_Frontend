import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../../constants/ApiConstants";

function VerifyAndEditEmail() {
    const history = useHistory();
    let q = new URLSearchParams(window.location.search)
    let qAuth = q.get("auth")
    let qOtp = parseInt(q.get("otp"))
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [isLoginButtonShowing, setIsLoginButtonShowing] = useState(false)
    const Token=localStorage.getItem('token');
    const headers = {'Authorization': `Bearer ${Token}`};
    useEffect(() => {
        const Verification = () => {
            const verifyEmailData = {auth:qAuth, otp: qOtp};
            axios.post(API_BASE_URL + '/v1/verify-and-update-email', verifyEmailData,{
                headers: headers
                })
                .then((result) => {
                    setSuccessMessage(result.data.message)
                    setIsSuccessMessage(true)
                    setIsErrorMessage(false)
                    setIsLoginButtonShowing(true);
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
    const goToLogin = (e) => {
        e.preventDefault()
        history.push('/login')
    }

return (
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
                </div>
            </div>
        </div>
    )
}

export default VerifyAndEditEmail;