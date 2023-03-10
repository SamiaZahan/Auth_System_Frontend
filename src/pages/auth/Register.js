import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants/ApiConstants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function Register() {
    const [data, setData] = useState({first_name: '', last_name: '', email: '', password: '', confirm_password: ''});
    const [startValidation, setStartValidation] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [isFormShowing, setIsFormShowing] = useState(true);
    const [passEyeShow, setPassEyeShow] = useState(false);
    const [confirmPassEyeShow, setConfirmPassEyeShow] = useState(false)


    const [error, setError] = useReducer((state, action) => {
        if (action.type === 'set') {
            return { ...state, ...action.data }
        }
    }, {first_name: '', last_name: '' , email: '', password: '', confirm_password: ''})
    const Registration = (e) => {
        e.preventDefault();
            if(data.password !== data.confirm_password){
                setErrorMessage("Password and confirm password didn't match".toUpperCase());
                setIsSuccessMessage(false)
                setIsErrorMessage(true)
            }
            else{
                axios.post(API_BASE_URL + '/v1/signup', data)
                .then((result) => {
                    setSuccessMessage(result.data.message.toUpperCase())
                    setIsErrorMessage(false)
                    setIsSuccessMessage(true)
                    setIsFormShowing(false)
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.message.toUpperCase());
                    setIsSuccessMessage(false)
                    setIsErrorMessage(true)
                })
            }
    }

    const nameValidation = (val) => {
        let regex = /^[a-zA-Z]{2,}$/
        return regex.test(val)
    }
    const isEmail = (value) => {
        const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return mailFormat.test(value);
    }
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setStartValidation(true)
    }

    const passwordToggle = () =>{
        passEyeShow? setPassEyeShow(false): setPassEyeShow(true)
        var x = document.getElementById("password");
        x.type === "password"? x.type = "text" :  x.type = "password"
    }
    const ConfirmPasswordToggle = () =>{
        confirmPassEyeShow? setConfirmPassEyeShow(false): setConfirmPassEyeShow(true)
          var x = document.getElementById("confirm_password");
        x.type === "password"? x.type = "text" :  x.type = "password"
    }

    useEffect(() => {
        if (startValidation) {
            (!nameValidation(data.first_name)) ? setError({ type: 'set', data: { first_name: 'Firstname should have minimum 2 letters(A-Za-z)' } }) : setError({ type: 'set', data: { first_name: null } });
            (!nameValidation(data.last_name)) ? setError({ type: 'set', data: { last_name: 'Lastname should have minimum 2 letters(A-Za-z)' } }) : setError({ type: 'set', data: { last_name: null } });
            (!isEmail(data.email)) ? setError({ type: 'set', data: { email: 'Please input a valid email' } }) : setError({ type: 'set', data: { email: null } });
            (data.password.length<8)? setError({ type: 'set', data: { password: 'Please input a password more than 7 char' } }) : setError({ type: 'set', data: { password: null } });
            (data.confirm_password.length<8)? setError({ type: 'set', data: { confirm_password: 'Please input more than 7 char' } }) : setError({ type: 'set', data: { confirm_password: null } });
        }
    }, [data, startValidation])
    return (
        <>
            <section id="airbringr-background">
                <div className="container">
                    <div className="row justify-content-center">
                    <div id="myform" className="col-lg-4 col-md-6 col-sm-6 mt-5 p-4 alert-success mb-5 text-center"
                         style={{background: "#ffffff"}}>
                            {isFormShowing &&
                                <div>
                                    <h5 id="form-header" className="mt-3 mb-3">Signup to Continue</h5>
                                </div>
                            }
                            {successMessage && isSuccessMessage &&
                                <div className="alert alert-success mb-3 mt-2 p-2 text-center" role="alert">
                                    {successMessage}
                                </div>
                            }
                            {errorMessage && isErrorMessage &&
                                <div className="alert alert-danger mb-3 mt-2 p-2 text-center" role="alert">
                                    {errorMessage}
                                </div>
                            }

                            {isFormShowing &&
                                <form onSubmit={Registration}>

                                    <div className="form-group mb-3">
                                        <label className="text-capitalize" htmlFor="first_name">First name <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            type="text" className="form-control"
                                            id="first_name" name="first_name" autoComplete="off"
                                            onChange={onChange}
                                            required autoFocus
                                        />
                                        {
                                            error.first_name !== "" &&
                                            <div className="text-danger">{error.first_name}</div>
                                        }
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-capitalize" htmlFor="last_name">Last name <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            type="text" className="form-control"
                                            id="last_name" name="last_name" autoComplete="off"
                                            onChange={onChange}
                                            required autoFocus
                                        />
                                        {
                                            error.last_name &&
                                            <div className="text-danger">{error.last_name}</div>
                                        }
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-capitalize" htmlFor="email">Email address <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            type="email" className="form-control"
                                            id="email" name="email" autoComplete="off"
                                            onChange={onChange}
                                            required
                                        />
                                        <div className="text-danger">{error.email}</div>
                                    </div>
                                    <div className="form-group mb-3">
                                       
                                        <label className="text-capitalize" htmlFor="password">Password<span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="password" className="form-control"
                                                id="password" name="password" autoComplete="off"
                                                onChange={onChange}
                                                required
                                            />
                                            {passEyeShow&&
                                           <FontAwesomeIcon style={{
                                                                float: "right",
                                                                marginRight: "15px",
                                                                marginTop: "-33px",
                                                                position: "relative",
                                                                zIndex: "2"
                                                            }} 
                                                            onClick={passwordToggle}
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
                                                            onClick={passwordToggle}
                                                            icon={faEyeSlash} />
                                            }
                    
                                        {
                                             error.password &&
                                            <div className="text-danger">{error.password}</div>
                                        }
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-capitalize" htmlFor="password">Confirm Password <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            type="password" className="form-control"
                                            id="confirm_password" name="confirm_password" autoComplete="off"
                                            onChange={onChange}
                                            required
                                        />
                                         {confirmPassEyeShow&&
                                           <FontAwesomeIcon style={{
                                                                float: "right",
                                                                marginRight: "15px",
                                                                marginTop: "-33px",
                                                                position: "relative",
                                                                zIndex: "2"
                                                            }} 
                                                            onClick={ConfirmPasswordToggle}
                                                            icon={faEye} />
                                            }
                                            {!confirmPassEyeShow&&
                                           <FontAwesomeIcon style={{
                                                                float: "right",
                                                                marginRight: "15px",
                                                                marginTop: "-33px",
                                                                position: "relative",
                                                                zIndex: "2"
                                                            }} 
                                                            onClick={ConfirmPasswordToggle}
                                                            icon={faEyeSlash} />
                                            }
                                        {
                                             error.password &&
                                            <div className="text-danger">{error.password}</div>
                                        }
                                    </div>
                                   

                                    <div className="d-grid gap-2 mt-4">
                                        <button className="btn btn-custom btn-block text-white text-uppercase"
                                         type="submit"
                                         style={{ background: "#1ba7f9" }}>
                                            Sign Up
                                        </button>
                                    </div>

                                    <div className="d-grid gap-2 mt-4 mb-3">
                                        <Link to="/login"
                                            className="btn btn-custom btn-block text-white border-1 border-secondary text-muted text-uppercase"
                                            style={{ background: "#eceef0" }}>
                                            Existing user? Sign In
                                        </Link>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;