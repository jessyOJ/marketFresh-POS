import express from 'express'
import Item from '../models/ItemsModel.js'
const router = express.Router()

router.post('/createItem',async(req,res)=>{
const item = new Item(req.body)
await item.save()
res.status(201).send('item saved successfully')
})
 router.get('/getAllItems',async(req,res)=>{
    try {
        const item = await Item.find({})
    res.status(200).send(item)
    } catch (error) {
        res.status(400).send(error)
    }
    
 })
 router.post('/deleteItem',async(req,res)=>{
   try {
    await Item.findOneAndDelete({_id:req.body._id},req.body)
    res.status(200).send('item deleted successfully')
   } catch (error) {
    res.status(400).send(error)
   }
 })
 router.post('/editItem',async(req,res)=>{
    try {
        await Item.findOneAndUpdate({_id:req.body._id},req.body)
    res.status(200).send('item edited successfully')
    } catch (error) {
        res.status(400).send(error)
    }
 })

export default router;

