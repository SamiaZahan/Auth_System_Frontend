import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL, LEGACY_WEBSITE_URL} from "../../constants/ApiConstants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


function Login() {
    const isPhone = (value) => {
        const phoneFormat = /^[0-9]+$/;
        return (phoneFormat.test(value) && (value.length === 11));
    }
    const [phoneNumber, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [otpSent] = useState(false);
    const [passEyeShow, setPassEyeShow] = useState(false);

    
    const submitPhoneNumber = (e) => {
        setIsErrorMessage(false);
        e.preventDefault();        
        if(isPhone(phoneNumber)){
                axios.post(API_BASE_URL + '/v1/login', {email_or_mobile: phoneNumber,password: password, country_prefix: "880"})
                    .then((r) => {
                        console.log(r)
                        setSuccessMessage(r.data.message.toUpperCase());
                        setIsSuccessMessage(true)
                        setIsErrorMessage(false)
                        console.log(r.data.data.code )
                        if(r.data.data.code !== ""){
                            console.log("inside the block")
                            window.location = LEGACY_WEBSITE_URL + '/helper/force-login/?code='+ r.data.data.code
                        }
                    })
                    .catch(err => {
                        
                        if(err.response!== undefined){
                            setErrorMessage(err.response.data.message.toUpperCase())
                            setIsErrorMessage(true)
                            setIsSuccessMessage(false)
                            }
                            else{
                                setErrorMessage("LOGIN ERROR")
                                setIsErrorMessage(true)
                                setIsSuccessMessage(false)
                            }
                    })
                
                }
        else{
            setErrorMessage("ENTER A VALID PHONE NUMBER")
            setIsErrorMessage(true)
        }      
    }
    
    

    const submitEmail = (e) => {
        e.preventDefault();
        setIsErrorMessage(false);
        axios.post(API_BASE_URL + '/v1/login', {email_or_mobile: email,password: password, country_prefix: ""})
                .then((r) => {
                    console.log(r)
                    setSuccessMessage(r.data.message.toUpperCase());
                    setIsSuccessMessage(true)
                    setIsErrorMessage(false)
                    console.log(r.data.data.code )
                    if(r.data.data.code !== ""){
                        console.log("inside the block")
                        localStorage.setItem('token', r.data.data.token);
                        // window.location = LEGACY_WEBSITE_URL + '/helper/force-login/?code='+ r.data.data.code
                    }                    
                    
                })
                .catch(err => {
                
                    if(err.response!== undefined){
                    setErrorMessage(err.response.data.message.toUpperCase())
                    setIsErrorMessage(true)
                    setIsSuccessMessage(false)
                    }
                    else{
                        setErrorMessage("LOGIN ERROR")
                        setIsErrorMessage(true)
                        setIsSuccessMessage(false)
                    }
                    
                })
      
            
    }
    const onClick  =  () =>{
        setIsErrorMessage(false) ;
        setPassEyeShow(false);
        document.getElementById("password_phone").value="";
        document.getElementById("password_email").value="";
        document.getElementById("phone").value="";
        document.getElementById("email").value="";

    }

    const phonePasswordToggle = () =>{
        passEyeShow? setPassEyeShow(false): setPassEyeShow(true)
        var x = document.getElementById("password_phone");
        x.type === "password"? x.type = "text" :  x.type = "password"
    }
    const emailPasswordToggle = () =>{
        passEyeShow? setPassEyeShow(false): setPassEyeShow(true)
        var x = document.getElementById("password_email");
        x.type === "password"? x.type = "text" :  x.type = "password"
    }
  
    return (
        <>
            <section id="airbringr-background">
                <div className="container">
                    <div className="row justify-content-center">
                        <div id="myform" className="col-lg-4 col-md-6 col-sm-6 mt-5 p-4 alert-success mb-5 text-center"
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
                           
                            <ul className="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
                                <li style={{width: "50%"}} className="nav-item" role="presentation">
                                    <button style={{width: "100%"}} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-home" type="button" role="tab"
                                            aria-controls="pills-home" 
                                            onClick={onClick}
                                            aria-selected="true">Mobile
                                    </button>
                                </li>
                                <li style={{width: "50%"}} className="nav-item" role="presentation">
                                    <button style={{width: "100%"}} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-profile" type="button" role="tab"
                                            aria-controls="pills-profile" 
                                            onClick={onClick}
                                            aria-selected="false">Email
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
                                                type="tel" className="form-control"
                                                id="phone"
                                                onBlur={e => setPhone(e.target.value)}
                                                required autoFocus autoComplete='off'
                                            />
                                            <label className="text-capitalize" htmlFor="name">Password<span
                                                style={{color: "red"}}>*</span></label>
                                            <input
                                                type="password" className="form-control"
                                                id="password_phone"
                                                onChange={e => setPassword(e.target.value)}
                                                required autoFocus autoComplete='off'
                                            />
                                            {passEyeShow&&
                                           <FontAwesomeIcon style={{
                                                                float: "right",
                                                                marginRight: "15px",
                                                                marginTop: "-33px",
                                                                position: "relative",
                                                                zIndex: "2"
                                                            }} 
                                                            onClick={phonePasswordToggle}
                                                            icon={faEye} />
                                            }
                                            {!passEyeShow&&
                                           <FontAwesomeIcon style={{
                                                                float: "right",
                                                                marginRight: "15px",
                                                                marginTop: "-33px",
                                                                position: "relative",
                                                                zIndex: "2"
                                                            }} 
                                                            onClick={phonePasswordToggle}
                                                            icon={faEyeSlash} />
                                            }
                                             <div >
                                                <Link to="/reset"
                                                    className="text-uppercase"
                                                    style={{"textDecoration":"none","font-size": ".8rem"}}>
                                                    Forgot Your Password?
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="d-grid gap-2 mt-4 fst-normal"
                                             style={{"font-size": ".1rem"}}>
                                            <button className="btn btn-block btn-custom text-white text-uppercase"
                                                    type="submit"
                                                    style={{background: "#1ba7f9"}}>
                                                Sign In
                                            </button>
                                        </div>
                                    </form>
                                    }
                                   
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                                     aria-labelledby="pills-profile-tab">
                                    {!otpSent &&
                                    <form onSubmit={submitEmail}>
                                        <div className="form-group">
                                            <label className="text-capitalize" htmlFor="name"> Email <span
                                                style={{color: "red"}}>*</span></label>
                                            <input
                                                type="tel" className="form-control"
                                                id="email"
                                                onBlur={e => setEmail(e.target.value)}
                                                required autoFocus autoComplete='off'
                                            />
                                            <label className="text-capitalize" htmlFor="name">Password<span
                                                style={{color: "red"}}>*</span></label>
                                            <input
                                                type="password" className="form-control"
                                                id="password_email"
                                                onChange={e => setPassword(e.target.value)}
                                                required autoFocus autoComplete='off'
                                            />
                                            {passEyeShow&&
                                           <FontAwesomeIcon style={{
                                                                float: "right",
                                                                marginRight: "15px",
                                                                marginTop: "-33px",
                                                                position: "relative",
                                                                zIndex: "2"
                                                            }} 
                                                            onClick={emailPasswordToggle}
                                                            icon={faEye} />
                                            }
                                            {!passEyeShow&&
                                           <FontAwesomeIcon style={{
                                                                float: "right",
                                                                marginRight: "15px",
                                                                marginTop: "-33px",
                                                                position: "relative",
                                                                zIndex: "2"
                                                            }} 
                                                            onClick={emailPasswordToggle}
                                                            icon={faEyeSlash} />
                                            }
                                            <div >
                                                <Link to="/reset"
                                                    className="text-uppercase"
                                                    style={{"textDecoration":"none","font-size": ".8rem"}}>
                                                    Forgot Your Password?
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="d-grid gap-2 mt-4 fst-normal"
                                            style={{"font-size": ".1rem"}}>
                                            <button className="btn btn-block btn-custom text-white text-uppercase"
                                                    type="submit"
                                                    style={{background: "#1ba7f9"}}>
                                                Sign In
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