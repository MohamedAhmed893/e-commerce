import Joi from "joi";

export const addReviewSchema =Joi.object({
    comment:Joi.string().min(2).max(20).required() ,
    product:Joi.string().hex().length(24).required() ,
    user:Joi.string().hex().length(24)
})

export const reviewSchemaVl =Joi.object({
    id:Joi.string().hex().length(24).required() ,
    comment:Joi.string().min(2).max(20)
})