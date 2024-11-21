import Bill from "../models/billingModel.js";
import express from 'express'
import stripe from 'stripe';
const router = express.Router()

router.post('/makePayment',async(req,res)=>{
  const { totalAmount,token}= req.body
  // code to validate payment
// const customer = await stripe.customers.create({
//     email:token.email,
//     source:token.id
// })
// const payment = await stripe.charges.create({
//     amount:totalAmount*100,
//     currency:'NGN',
//     customer:customer.id,
//     receipt_email:token.email

// },{
//     idempotencyKey:uuidv4()
// })

// if(payment){
  try {
    // Create a charge
    const charge = await stripe.charges.create({
      amount: totalAmount * 100, // Amount in cents
      currency: 'NGN',
      source: token.id, // Token received from Stripe
      description: 'Payment for cart items',
    });

    // Save charge details in your database
    const newPaymentBill = new Bill({
      userId: req.body.userId,
      cartItem: req.body.cartItem,
      subTotal: req.body.subTotal,
      tax: req.body.tax,
      totalAmount: req.body.totalAmount,
      stripeChargeId: charge.id,
    });
    await newPaymentBill.save();

    res.send('Payment successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Payment failed');
  }
});
router.post('/generateBill',async(req,res)=>{
  try {
    const bills = new Bill(req.body)
    await bills.save()
    res.send('bill saved successfully')  
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/getAllBills',async(req,res)=>{
  try {
    const bills = await Bill.find()
    res.send(bills)
    
  } catch (error) {
    res.status(400).send(error)
  }
})
export default router;