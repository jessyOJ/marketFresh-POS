import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    }, 
     tokens:[{
      token:{
          type:String,
      }
  }],
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

// Validate user inputs
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    password: Joi.string().required(),
    email: Joi.string().min(3).max(255).required().email(),
  });
  return schema.validate(user);
}
//authentication
userSchema.methods.generateAuthToken = async function(){
  const user=this
  const token = await jwt.sign({_id:user._id.toString()},'privateKey')
  user.tokens= user.tokens.concat({token})
  await user.save()
  return token 
  }
// Find user by credentials
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('Incorrect email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect email or password');

  return user;
};

// Hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Remove sensitive data before returning
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// Ensure the model is created only once
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
export { validateUser };
