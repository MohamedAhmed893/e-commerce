import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: [3, "this title too short"],
        trim: true,
        unique: [true, "Title Must be Unique"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default:0 ,
        min:0 ,
        required: true
    },
    priceAfterDiscount: {
        type: Number
    },
    imgCover: {
        type: String
    },
    imgs: [{ type: String }],
    slug:{
        type:String ,
        lowercase:true ,
        required:true
    } ,
    quantity:{
        type:Number ,
        default:0 ,
        min:0 ,
        required: true 
        
    },
    sold:{
        type:Number ,
        default:0
    }  ,
    rating:{
        type:Number ,
        default:0
    } ,
    rateAverage:{
        type:Number ,
        min:[1,"the avervage must be langer than 1"] ,
        max:[5,"the avervage must be less than 1"] 
    } ,
    category:{
        type:mongoose.Types.ObjectId ,
        ref:"category"
    },
    subcategory:{
        type:mongoose.Types.ObjectId ,
        ref:"subcategory"
    },
    brand:{
        type:mongoose.Types.ObjectId ,
        ref:"brand"
    },
    user:{
        type:mongoose.Types.ObjectId ,
        ref:"user"
    }

   

}, { timestamps: true , toJSON: { virtuals: true }})
productSchema.post('init',(ele)=>{
    ele.imgCover=process.env.BASE_URL+'product/'+ele.imgCover
    ele.imgs=ele.imgs.map((ele)=>process.env.BASE_URL+'product/'+ele)

})

productSchema.virtual('myReviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product'
  });
  productSchema.pre(/^find/,function (){
    this.populate('myReviews')
  })
export const productModel = mongoose.model('product', productSchema)