import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { getLoggedInUserEmail } from '../../services/getLoggedInUser';



export const LoginCheck = (props) => {
    const [show, setdispaly] = useState(false)
    const toggleMenu = () => {
        setdispaly(!show)
    }



    const handleLogout = () => {

        props.onLogout()


    }
    // alert(props.isLogged)
    if(props.isLogged)
    {
        return <ul className="controls-lv ">
        <li>
            <a  title=""><i className="icon-message"></i></a>
        </li>
        <li>
            <a  title=""><i className="icon-notification"></i></a>
        </li>
        <li className='user-responsive' >
            <div className="user-ac-img" onClick={toggleMenu}>
                <img src="assets/images/light.jpg" alt="" />
                <i className='user-log'></i>
               
            </div>
            <div className="account-menu" style={{ display: show ? 'block' : 'none' }}
            >
                <h4>{getLoggedInUserEmail()}</h4>
                <div className="sd_menu">
                    <ul className="mm_menu">
                        <li>
                            <span>
                                <i className="icon-user"></i>
                            </span>
                            <Link to='/myaccount' title="">My profile</Link>
                        </li>
                        <li>
                            <span>
                                <i className="icon-user"></i>
                            </span>
                            <Link to='/my-videos' title="">My Videos</Link>
                        </li>
                        <li>
                            <span>
                                <i className="icon-user"></i>
                            </span>
                            <Link to='/upload-your-video' title="">Upload</Link>
                        </li>

                        <li>
                            <span>
                                <i className="icon-settings"></i>
                            </span>
                            <a href="#" title="">Settings</a>
                        </li>
                        <li>
                            <span>
                                <i className="icon-logout"></i>
                            </span>
                            <a onClick={handleLogout}>Sign out</a>
                        </li>
                    </ul>
                </div>
                <div className="sd_menu scnd">
                    <ul className="mm_menu">
                        <li>
                            <span>
                                <i className="icon-light"></i>
                            </span>
                            <a href="#" title="">Dark Theme</a>
                            <label className="switch">
                                <input type="checkbox" />
                                <b className="slider round"></b>
                            </label>
                        </li>



                    </ul>
                </div>

            </div>
        </li>
        <li>
            <Link to='/upload-your-video' title="" className="btn-default">Upload</Link>
        </li>
    </ul>
    }
    else
    {
       return <Link to='/login'  title="" className="btn-default">Login</Link>
    }
}
