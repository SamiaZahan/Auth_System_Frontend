import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from "../../constants/ApiConstants";

const Token=localStorage.getItem('token');


const Profile = () => {
    const [user, setUser] = useState({});  
    const [address, setAddress]=  useState({});
    const [isLoading,  setIsLoading]=useState(true);
    const [formShow,  setFormShow]=useState(false);
    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${Token}`
        }
        axios.get(API_BASE_URL + '/v1/view-profile', {
        headers: headers
        })
        .then (res => {
            // console.log(res);
            setUser(res.data.data.user);
            setAddress(res.data.data.address);
            setIsLoading(false);
            setFormShow(true);
        })
        .catch((error) => {
             console.log(error.response.data)  
        })    
    },[]);
    const {image, first_name,last_name, gender, email, mobile, age}= user;
    console.log(address);
    const {division,district,area, text,zone}=address;

    const btnIcon = <FontAwesomeIcon icon={faPen}/>
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
                <div id="myform" className='col col-lg-6  col-md-8 col-sm-8  p-lg-5 p-md-5  p-sm-2 p-3 shadow bg-white rounded' style={{textAlign:'left',height:'auto'}}>
                    <img src={image} alt="" style={{ display:'block',borderRadius:'50%',margin:'auto', width:'50%'}} /><br/>
                    <h1>{first_name+" "+last_name}</h1>
                    <div class="row">
                        <div className="form-group mb-3 col-lg-2 col-md-3 col-sm-4 col-4">
                            <h6>Gender</h6>
                        </div>
                        <div className="form-group mb-3 col-lg-10 col-md-9 col-sm-8 col-8">
                            <h6>: {gender}</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div className="form-group mb-3 col-lg-2 col-md-3 col-sm-4 col-4">
                            <h6>Age</h6>
                        </div>
                        <div className="form-group mb-3 col-lg-10 col-md-9 col-sm-8 col-8">
                            <h6>: {age}</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div className="form-group mb-3 col-lg-2 col-md-3 col-sm-4 col-4">
                            <h6>Email</h6>
                        </div>
                        <div className="form-group mb-3 col-lg-10 col-md-9 col-sm-8 col-8">
                            <h6>: {email}</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div className="form-group mb-3 col-lg-2 col-md-3 col-sm-4 col-4">
                            <h6>Mobile</h6>
                        </div>
                        <div className="form-group mb-3 col-lg-10 col-md-9 col-sm-8 col-8">
                            <h6>: {mobile}</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div className="form-group mb-3 col-lg-2 col-md-3 col-sm-4 col-4">
                            <h6>Address</h6>
                        </div>
                        <div className="form-group mb-3 col-lg-10 col-md-9 col-sm-8 col-8">
                            <h6>: {text}, {area},</h6>
                            <h6>{district}, {division}</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div className="form-group mb-3 col-lg-2 col-md-3 col-sm-4 col-4">
                            <h6>Zone</h6>
                        </div>
                        <div className="form-group mb-3 col-lg-10 col-md-9 col-sm-8 col-8">
                            <h6>: {zone}</h6>
                        </div>
                    </div>
                    <div>
                    <Link to="/editProfile">
                        <button className="btn btn-custom btn-block text-white text-uppercase px-2 w-100" type="submit" style={{ background: "#1ba7f9" }} >
                            {btnIcon} Edit Profile
                        </button>
                    </Link> 
                    </div>
                </div>
            }
        </div>
    );
};
export default Profile;

