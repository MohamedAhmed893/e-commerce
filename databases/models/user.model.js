import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
   name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      trim: true,
      required: true
   },
   age: {
      type: Number,
      min: 10,
      max: 80,
      required: true
   },
   email: {
      type: String,
      minlength: 2,
      maxlength: 100,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   changedAt:Date,
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
   },
   wishlist:[{type:mongoose.Types.ObjectId,ref:'product'}] ,
   addresses:[{
      street:String ,
      city:String ,
      phone:Number
   }] ,
   isActive: {
      type: Boolean,
      default: true
   },
   confirmEmail: {
      type: Boolean,
      default: false
   },
   profilePc: String
}, { timestamps: true })

userSchema.pre('save',function(){
   this.password =bcrypt.hashSync(this.password ,7)
   
})
userSchema.pre('findOneAndUpdate', function () {
   if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
})

export const userModel = mongoose.model('user', userSchema)