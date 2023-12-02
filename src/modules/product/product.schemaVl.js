import Joi from 'joi'

export const createcategorySchema =Joi.object({
    title:Joi.string().min(3).max(20).required() ,
    description:Joi.string().min(3).max(20).required() ,
    price:Joi.number().required() ,
    priceAfterDiscount:Joi.number() ,
    imgCover:Joi.string() ,
    imgs:Joi.string() ,
    quantity:Joi.number().required() ,
    sold:Joi.number().required(),
    rating:Joi.number() ,
    rateAverage:Joi.number() ,
    category:Joi.string().hex().length(24).required() ,
    subcategory:Joi.string().hex().length(24).required() ,
    brand:Joi.string().hex().length(24).required() 
})

export const spacificproductSchema =Joi.object({
    id:Joi.string().hex().length(24)
})

export const updateProductSchema=Joi.object({
    id:Joi.string().hex().length(24) ,
    title:Joi.string().min(3).max(20) ,
    description:Joi.string().min(3).max(20) ,
    price:Joi.number(),
    priceAfterDiscount:Joi.number() ,
    imgCover:Joi.string() ,
    imgs:Joi.string() ,

})