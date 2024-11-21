import React,{useEffect} from 'react';
import axios from 'axios';
import { Form, Input,Row,Col, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import '../resources/auth.css'
import { useNavigate } from 'react-router-dom';
function RegisterPage() {
    const dispatch = useDispatch();
    const navigate =useNavigate()

    const onFinish = async (values) => {
        const { name, email, password, confirmPassword } = values;

        if (password !== confirmPassword) {
            message.error('Passwords do not match, try again');
            return;
        }

        const user = { name, email, password };

        try {
            dispatch({ type: 'showLoading' });
            const response = await axios.post('/api/marketFresh/register', user);
            message.success('Registration successful');
            setTimeout(() => {
                navigate('/login')
              }, 2000);
        } catch (error) {
          if(error.response && error.response.status===400){
            const errorMessage = error.response.data.error || error.response.data;
            message.error(errorMessage);
        }
        }
           finally {
            dispatch({ type: 'hideLoading' });
        }
    };
    useEffect(()=>{
        if(localStorage.getItem('pos-user'))
          navigate('/home')
        },[])
    return (
        <div className=" auth" >
         <Row className='row' justify="center" style={{ width: '100%' }}>
  <Col lg={8} xs={22} md={12}>
  <div
    className= "card p-4 shadow-lg"
    >
          
          
                
            <Form layout="vertical" onFinish={onFinish}>
            <h3 className="text-left mb-4" style={{ color: "black",textAlign: "center" }}><b>Register</b></h3>
            
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                           <Input placeholder="Name" className="no-border-input" />

                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email' },
                            ]}
                        >
                            <Input placeholder="Email" className="no-border-input" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password' }]}
                        >
                            <Input placeholder="Password"   type="password" className="no-border-input"/>
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match'));
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Confirm Password"  type="password" className="no-border-input" />
                        </Form.Item>
                        
                        <div className="d-flex justify-content-between align-items-center">
                                <p  style={{ color: "#888" }}>
                                    Already have an account? <a href="/login" style={{ color: "#1890ff" ,textDecoration:"none"}}>Sign in</a>
                                </p>
                                <Button className="custom-ant-btn ml-2  "
                                type="primary"
                                htmlType="submit"
                                block  
                        
                            >
                                Register
                            </Button>
                            </div>
                    </Form>
                    
                    </div>
            </Col>
          </Row>
         
        </div>
    );
}

export default RegisterPage;
