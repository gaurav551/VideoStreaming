import React from 'react';
import { Footer } from './Footer';
import { NavMenu } from './NavMenu';

const Layout = (props) => {
  

  
    return (
      <div className="hp_1">

        <NavMenu onLogout={props.onLogout} isLogged={props.isLogged} />
        
      
          <br></br>
          <br></br>
          
          <br></br>
          {props.children}
     
        <Footer/>
      </div>
    );
  
}
export default Layout;
