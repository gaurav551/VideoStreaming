import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginCheck } from '../Login/LoginCheck'
import { SearchForm } from './SearchForm'
import { SideMenu } from './SideMenu'





export const NavMenu = (props) => {

 const [state, setState] = useState("side_menu")

 const toggleMenu = ()=>
 {
   if(state==='side_menu')
   {
     setState('side_menu active')
   }
   else
   {
     setState('side_menu')
   }
 }
 
  return (
   <Fragment>
     <header>
			<div className="top_bar scroll animated slideInDown">
				<div className="container">
					<div className="top_header_content">
						<div className="menu_logo">
							<a onClick={toggleMenu} title="" style={{fontSize:'25px'}} className="menu">
								<i className="icon-menu"></i>
							</a>
							<Link to={'/'} style={{fontSize:'25px'}} href="#" title="" className="logo">
								NEPALTUBE
							</Link>
						</div>
						<div className="search_form">
							<SearchForm/>
						</div>
						<LoginCheck onLogout={props.onLogout} isLogged={props.isLogged}/>
						<div className="clearfix"></div>
					</div>
				</div>
			</div>
			
		</header>
    <SideMenu onToggle={toggleMenu} class={state} />
  </Fragment>
  )
}
