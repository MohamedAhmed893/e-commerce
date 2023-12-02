import Joi from 'joi'

export const createbarndSchema =Joi.object({
    name:Joi.string().min(3).max(20).required() ,
    logo:Joi.string() ,
    createdBy:Joi.string().hex().length(24)
})
export const updateSchema =Joi.object({
    name:Joi.string().min(3).max(20).required() ,

    id:Joi.string().hex().length(24)
})

export const spacificbrandSchema =Joi.object({

    id:Joi.string().hex().length(24)
})