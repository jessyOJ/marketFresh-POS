import React from 'react';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import DefaultLayout from './pages/DefaultLayout';
import CartPage from './pages/CartPage';
import ItemsPage from './pages/ItemsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BillPage from './pages/BillPage';
import CustomerPage from './pages/CustomerPage';
import ClearDataOnClose from './components/ClearDataOnClose';
import LandingPage from './pages/LandingPage';
import ItemsLandingPage from './pages/ItemsLandingPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/cart' element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
        <Route path='/items' element={<ProtectedRoute><ItemsPage/></ProtectedRoute>}/>
        <Route path='/login'element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/showItems' element={<ItemsLandingPage/>}/>
        <Route path='/bills' element={<ProtectedRoute><BillPage/></ProtectedRoute>}/>
        <Route path='/customers' element={<ProtectedRoute><CustomerPage/></ProtectedRoute>}/>
       
      </Routes>

      </BrowserRouter>

      
    </div>
  );
}

export default App;

export function ProtectedRoute({children}){
if(localStorage.getItem('pos-user')){
  return children
}else{
  return <Navigate to='/login'/>
}
}
