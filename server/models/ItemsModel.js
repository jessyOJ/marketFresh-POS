
import mongoose from 'mongoose'
const itemsSchema = mongoose.Schema({
    name:{
type:String,
required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
},{timestamps:true})
const Item =mongoose.model('items',itemsSchema)
export default Item;