
import Joi from "joi";

export const createUserSchemaVL= Joi.object({
    name:Joi.string().min(3).max(20).required() ,
    age:Joi.number().required() ,
    email:Joi.string().email().required() ,
    role:Joi.string().min(3).max(20),
    password:Joi.string().pattern(/^[A-Za-z0-9]{3,20}/).required(),
    repassword:Joi.ref('password')
})
export const updateUserSchemaVL= Joi.object({
    id:Joi.string().hex().length(24) ,
    name:Joi.string().min(3).max(20) ,
    age:Joi.number() ,
    email:Joi.string().email() ,
    password:Joi.string().pattern(/^[A-Za-z0-9]{3,20}/)
})
export const spacificUserSchemaVL= Joi.object({
    id:Joi.string().hex().length(24) 
})
