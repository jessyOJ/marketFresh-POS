import mongoose from "mongoose";

// MongoDB URL
const URL = "mongodb+srv://jessy123:1234567890@cluster0.xk4co.mongodb.net/marketFresh-POS";

// Using async/await for the MongoDB connection
async function connectToDB() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,  // Ensures compatibility with MongoDB
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

// Call the connection function
connectToDB();
export default connectToDB