import React, { Fragment,useCallback, useState, useRef } from 'react';

import {useHistory} from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { openNotification } from '../../components/UI/Notification';
import { setLogin } from '../../services/setLogin';

const Register = (props) => {
  const [state, setState] = useState({ firstName: "", lastName: "", userName: "", email: "",password:"" });
  
  const handleInputChange = (e) => {
   
    setState({ ...state, [e.target.name]: e.target.value });

  };
 
  
  const history = useHistory();
  const routeToPage = useCallback(() => history.push('/'), [history]);

  const { Title } = Typography;
  
  const submitHanlder = (e) =>{
    form.validateFields()
			.then((values) => {
				// Submit values
       submitForm()
				// submitValues(values);
			})
			.catch((errorInfo) => {});
    }

  const submitForm = async()=>{
 
   console.log(JSON.stringify(state))
     var result = await fetch('api/user/register',{
      headers: { 'Content-Type': 'application/json' },
      method:"POST",
    
      body : JSON.stringify(state)
     })
     if(!result.ok)
     {
      openNotification({type:'error',message:"Error Occured ",description:""})
      
     }
     else
     {
       var data = await result.json();
         if(!data.status)
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
     
     //.then(response=> response.json())
    // .then(rd=> 
    //   ({if(rd.status)
    //     {
    //     }
    //   })
      // ((rd.status &&  openNotification({type:'success',message:rd.message,description:""}), setStatus(true), props.onlogin(), routeToPage()),
      // (!rd.status &&  openNotification({type:'error',message:rd.message,description:""}), setStatus(false)))
     
     
       
    // )
    
    // .catch(e=> openNotification({type:'error',message:"Error Occured "+e,description:""}),setStatus(false))
   
  }
  const [form] = Form.useForm();

 


 



  
  return (
    <Fragment>
      <br></br>
      <br></br>
    <div className='card' style={{width:'70%', margin:'0 auto'}}>
      <div className='card-body'>
      <Title level={3}>Register</Title>

        <Form onSubmitCapture={submitHanlder}  form={form} layout="vertical">
        <Form.Item rules={[
            {
              required: true,
              min:4,
              message: 'Please input your firstname!',
            },
          ]} 
          label="Firstname" name="firstName">
          <Input name="firstName" value={state.firstName} onChange={handleInputChange}  placeholder="Firstname" />
          
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              min:4,
              message: 'Please input your Lastname!',
            },
          ]} 
          label="Lastname" name='lastName'>
          <Input name="lastName" value={state.lastName} onChange={handleInputChange}  placeholder=" Lastname" />
          
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              min:6,
              message: 'Please input your Username!',
            },
          ]} 
          label="Username" name='userName'>
          <Input name="userName" value={state.userName} onChange={handleInputChange}    placeholder="Username" />
          
          </Form.Item>

          <Form.Item rules={[
            {
              required: true,
              type:'email',
              
              message: 'Please input your Email!',
            },
          ]} 
          label="Email" value={state.email} name='email'>
          <Input name="email" onChange={handleInputChange}    placeholder="Email" />
          
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
              
                message: 'Please input your password!',
              },
              {
                min: 6,
              
                message: 'Minimum 6 characters required!',
              },
            ]}
            label="Password"
            name='password'>
            <Input.Password name="password" value={state.password} onChange={handleInputChange}    placeholder="Password" />
          </Form.Item>
         
          
          <Form.Item>
            <Button htmlType='submit' type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    </Fragment>
  );
};

export default Register