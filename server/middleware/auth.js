import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer','').trim()
        const decoded = jwt.verify(token,'privateKey') 
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user)throw new Error
        
        req.token=token
        req.user=user
        next()
    }catch(e){
        console.error('Authorization Error:', e.message);
res.status(401).send({error:'no authorization'})
    }
   
}
export default auth;
