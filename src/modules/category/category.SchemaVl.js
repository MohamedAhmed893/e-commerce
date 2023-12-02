import Joi from 'joi'

export const createcategorySchema =Joi.object({
    name:Joi.string().min(3).max(20).required() 
})
export const updatecategorySchema =Joi.object({
    name:Joi.string().min(3).max(20).required() , 
    id:Joi.string().hex().length(24)
})

export const spacificCategorySchema =Joi.object({
    id:Joi.string().hex().length(24)
})