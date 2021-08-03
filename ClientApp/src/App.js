import React,{useState,useEffect} from 'react';
import 'antd/dist/antd.css';
import { Route } from 'react-router';
import  Layout  from './components/Layout/Layout';
import { Home } from './pages/Home';
import './custom.css'
import Login  from './pages/user/Login';
import Register from './pages/user/Register';
import { openNotification } from './components/UI/Notification';
import { MyAccount } from './pages/user/MyAccount';
import { MyVideos } from './pages/user/Video/MyVideos';
import { VideoUpload } from './pages/user/Video/VideoUpload';
import { Watch } from './components/Video/Watch';
import { Search } from './components/Video/Search';

  const App = () => {

   
    const [isLogged, setisLogged] = useState(false)
    const logout = ()=>{
      localStorage.clear('login');
      setisLogged(false);
      openNotification({type:'success',message:"You are logged out!",desc:''})
    }
    const login = ()=>{
      if(localStorage.getItem('login')){
      setisLogged(true)
      }
      else
      {
        setisLogged(false)
      }
    }
    useEffect(() => {
      login()
     
    }, [isLogged])

        return (
      <Layout isLogged={isLogged} onLogout={logout}>
        <Route exact path='/' component={Home} />
        <Route exact path='/Login'> <Login onlogin={login}/> </Route>
        <Route exact path='/Register'> <Register onlogin={login}/> </Route>  
        <Route exact path='/myaccount'><MyAccount/></Route>
        <Route exact path='/my-videos'><MyVideos/></Route>
        <Route exact path='/upload-your-video'><VideoUpload/></Route>
        <Route exact path="/search/:id" component={Search}/>
        
        <Route
          exact
          path="/watch/:id"
          component={Watch}
        />
        
       
      </Layout>
    );
  
  
}
export default App;
