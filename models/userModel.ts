import mongoose from "mongoose"

const inventoryItemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  }
},{_id: true});
const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:[true,"Please provide a username"],
    unique:true
  }
  ,email:{
    type:String,
    required:[true,"Please provide a Email"],
    unique:true
  }
  ,password:{
    type:String,
    required:[true,"Please provide a username"],
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  inventory: [inventoryItemSchema]
})
const User=mongoose.models.users || mongoose.model("users",userSchema)
export default User;