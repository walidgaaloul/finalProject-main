import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Card from "../card";
import "./Personal.css";
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment";
import {updateUser} from '../../../store/actions/authActionss'

let Personal = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.AuthReducers.user);
	console.log('user',user);
    const history = useHistory();

    const [editMode, setEtieMode] = useState(false);
    const [info, setInfo] = useState({
        Email:user.Email,
        FirstName:user.FirstName,
        LastName:user.LastName,
        Birthday:user.Birthday,
        PhoneNumber:user.PhoneNumber,
        Gender:user.Gender,
    });

    const handleChange= (e) =>{
        
        setInfo({...info,[e.target.name]:e.target.value});
    };
    const updateNow= e =>{
        e.preventDefault();
        dispatch(updateUser(info));
        setEtieMode(!editMode)
    };

    return (

        <div className="container">
            <div id="personal" className=" m-5">
                <ul className="nav">
                    <li className="nav-item">
                        <p role="button" onClick={() => history.push("/edit_profile/edit")}>Account</p>
                    </li>
                    <li className="nav-item ml-2">
                        <p >&#x276D;</p>
                    </li>
                    <li className="nav-item ml-2">
                        <p >Personal info</p>
                    </li>
                </ul>
                <h1 className="font-weight-bold">Personal info</h1>
                <div className="row mt-5">
                    <div className="col-md-7">
                        <form>
                           
                        <div className="form-group">
                                <label for="FirstName">First Name</label>
                                <input type="text" className="form-control" id="FirstName" value={info.FirstName} autoFocus name="FirstName" onChange={handleChange}/>
                            </div>

                            <div className="form-group">
                                <label for="LastName">LastName</label>
                                <input type="text" className="form-control" id="LastName" value={info.LastName} autoFocus name="LastName"  onChange={handleChange}/>
                            </div>

                            <div className="form-group">
                                <label for="Gender">Gender</label>
                                <input type="text" className="form-control" id="Gender" value={info.Gender}  autoFocus name="Gender"  onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label for="Date">Date of birth</label>
                                <input
                                autoFocus
                                    name="Birthday"
                                    type="date"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    disabled={!editMode}
                                    value={moment(info.Birthday).format('MM/DD/YYYY')
                                    
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label for="Phone">Phone number</label>
                                <input type="number" autoFocus className="form-control" id="Phone"  name="PhoneNumber" onChange={handleChange} />
                            </div>

                            
                          
                           
                            <input type="button" value="Save Changes" className="btn btn-info" onClick={updateNow} />
                        </form>
                    </div>
                    <div className="col-md-5 col-12 m-auto">
                        <Card
                            titel="What info is shared with others?"
                            dis="Airbnb only releases contact information for hosts and guests after a reservation is confirmed."><svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: "32px", width: " 32px", fill: "rgb(96, 182, 181)" }}><path d="m18.66 6.51-14.84 9.65a1 1 0 0 0 .55 1.84h15.62a1 1 0 0 0 1-1v-9.24a1.5 1.5 0 0 0 -2.32-1.26z"></path><path d="m9.25 12a1.25 1.25 0 1 1 -1.25-1.25 1.25 1.25 0 0 1 1.25 1.25zm11.75-8h-14a .5.5 0 0 0 0 1h14a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-1.5a.5.5 0 0 0 0 1h1.5a2 2 0 0 0 2-2v-12a2 2 0 0 0 -2-2zm-5 15h-13a1 1 0 0 1 -1-1v-12a1 1 0 0 1 1-1h1a .5.5 0 0 0 0-1h-1a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h13a .5.5 0 0 0 0-1zm-7.17-11.17a4.25 4.25 0 1 0 3.42 4.17 4.21 4.21 0 0 0 -.46-1.92.5.5 0 0 0 -.89.45 3.25 3.25 0 0 1 -.61 3.77 3.67 3.67 0 0 0 -4.56.02 3.25 3.25 0 0 1 2.27-5.57 3.3 3.3 0 0 1 .63.06.5.5 0 1 0 .19-.98zm5.67 3.17h5.5a.5.5 0 0 0 0-1h-5.5a.5.5 0 0 0 0 1zm0 2h5.5a.5.5 0 0 0 0-1h-5.5a.5.5 0 0 0 0 1zm0 2h5.5a.5.5 0 0 0 0-1h-5.5a.5.5 0 0 0 0 1z" fill="#484848"></path></svg></Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personal;
