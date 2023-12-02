import Joi from 'joi'

export const createsubcategorySchema =Joi.object({
    name:Joi.string().min(3).max(20).required() 
})
export const updatesubcategorySchema =Joi.object({
    name:Joi.string().min(3).max(20).required() , 
    id:Joi.string().hex().length(24)
})

export const spacificsubCategorySchema =Joi.object({
    id:Joi.string().hex().length(24)
})