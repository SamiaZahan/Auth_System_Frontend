import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../../constants/ApiConstants";

function Register(props) {
    const [data, setData] = useState({ email: '', first_name: '', last_name: '' })
    const [error, setError] = useState({ email: '', first_name: '', last_name: '' })
    const [message, setMessage] = useState(null);
    const findFormErrors = () => {
        const newErrors = {}
        // name errors
        if ( !isName(data.first_name)) newErrors.first_name = 'Name cannot be blank!'
        // email errors
        if ( !isEmail(data.email)) newErrors.email = 'Please valid email!'
        // last name errors
        if ( !isName(data.last_name)) newErrors.last_name = 'cannot be blank!'

        return newErrors
    }
    const Registration = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors()
        // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setError(newErrors)
        } else {
            // No errors! Put any logic here for the form submission!
            const data1 = { email: data.email, first_name: data.first_name, last_name: data.last_name };
            axios.post(API_BASE_URL + '/v1/signup', data1)
                .then((result) => {
                   setMessage(result.data.message)
                })
                .catch((error) =>{
                    setMessage(error);
                })
        }

    }
    const isName = (value) => {
        return (value.length > 4);
    }
    const isEmail = (value) => {
        const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return mailFormat.test(value);
    }
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    return (
        <>
            <section id="airbringr-background">
                <div  className="container">
                    <div className="row justify-content-center">
                        <div  id="myform" className="col-4 mt-5 mb-5 rounded" style={{background: "#ffffff"}}>
                            <form onSubmit={Registration} className="p-2" action="">
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
                                <div className="form-group mb-3">
                                    <label htmlFor="first_name">First name *</label>
                                    <input
                                        type="text" className="form-control"
                                        id="first_name" name="first_name" autoComplete="off"
                                        value={data.first_name}
                                        onChange={onChange}
                                        required autoFocus
                                    />
                                    <div className="text-danger">{error.first_name}</div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="last_name">Last name *</label>
                                    <input
                                        type="text" className="form-control"
                                        id="last_name" name="last_name" autoComplete="off"
                                        value={data.last_name}
                                        onChange={onChange}
                                        required autoFocus
                                    />
                                    <div className="text-danger">{error.last_name}</div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email address *</label>
                                    <input
                                        type="email" className="form-control"
                                        id="email" name="email" autoComplete="off"
                                        value={data.email}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="text-danger">{error.email}</div>
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
            </section>
        </>
    );
}

export default Register;