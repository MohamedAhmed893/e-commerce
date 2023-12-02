import mongoose from "mongoose";

const reviewSchema =mongoose.Schema({
  comment:{
    type:String ,
    trim:true ,
    required:true
  } ,
  user:{
    type:mongoose.Types.ObjectId ,
    ref:"user"
  } ,
  product:{
    type:mongoose.Types.ObjectId ,
    ref:"product"
  } 
},{timestamps:true})
reviewSchema.pre(/^find/,function (){
  this.populate('user','name')
})
export const reviewModel =mongoose.model('review',reviewSchema)