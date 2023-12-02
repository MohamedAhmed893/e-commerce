import mongoose from "mongoose";

const subcategorySchema =mongoose.Schema({
    name:{
        type:String ,
        minlength:[3,"the name to Short"] ,
        required:true ,
        unique:[true ,"the name should be unique"],
        trim:true
    } ,
    slug:{
        type:String ,
        lowercase:true ,
        required:true
    } ,
    user:{
        type:mongoose.Types.ObjectId ,
        ref:'user' 
    } ,
    category:{
        type:mongoose.Types.ObjectId ,
        ref:'category' ,
        required:true
    } 

},{timestamps:true})

export const subcategoryModel =mongoose.model('subcategory',subcategorySchema)