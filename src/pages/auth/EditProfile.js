import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {API_BASE_URL} from "../../constants/ApiConstants";



const EditProfile = () => {
    const [isLoading,  setIsLoading]=useState(true);
    const [formShow,  setFormShow]=useState(false);
    const [user, setUser] = useState({});
    const [address,  setAddress]= useState({});
    const [areas, setAreas]= useState([]);
    const [divisions, setDivisions]= useState([]);
    const [divisionId, setDivisionId]= useState(null);
    const [districts, setDistricts]= useState([]);
    const [districtId, setDistrictId]= useState(null);
    const [password,setPassword]= useState('');
    const [showEmailPassField , setShowEmailPassField] = useState(false);
    const [emailPassError , setEmailPassError] = useState(false);
    const [emailPassMatched, setEmailPassMatched] = useState(false);
    const [showMobilePassField , setShowMobilePassField] = useState(false);
    const [mobilePassError , setMobilePassError] = useState(false);
    const [mobilePassMatched, setMobilePassMatched] = useState(false);
    const [passEyeShow, setPassEyeShow] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [modalText, setModalText] = useState("");
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [newEmail, setNewEmail]=useState("");
    const [newMobile, setNewMobile]=useState("");
    const [otp , setOtp]= useState("");
    const [otpMsg,setOptMsg]= useState("");
    const [wrongOtpMsg, setWrongOtpMsg]=useState("");
    const [wrongOtpMsgShow, setWrongOtpMsgShow]= useState(false);
    const [mobileVerifiedShow, setMobileVerifiedShow]= useState(false);
    const [mobileVerifiedMsg, setMobileVerifiedMsg] = useState("");
    const [submitOtpShow, setSubmitOtpShow]= useState(false);
    const {image, first_name,last_name, gender, email, mobile, age}= user
    const {division,district,area, text}=address;
    const [updatedData, setUpdatedData] = useState({first_name, last_name, gender, address:{division:'', district:'', area:'', text:'',zone:''}});
    const [updatedAaddress, setUpdatedAddress] =  useState({division:'', district:'', area:'',text:'',zone:'' });
    const Token=localStorage.getItem('token');
    const headers = {'Authorization': `Bearer ${Token}`};
   

    useEffect(() => {
        
        axios.get(API_BASE_URL + '/v1/view-profile', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
        .then (function(res) {
            setUser(res.data.data.user);
            setUpdatedData(res.data.data.user)
            setAddress(res.data.data.address);
            setUpdatedAddress(res.data.data.address);
            setIsLoading(false);
            setFormShow(true);
        })
        .catch((error) => {
            if(error.response!== undefined){
                setErrorMessage(error.response.data.message.toUpperCase())
                setIsErrorMessage(true)
                setIsSuccessMessage(false)
                }
            else{
                setErrorMessage("ERROR IN LOADING DATA")
                setIsErrorMessage(true)
                setIsSuccessMessage(false)
            }
        })    
    },[Token]);
    
    useEffect(() => {
        fetch('./Division.JSON')
            .then(res=>res.json())
            .then(data=> {
                setDivisions(data.divisions);
                setDistricts(data.districts);
                setAreas(data.areas);
            })
    },[]); 
    const DivisionIdSet = (e)=>{
        setDivisionId (e.target.value);
        const  div=  divisions.find(elem=>elem.id===e.target.value)
        setUpdatedAddress({...updatedAaddress,'division': div.name})
        setUpdatedData({...updatedData,'address':updatedAaddress});
        document.getElementById('district-field').removeAttribute("disabled");
        
    }
    const DistrictIdSet = (e)=>{
        setDistrictId(e.target.value);
        const  dis  =  districts.find(elem=>elem.id===e.target.value)
        setUpdatedAddress({...updatedAaddress,'district': dis.name});
        setUpdatedData({...updatedData,'address':updatedAaddress});
        document.getElementById('area-field').removeAttribute("disabled");
    }
    const areaZoneSet=(e)=> {
        const area= areas.find(ele=>ele.area===e.target.value)
        var zone = area.zone;
        if  (zone>6){
            zone='courier'
        }        
        setUpdatedAddress({...updatedAaddress,'area':e.target.value,'zone': zone});
        setUpdatedData({...updatedData,'address':updatedAaddress});

        document.getElementById('address-text').removeAttribute("disabled");        
    }
    const addressTextSet=()=>{
        const  addressText=  document.getElementById('address-text').value;        
        setUpdatedAddress({...updatedAaddress,'text':  addressText});
        setUpdatedData({...updatedData,'address':updatedAaddress});


    }  
    const onChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value ,'address':{ ...updatedAaddress}});
        // setStartValidation(true)
    }
    const onClick  = () =>  {
        console.log(updatedData);

        axios.post(API_BASE_URL + '/v1/edit-profile', updatedData,{
        headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
        .then (function(res) {
            setSuccessMessage(res.data.message.toUpperCase())
            setIsErrorMessage(false)
            setIsSuccessMessage(true)
            console.log(res.data.message)
        })
        .catch((error) => {
            setErrorMessage(error.response.data.message.toUpperCase());
            setIsSuccessMessage(false)
            setIsErrorMessage(true)
             console.log(error)  
        })   
        
    }
    const emailPassVerify= () => {
        setPassword(document.getElementById('password').value)
        axios.post(API_BASE_URL + '/v1/verify-password', {password},{
        headers: headers
        })
        .then((res)=>{
            if(res.data.data.verified){  
                console.log("Matched");
                setEmailPassMatched(true);
                setShowEmailPassField(false);
                setEmailPassError(false);    
            }
            else{
                console.log("Sorry password didn't matched")
                setEmailPassMatched(false)
                setShowEmailPassField(false);
                setEmailPassError(true);
            }
        })
        .catch(err => {
            console.log(err)  
        })
    }
    const mobilePassVerify= () => {
        setPassword(document.getElementById('password').value)
        axios.post(API_BASE_URL + '/v1/verify-password', {password},{
        headers: headers
        })
        .then((res)=>{
            if(res.data.data.verified){  
                console.log("Matched");
                setMobilePassMatched(true);
                setShowMobilePassField(false);
                setMobilePassError(false);    
            }
            else{
                console.log("Sorry password didn't matched")
                setMobilePassMatched(false)
                setShowMobilePassField(false);
                setMobilePassError(true);
            }
        })
        .catch(err => {
            console.log(err)  
        })
    }
    const passwordToggle = () =>{
        passEyeShow? setPassEyeShow(false): setPassEyeShow(true)
        var x = document.getElementById("password");
        x.type === "password"? x.type = "text" :  x.type = "password"
    }
    const emailPassFieldShow=()=>{
        setShowEmailPassField(true);
        setEmailPassError(false);
        setEmailPassMatched(false);
        setWrongOtpMsgShow(false);
        setSubmitOtpShow(false);
    }
    const mobilePassFieldShow=()=>{
        setShowMobilePassField(true);
        setMobilePassError(false);
        setMobilePassMatched(false)
        setWrongOtpMsgShow(false);
        setSubmitOtpShow(false);
    }
    const submitEmail=()=>{
       
        console.log(newEmail)
        axios.post(API_BASE_URL + '/v1/edit-email-req', {"email":newEmail},{
            headers: headers
        })
        .then (function(res) {
            setSuccessMessage(res.data.message.toUpperCase())
            setModalText("A verification email  has been send. Please verify your new email within 6 hrs, else the change will not be saved")
            setIsErrorMessage(false)
            setIsSuccessMessage(true)
            setEmailPassMatched(false);
            console.log(res)
        })
        .catch((error) => {
            setErrorMessage(error.response.data.errors.email.toUpperCase())
            setIsErrorMessage(true)
            setIsSuccessMessage(false)
            setModalText("Please enter a valid email address")

             console.log(error.response.data.errors.email.toUpperCase())  
        }) 

        
    }
    const submitMobile=()=>{
        // console.log(newMobile)
        axios.post(API_BASE_URL + '/v1/edit-mobile-send-otp', {"mobile":newMobile},{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
        .then(function(res){
            setOptMsg(res.data.message.toUpperCase());
            setSubmitOtpShow(true);
            setMobilePassMatched(false);
        })
        .catch((error)=>{
            setErrorMessage(error.response.data.message.toUpperCase())
            setIsErrorMessage(true)
            setIsSuccessMessage(false)
            setMobilePassMatched(true);
            console.log(error);

        })
    }
    const submitOtp=()=>{
        axios.post(API_BASE_URL + '/v1/verify-and-update-mobile', {"mobile":newMobile,otp: parseInt(otp)},{
            headers: headers
        })
        .then(function(res){
            setMobileVerifiedShow(true)
            setMobileVerifiedMsg(res.data.message.toUpperCase()+"AND UPDATED");
            setSubmitOtpShow(false);
        })
        .catch((error)=>{
            setSubmitOtpShow(false);
            setWrongOtpMsg(error.response.data.message.toUpperCase())
            setWrongOtpMsgShow(true)
        })
    }

    return (
        <div className="container-fluid p-5 d-flex justify-content-center" id="airbringr-background" style={{textAlign:'center'}}>
             {
                isLoading&&
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {
                formShow&&
            <div id="myform" className='col col-lg-6  col-md-8 col-sm-8  p-5 shadow bg-white rounded text-center' style={{textAlign:'left'}}>
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
                <img src={image} alt="" style={{ display:'block',borderRadius:'50%',margin:'auto', width:'50%'}} />
                <div class="row">
                    <div className="form-group mb-3 col-sm-12 col-md-6">
                        <label className="text-capitalize ms-0" htmlFor="name">First Name</label>
                        <input
                            type="text" className="form-control"
                            id="first_name" name="first_name"
                            placeholder={first_name}
                            onChange={onChange}
                            autoFocus required autoComplete="off"
                        />
                    </div>
                    <div className="form-group mb-3 col-sm-12 col-md-6">
                        <label className="text-capitalize ms-0" htmlFor="name">Last Name</label>
                        <input
                            type="text" className="form-control"
                            id="last_name" name="last_name"
                            placeholder={last_name}
                            onChange={onChange}
                            autoFocus required autoComplete="off"
                        />
                    </div>
                </div>
                
                <div class="row">
                    <div className="form-group mb-3 col-sm-12 col-md-6">
                        <label className="text-capitalize ms-0" htmlFor="gender">Gender</label>
                        <input
                            list='genderGroup'
                            type="text" className="form-control"
                            id="gender" name="gender"
                            placeholder={gender}
                            onChange={onChange}                    
                            autoFocus required autoComplete="off"
                        />
                         <datalist id="genderGroup">
                            <option value="Male"/>
                            <option value="Female"/>
                            <option value="Other"/>
                        </datalist>
                    </div>
                    <div className="form-group mb-3 col-sm-12 col-md-6">
                        <label className="text-capitalize ms-0" htmlFor="age">Age</label>
                        <input
                            list='ageGroup'
                            type="text" className="form-control"
                            id="age" name="age"
                            placeholder={age}
                            onChange={onChange}                    
                            autoFocus required autoComplete="off"
                        />
                        <datalist id="ageGroup">
                            <option value="00 - 14"/>
                            <option value="15-24"/>
                            <option value="25-64"/>
                            <option value="65 Over"/>
                        </datalist> 
                    </div>
                </div>
                
                <label className="text-capitalize ms-0" htmlFor="email">Email address</label>
                <input
                    type="email" className="form-control"
                    id="email" name="email"
                    placeholder={email}
                    disabled
                    autoFocus required autoComplete="off"
                />
                
               
                <FontAwesomeIcon 
                    data-bs-toggle="modal" data-bs-target="#emailChangeAlert"
                    style={{
                    float: "right",
                    marginRight: "15px",
                    marginTop: "-33px",
                    position: "relative",
                    zIndex: "2"
                }} 
                icon={faPen} />
                
                { showEmailPassField&&
                <div className="form-group mb-3 ">
                    <label className="text-capitalize" htmlFor="name">Password<span
                            style={{color: "red"}}>*</span></label>
                        <input
                            type="password" className="form-control"
                            id="password"
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
                    <br/>
                    <button className="btn btn-custom btn-block text-white text-uppercase px-5 w-100" style={{ background: "#1ba7f9" }} 
                    type="button" onClick={emailPassVerify}>
                        Verify
                    </button> 
                    <br/>           
                </div>
                }
                {
                    emailPassError&&
                    <div className="alert alert-danger mb-3 mt-2 p-2 text-center" role="alert">
                        Oops! Sorry, password didn't match.
                    </div>
                }
                {
                    emailPassMatched&&
                    <div>
                    <label className="text-capitalize ms-0" htmlFor="email">New Email address<span
                            style={{color: "red"}}>*</span></label>
                    <input
                        type="email" className="form-control"
                        id="new_email" name="new_email"
                        placeholder="Enter New Email"
                        onBlur={(e)=>{setNewEmail(e.target.value)}}
                        required
                        autoComplete="off"
                    />
                    <br/>
                    <button className="btn btn-custom btn-block text-white text-uppercase px-5 w-100" style={{ background: "#1ba7f9" }} 
                    type="button" onClick={submitEmail} data-bs-toggle="modal" data-bs-target="#emailVerifyAlert">
                        Submit Email
                    </button> 
                    </div>
                }
                
                <br/>
                <label className="text-capitalize ms-0" htmlFor="email">Mobile</label>
                <input
                    type="number" className="form-control"
                    id="mobile" name="mobile"
                    placeholder={mobile}
                    disabled
                    autoFocus required autoComplete="off"
                />
                <FontAwesomeIcon 
                    data-bs-toggle="modal" data-bs-target="#mobileChangeAlert"
                    style={{
                    float: "right",
                    marginRight: "15px",
                    marginTop: "-33px",
                    position: "relative",
                    zIndex: "2"
                }} 
                icon={faPen} />
                {
                    mobileVerifiedShow&&
                     <div className="alert alert-success mb-3 mt-2 p-2 text-center" role="alert">
                     {mobileVerifiedMsg}
                    </div>
                }
               
                
                { showMobilePassField&&
                <div className="form-group mb-3 ">
                    <label className="text-capitalize" htmlFor="name">Password<span
                            style={{color: "red"}}>*</span></label>
                        <input
                            type="password" className="form-control"
                            id="password"
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
                    <br/>
                    <button className="btn btn-custom btn-block text-white text-uppercase px-5 w-100" style={{ background: "#1ba7f9" }} 
                    type="button" onClick={mobilePassVerify}>
                        Verify
                    </button> 
                    <br/>           
                </div>
                }
                {
                    mobilePassError&&
                    <div className="alert alert-danger mb-3 mt-2 p-2 text-center" role="alert">
                        Oops! Sorry, password didn't match.
                    </div>
                }
                {
                    mobilePassMatched&&
                    <div>
                     <label className="text-capitalize ms-0" htmlFor="email">New Mobile<span
                            style={{color: "red"}}>*</span></label>
                    <input
                        type="number" className="form-control"
                        id="new_mobile" name="new_mobile"
                        placeholder="Enter new mobile"
                        onBlur={(e)=>{setNewMobile(e.target.value)}}
                        required
                        autoComplete="off"
                    />
                    <br/>
                    <button className="btn btn-custom btn-block text-white text-uppercase px-5 w-100" style={{ background: "#1ba7f9" }} 
                    type="button" onClick={submitMobile} >
                        Submit Mobile
                    </button> 
                    </div>
                }
                {
                    submitOtpShow&&
                      <div>
                      <label className="text-capitalize ms-0" htmlFor="email">OTP<span
                             style={{color: "red"}}>*</span></label>
                     <input
                         type="number" className="form-control"
                         id="otp" name="otp"
                         placeholder="Enter the OTP"
                         onBlur={(e)=>{setOtp(e.target.value)}}
                         required
                         autoComplete="off"
                     />
                     <div className="alert alert-success mb-3 mt-2 p-2 text-center" role="alert">
                        {otpMsg}
                    </div>
                     <br/>
                     <button className="btn btn-custom btn-block text-white text-uppercase px-5 w-100" style={{ background: "#1ba7f9" }} 
                     type="button" onClick={submitOtp} >
                         Submit OTP
                     </button> 
                     </div> 
                }
                {
                    wrongOtpMsgShow&&
                    <div className="alert alert-danger  mb-3 mt-2 p-2 text-center" role="alert">
                        {wrongOtpMsg}
                    </div>

                }
                <br/>
                <label className="text-capitalize ms-0" htmlFor="address"><b>Address</b></label>
                <hr></hr>
                <div class="row">
                    <div className="form-group mb-3 col-sm-12 col-md-6">
                        <label className="text-capitalize ms-0" htmlFor="address" style={{backgroundColor: "white", top:"10px", position:"relative"}}>Division</label>
                        <select className="form-select py-2" aria-label="Default select example" id="division-filed" onChange={DivisionIdSet}>
            
                            <option value="" selected disabled>{division}</option>
                                {
                                divisions.map(division=><option value={division.id}>{division.name}</option>
                                )}
                        </select>
                    </div>
                    <div className="form-group mb-3 col-sm-12 col-md-6">
                        <label className="text-capitalize ms-0" htmlFor="address" style={{backgroundColor: "white", top:"10px", position:"relative"}}>District</label>
                        <select disabled className="form-select  py-2" aria-label="Default select example" id="district-field" onChange={DistrictIdSet}>
                            <option value="" selected disabled>{district}</option>
                                {
                                districts.filter(elements=>elements.division_id===divisionId).map(district=><option value={district.id}>{district.name}</option>
                                )}
                        </select>
                    </div>
                </div>
                <label className="text-capitalize ms-0" htmlFor="address" style={{backgroundColor: "white", top:"10px", position:"relative"}}>Area</label>
                    <select disabled className="form-select  py-2" aria-label="Default select example" id="area-field"  onChange={areaZoneSet}>
                    <option value="" selected disabled>{area}</option>
                        {
                         areas.sort((a, b) => (a.area > b.area) ? 1 : -1)
                         .filter(elements=>elements.district_id===districtId).map(area=><option value={area.area}>{area.area}</option>
                        )}
                    </select>
                <br/>
                <label className="text-capitalize ms-0" htmlFor="address">Detail Address</label>
                <input
                    disabled
                    type="text" className="form-control"
                    id="address-text" name="address"
                    placeholder={text}
                    onChange={addressTextSet}
                    autoFocus required autoComplete="off"
                />
                <br/>
                <button className="btn btn-custom btn-block text-white text-uppercase px-5 w-100"  style={{ background: "#1ba7f9" }} 
                 type="button" data-bs-toggle="modal" data-bs-target="#editSaveAlert">
                     Save
                </button>
                <br/>


                {/* Modals */}

                <div class="modal fade" id="emailChangeAlert" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Dear Shopper,</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                You can change your email once in a month. Proceed if you want to change anyway.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" 
                                data-bs-dismiss="modal"
                                onClick={emailPassFieldShow}
                                >Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="mobileChangeAlert" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Dear Shopper,</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                You can change your mobile number once in a month. Proceed if you want to change anyway.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" 
                                data-bs-dismiss="modal"
                                onClick={mobilePassFieldShow}
                                >Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editSaveAlert" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Dear Shopper,</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure about the changes?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button  class="btn btn-primary" data-bs-dismiss="modal"  onClick={onClick}>Yes</button>
                            </div>
                        </div>
                    </div>
                  </div>
                <div class="modal fade" id="emailVerifyAlert" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Dear Shopper,</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {modalText}
                            </div>
                            <div class="modal-footer">
                                <button  class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
              </div>
            </div>
            }
        </div>
    );
};

export default EditProfile;