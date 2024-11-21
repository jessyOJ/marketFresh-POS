import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  BASE_URL  from "../config";
import { Form, Input,Row,Col, Button,Typography,message } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import '../resources/login.css'
import { useNavigate ,Link} from 'react-router-dom';
function LoginPage() {
  const dispatch=useDispatch()
  const navigate= useNavigate()
const onFinish=async(values)=>{
const {email,password}=values
const user={email,password}
try {
  dispatch({type:'showLoading'})
  const response = (await axios.post(`${BASE_URL}/api/marketFresh/login`,user)).data
message.success('login successful')


setTimeout(() => {
  localStorage.setItem('pos-user', JSON.stringify(response));
  navigate('/home')
}, 2000);

dispatch({type:'hideLoading'})

} catch (error) {
  dispatch({type:'hideLoading'})
  if(error.response && error.response.status===400){
    const errorMessage =error.response.data||error.response.data.error
    message.error(errorMessage)
  }else{
    message.error('user does not exist')
  }
  
   
  
}
}
useEffect(()=>{
if(localStorage.getItem('pos-user'))
  navigate('/home')
},[])

return (
  <div className='login'
 
  >
<Row justify="center" style={{ width: '100%' }}>
  <Col lg={8} xs={22} md={12}>
  <div
    className= "card p-4 shadow-lg"
    >
      
        <Form
          onFinish={onFinish}
          layout="vertical"
        >
          <h4  className="text-left" style={{ textAlign: "center" }}> MarketFresh-POS</h4>
          <hr/>
          <h3 className="text-left mb-4" style={{ color: "black",textAlign: "left" }}><b>Login</b></h3>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter your Email!' }]}
          >
            <Input className="no-border-input" prefix={<UserOutlined />} placeholder="Email"  />
            
          </Form.Item>
          <Form.Item 
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          
          >
            <Input 
              prefix={<LockOutlined />}
              placeholder="Password" 
             className="no-border-input"
               type="password"
             
            />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center" >
          <p  style={{ color: "#888" }}>
                                    Not yet Registered?  <Link href="/register" style={{ color: "#1890ff" ,textDecoration:"none"}}>Register</Link>
                                </p>
            <Button className="custom-ant-btn ml-2" type="primary" htmlType="submit" block>
              Log In
            </Button>
          </div>
        </Form>
     
    </div> 
  </Col>
</Row>
  </div>
);
};
export default LoginPage;