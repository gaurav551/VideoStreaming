import React, { useState, useEffect } from 'react'
import { authHeader } from '../../services/Authheader'
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';


export const MyAccount = () => {
    

    const [profile, setProfile] = useState({})
  

   const fetchProfile=()=>{
  

    //with catch
    fetch('api/user/getuser',{
        headers : authHeader()
    }).then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.json();
  })
  .then((data) => {
    setProfile(data);
    console.log("DATA STORED");
  })
  .catch((error) => {
    alert(error)
   
   
  });
}

    useEffect(() => {
         fetchProfile()
    }, [])
    

    console.log(profile);
        
    
    
  
    return (
        <div >
          <br></br>
          <br></br>
        <div className="main-body">
        
             
        
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                        <div className="mt-3">
                          <h4>{profile.firstName}</h4>
                          <p className="text-secondary mb-1">Full Stack Developer</p>
                          <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                          <button className="btn btn-primary">Follow</button>
                          <button className="btn btn-outline-primary">Message</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">FirstName</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                         {profile.firstName}
                          
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">LastName</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                         {profile.lastName}
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">UserName</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {profile.userName}
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {profile.email}
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Mobile</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          (320) 380-4539
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          Bay Area, San Francisco, CA
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-12">
                          <a className="btn btn-info "  href="/">Edit</a>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  
    
    
    
                </div>
              </div>
    
            </div>
        </div>
     
        
    )
}
