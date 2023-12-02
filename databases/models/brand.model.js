import mongoose from "mongoose";

const brandSchema =mongoose.Schema({
    name:{
        type:String ,
        minlength:[3,"the name to Short"] ,
        required:true ,
        unique:[true ,"the name should be unique"],
        trim:true
    } ,
    user:{
        type:mongoose.Types.ObjectId ,
        ref:'user' 
    } ,
    logo:{
        type:String 
    },
    slug:{
        type:String ,
        lowercase:true ,
        required:true
    }
},{timestamps:true})
brandSchema.post('init',(doc)=>{
    doc.logo =process.env.BASE_URL+'brands/'+doc.logo
})
export const brandModel =mongoose.model('brand',brandSchema)