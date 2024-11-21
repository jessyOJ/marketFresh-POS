import mongoose from 'mongoose'
import shortid from 'shortid'
const billSchema=mongoose.Schema({
    billId:{
        type:String,
        default: shortid.generate,
        unique:true,
        required:true
    },
paymentMode:{
    type:String,
    required:true
},

customerName:{
    type:String,
    required:true
},

phoneNumber:{
    type:String,
    required:true
},
subTotal:{
    type:Number,
    required:true
},
tax:{
    type:Number,
    required:true
},
totalAmount:{
    type:String,
    required:true
},
userId:{
    type:String,
    required:true
    
},
cartItem:{
    type:Array,
    required:true
},
userName:{
    type:String,
    required:true
}
},{timestamps:true})
const Bill= mongoose.model('bills',billSchema)
export default Bill;