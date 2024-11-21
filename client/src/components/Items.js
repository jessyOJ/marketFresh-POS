import React, { useState } from 'react'
import {Button} from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos';
function Items({item}) {
const dispatch = useDispatch()
const [itemInCart,setItemInCart]= useState()
const navigate = useNavigate()

  function addToCart(){
   
    if(!itemInCart){
      dispatch({type:'addToCart', payload:{...item,quantity:1}})
      setItemInCart(true)
    }else{
navigate('/cart')
    }

  }
  return (
    <div className='item' >
        <h4>{item.name}</h4>
        <img src={item.imgUrl} alt='' width='150px' height='100px'/>
        <h5><b>Price:</b> {item.price}NGN/kg</h5>
        <div className='d-flex justify-content-end'>
            <Button onClick={()=>addToCart()} className='btn'>Add To Cart +</Button>
        </div>

    </div>
  )
}

export default Items