import express from 'express'
import User,{ validateUser } from '../models/UserModel.js'
import auth from '../middleware/auth.js'
const router =express.Router()


//to register
router.post('/register', async (req, res) => {
    try {
        const validEmail = await User.findOne({ email: req.body.email });
        if (validEmail) {
            return res.status(400).send(`User with email ${validEmail.email} already exists`);
        }
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        let user = new User(req.body)
        // const token = await user.generateAuthToken()
        const result = await user.save()
        // res.status(201).send({result,token})
    
        res.status(200).send('Registration successful');
      
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//to login
router.post('/login',async(req,res)=>{ 
  try{
      const user =await  User.findByCredentials(req.body.email,req.body.password)
  // const token = await user.generateAuthToken()

  // res.send({user,token})
  res.send(user)
  }catch(e){
      res.status(404).send(e.message)
      console.log(e.message)
  }
  
  
  })
router.patch('/:me',auth,async(req,res)=>{
  const {error} = validateUser(req.body)
  if(error) return res.status(404).send(error.details[0].message)

const updates = Object.keys(req.body)
  const validUpdates=['name','email','password']
  const isValid = updates.every((update)=>validUpdates.includes(update))
  if(!isValid)return res.status(400).send('the field does not exist...')



  try{
   
      updates.forEach((update)=>req.user[update]=req.body[update])
      const result =await req.user.save()
      res.send(result)
  }
     
catch(e){
  res.status(404).send(e)
}

})

export default router