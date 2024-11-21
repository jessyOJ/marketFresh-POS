import React, { useState ,useEffect} from 'react'
import StripeCheckout from "react-stripe-checkout";
import { useSelector,useDispatch } from 'react-redux'
import { Button, Modal, Form, Input, Table, message, Select } from "antd";
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons'
import DefaultLayout from './DefaultLayout'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
import '../resources/item.css'
import shortid from 'shortid';
function CartPage() {
    const {cartItem}= useSelector((state)=>state.rootReducer)
    console.log(cartItem);
    const[billChargeModal,setBillChargeModal]= useState(false)
    const[subTotal,setSubTotal]= useState()
    const[totalAmount,setTotalAmount]=useState('')
    const[tax,setTax]=useState('')
    const [loggedInUser, setLoggedInUser] = useState("");
    const [form] = Form.useForm();
const navigate = useNavigate()
    const dispatch= useDispatch()
function addQuantity(record){
dispatch({type:'updateCart' ,payload:{...record,quantity:record.quantity+1}})

}
function removeQuantity(record){
    if(record.quantity!==1)
        dispatch({type:'updateCart', payload:{...record , quantity:record.quantity-1}})
}
function deleteItem(record){
    dispatch({type:'deleteItem',payload:record})


}
useEffect(() => {
 let temp= 0
 cartItem.forEach((item)=>{
    temp= temp + (item.price *item.quantity)
    setSubTotal(temp) 


 })
}, [cartItem])
useEffect(() => {
  const calculatedTax = Number(((subTotal / 100) * 10).toFixed(2));
  setTax(calculatedTax);
  setTotalAmount(subTotal + calculatedTax);
}, [subTotal]);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('pos-user')) || {};
  setLoggedInUser(user.name || "");
  form.setFieldsValue({ customerName: user.name });
}, [])



    const columns =[{
        title:'Name',
        dataIndex:'name'
    },
{
    title:'Image',
    dataIndex:'imgUrl',
    render:(imgUrl,record)=><img src={imgUrl} alt='' height='60px' width='60px'/> 
},{
    title:'Price',
    dataIndex:'price'
},{
    title:'Quantity',
    dataIndex:'_id',
    render:(id,record)=><div>
        <PlusCircleOutlined  className='mx-3' onClick={()=>addQuantity(record)}/>
        {record.quantity}
        <MinusCircleOutlined  className='mx-3' onClick={()=>removeQuantity(record)} />
    </div>
},{
    title:'Action',
    dataIndex:'_id',
    render:(id,record)=><DeleteOutlined onClick={()=>deleteItem(record)}/>
}
]
 async function generate(values){
  setTax(Number(((subTotal/100)*10).toFixed(2)))
  setTotalAmount(Number(subTotal + Number(((subTotal/100)*10).toFixed(2))))
try {
    dispatch({type:'showLoading'})
    const reqObject={
      billId: shortid.generate(),
        ...values,
        subTotal,
        tax,
        totalAmount,
        cartItem,
         userId: JSON.parse(localStorage.getItem('pos-user'))._id,
         userName:JSON.parse(localStorage.getItem('pos-user')).name
    }
    await axios.post("/api/marketFresh/generateBill",reqObject);
    message.success('bill generated successfully')
    dispatch({type:'CLEAR_CART'})
    dispatch({type:'hideLoading'})
    setTimeout(()=>{
      navigate('/bills')
    },2000)
} catch (error) {
    message.error('unsuccessful')
    console.log(error)
}
 }
 async function onToken(token) {
  const paymentDetails ={
    userId:JSON.parse(localStorage.getItem('pos-user'))._id,
    cartItem:JSON.parse(localStorage.getItem('cartItem'))._id,
    subTotal,
    tax,
    totalAmount,
    token
  }
  try {
    dispatch({type:"showLoading"})
    const result = await axios.post("/api/marketFresh/makePayment",paymentDetails)
    dispatch({type:'hideLoading'})
    message.success('payment has been made successfully!').then((result)=>{
window.location.href='/bills'
    })
    

  } catch (error) {
    message.error('unable to make payment at this time,try again later')
    dispatch({type:'hideLoading'})
  }
  
 }
  return (
    <DefaultLayout>
       
        <Table columns={columns} dataSource={cartItem} bordered />
        <hr/>
        <div className='subtotal align-right'>
  {cartItem.length > 0 && (
    <>
      <h3>SUBTOTAL: {Number(subTotal).toFixed(2)} / NGN</h3>
      <p>TAX: {tax} / NGN</p>
      <p>TOTAL AMOUNT: {totalAmount} / NGN</p>
      <Button className='primary sub-btn' onClick={() => setBillChargeModal(true)}>Charge</Button>
    </>
  )}
</div>

    {billChargeModal&&(
        <Modal
        open={billChargeModal}
        footer={false}
        onCancel={() => {
          setBillChargeModal(false)}}
      >
        <Form  layout="vertical" onFinish={generate}  initialValues={{
        customerName: loggedInUser,
      }}>
          <Form.Item
            label="Name"
            name="customerName"
            rules={[
                {required:true,
                    message:"Enter Customer Name!",
                },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
                {required:true,
                    message:"Enter Phone Number!",
                },
            ]}
    
          >
            <Input  />
          </Form.Item>
          <Form.Item
            label="Payment Mode"
            name="paymentMode"
            rules={[
                {required:true,
                    message:"Select a payment method!",
                },
            ]}
          >

            <Select>
              <Select.Option value="debit-card">Debit Card</Select.Option>
           
            </Select>
          </Form.Item>
          
          <div className='modal-subtotal align-left'>
          <h3> SUBTOTAL: {subTotal} / NGN</h3>
<p>TAX: {tax}/NGN</p>
<hr/>
<p>TOTAL AMOUNT:{totalAmount}/NGN</p>
    </div>
    <div>
    <StripeCheckout
   amount={totalAmount * 100}
   currency="NGN"
   token={onToken}
   stripeKey="pk_test_51QAULeGgyEOrbDfLMpnTQ4RzttjmyZpnqNCzF72325rE5DLPiHFaZfL7wkH7OBw7Zea8GA16d8lLqEmNpvlhLy9w004ZvpQGqf"
 >
    <Button className='primary sub-btn'
              type="primary"
              style={{ background: "black" }}
            >
              Pay Now
            </Button>
            </StripeCheckout>
    </div>
    
           
        </Form>
      </Modal>
      )}
    </DefaultLayout>
  )
}

export default CartPage