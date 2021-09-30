import React, {useState} from "react";

function Reset() {
    const [email, setEmail] = useState("");
    const [errEmail, setErrEmail] = useState('');
    const [message, setMessage] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        if (isEmail(email)) {
            console.log("User email: " + email);
            setEmail('');
            setErrEmail('');
            setMessage("We have e-mailed your password reset link!")
        } else {
            setErrEmail("The email must be a valid email address.");
        }
    }
    const isEmail = (value) => {
        const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return mailFormat.test(value);
    }

    return (
        <>
            <div id="airbringr-background" className="container-fluid">
                <div className="row justify-content-center">
                    <div id="myform" className="col-3 mt-5 mb-5 rounded" style={{background: "#ffffff"}}>
                        <form className="p-2" method="POST" onSubmit={submitForm} id="register" action="">
                            <div>
                                <h5 id="form-header" className="mt-3">
                                    Reset Password
                                </h5>
                            </div>
                            <input type="hidden" name="_token" value="PEIP57hzoSsKlaDUymJScvE8dsV0tG7rZHE81YGM"/>

                            <input type="hidden" id="_signup_as" name="_signup_as" value=""/>
                            {message &&
                            <div className="alert alert-success m-1 p-1 text-center" role="alert">
                                {message}
                            </div>
                            }

                            <div className="form-group mb-3">
                                <label htmlFor="name">Email address*</label>
                                <input
                                    type="email" className="form-control"
                                    id="email" name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus required autoComplete="off"
                                />
                                <div className="text-danger">{errEmail}</div>
                            </div>

                            <div className="d-grid gap-2 mt-4 fst-normal" style={{"font-size": ".1rem"}}>
                                <button className="btn btn-block text-white text-uppercase"
                                        style={{background: "#1ba7f9"}}>
                                    Send Password Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reset;