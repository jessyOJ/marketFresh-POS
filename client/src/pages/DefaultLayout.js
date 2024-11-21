import React, { useEffect, useState } from 'react';
import {MenuFoldOutlined,MenuUnfoldOutlined,ShoppingCartOutlined, UserOutlined,HomeOutlined,LogoutOutlined,UnorderedListOutlined,CopyOutlined,} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import '../resources/layout.css'
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const { cartItem, loading } = useSelector((state) => state.rootReducer);
  const user = JSON.parse(localStorage.getItem('pos-user'))
  const isAdmin =user.isAdmin===true
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const handleLogout = () => {
    localStorage.removeItem('pos-user'); 
    localStorage.removeItem('cartItem')
    dispatch({ type: 'CLEAR_USER' });
    dispatch({ type: 'CLEAR_CART' });
    navigate('/login');
  };
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
  }, [cartItem]);
  

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical mt-2">
      <h3 
  style={{
    fontSize: collapsed ? '15px' : '24px',
    transition: 'font-size 0.3s ease',
    textAlign: 'center',
    marginLeft:'2px'
  }}
>
  Market
  {collapsed && <span style={{ display: 'block' }}>Fresh</span>}
  {!collapsed && 'Fresh'}
</h3>


 
  </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: '/home',
              icon: <HomeOutlined />,
              label:<Link  style={{ textDecoration: 'none' }} to='/home'>Home</Link>,
            },
            {
              key: '/cart',
              icon: <ShoppingCartOutlined/>,
              label: <Link style={{ textDecoration: 'none' }}to='/cart'>Cart</Link>,
            },
            {
              key: '/bills',
              icon: <CopyOutlined />,
              label: <Link style={{ textDecoration: 'none' }}to='/bills'>Bills</Link>,
            },
            {
              key: 'items',
              icon: <UnorderedListOutlined />,
              label: <Link style={{ textDecoration: 'none' }}to='/items'>Items</Link>,
            },
            ...(isAdmin ? [
              {
                key: 'customers',
                icon: <UserOutlined />,
                label: <Link style={{ textDecoration: 'none' }} to='/customers'>Customers</Link>,
              }
            ] : []),
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 
                <Link style={{ textDecoration: 'none' }}to='/'
                 onClick={handleLogout}>Logout</Link>,
              },
          ]}
        />
      </Sider>
      <Layout>
        {loading && (<div className='spinner '>
          <div className='spinner-border'
          role='status'>

          </div>
        </div>)}
        <Header
          style={{
           
            padding: 10,
            background: colorBgContainer,
          }}
        >
          
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
            
          />
            
           <div className='cartItem d-flex align-items-center ' onClick={()=>navigate('/cart')} > 
           <p className='p-header' style={{color:'#E8AE3C  '}}>Welcome, {user.name}</p>
            <ShoppingCartOutlined className='cart' style={{color:'#E8AE3C  '}} />
            <b><p className='mt-3 mr-2' style={{color:'#E8AE3C  '}}>{cartItem.length}</p></b>
            </div>
          
        </Header>
        <Content
          style={{
            margin: '10px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;