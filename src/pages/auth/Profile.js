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
            <div className='p-5 shadow bg-white rounded' style={{textAlign:'left'}}>
                <img src={image} alt="" style={{ display:'block',borderRadius:'50%',margin:'auto', height:'40%', width:'70%'}} /><br/>
                <h1>{first_name+" "+last_name}</h1>
                <h6>Gender: {gender}</h6>
                <h6>Age: {age}</h6>
                <h6>Email: {email}</h6>
                <h6>Mobile: {mobile}</h6>
                <h6 className='mb-0'>Address: {text}, {area},</h6>
                <h6 className='ms-5'><span className='ms-3'></span>{district}, {division}</h6>
                <h6>Zone: {zone}</h6>
                <Link to="/editProfile">
                <button className="btn btn-custom btn-block text-white text-uppercase px-5 w-100" type="submit" style={{ background: "#1ba7f9" }} >
                    {btnIcon} Edit Profile
                </button>
                </Link>
            </div>
        </div>
    );
};
export default Profile;

