import React, { Fragment,useCallback, useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import { openNotification } from '../../components/UI/Notification';
import { setLogin } from '../../services/setLogin';



const Login = (props) => {
  const history = useHistory();
  const routeToPage = useCallback(() => history.push('/'), [history]);

  const [state, setState] = useState({email:'',password:''})

   
  const handleInputChange = (e) => {
   
    setState({ ...state, [e.target.name]: e.target.value });

  };

const { Title } = Typography;
  const submitHanlder = () =>{
    form.validateFields()
    .then((values) => {
      // Submit values
     submitForm()
      // submitValues(values);
    })
    .catch((errorInfo) => {});
  }
  const submitForm = async()=>{
    var result = await fetch('api/user/token',{
      headers: { 'Content-Type': 'application/json' },
      method:"POST",
    
      body : JSON.stringify(state)
     })
     if(!result.ok)
     {
      openNotification({type:'error',message:"Email or Password incorrect ",description:""})
      
     }
     else
     {
       var data = await result.json();
       if(!data.isAuthenticated)
       {
        openNotification({type:'error',message:data.message,description:""})
        
       }
       else
       {
        openNotification({type:'success',message:data.message,description:""})
        setLogin(data.token,data.email)
        
        props.onlogin() 
        routeToPage()

       }
     }
  }
  
  const [form] = Form.useForm();



  return (
    <Fragment>
      <br></br>
      <br></br>
    <div className='card' style={{width:'70%', margin:'0 auto'}}>
      <div className='card-body'>
      <Title level={3}>Sign in to start your session</Title>

        <Form onSubmitCapture={submitHanlder} form={form} layout="vertical">

          <Form.Item rules={[
            {
              required: true,
              type:'email',
              message: 'Please input your email!',
            },
          ]} 
          label="Email/Username" name='Username'>
          <Input onChange={handleInputChange} value={state.email} name='email' placeholder="Email" />
          
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                min:6,
                
                message: 'Please input your password!',
              },
            ]}
            label="Password"
            name='Password'>
            <Input.Password  value={state.password} onChange={handleInputChange} name='password' placeholder="Password" />
          </Form.Item>
          
          <Form.Item>
            <Button htmlType='submit' type="primary">Log in</Button>
          </Form.Item>
        </Form>
        <p>Dont have account? <Link to='/register'>Register Here</Link></p>
      </div>
    </div>
    <br></br>
      <br></br><br></br>
      <br></br><br></br>
      <br></br><br></br>
      <br></br><br></br>
      <br></br>
    </Fragment>
  );
};

export default Login