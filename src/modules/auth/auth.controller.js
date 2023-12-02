import { userModel } from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendToEmail } from "../mails/send.message.js";
const signUp = catchAsyncError(async (req, res, next) => {
    const isFound = await userModel.findOne({ email: req.body.email })
    if (isFound) return next(new AppError("Account Already Exist", 409))
    const user = new userModel(req.body)
    await user.save()
    sendToEmail({email:req.body.email})
    res.json({ message: "success", user })
})

const signIn = catchAsyncError(async (req, res, next) => {
    const isFound = await userModel.findOne({ email: req.body.email })

    if (!isFound || !(await bcrypt.compare(req.body.password, isFound.password))    || !isFound.confirmEmail) return next(new AppError("Account Not Found or Wrong password", 409))
    let token = jwt.sign({ name: isFound.name, userId: isFound._id, role: isFound.role }, 'mohamed123458')
    res.json({ message: "success", token })
})
const verfiy = catchAsyncError(async (req, res, next) => {
    const { token } = req.params
    jwt.verify(token, 'email123456', async function (err, decoded) {
        if (err) return next(new AppError(err, 403))

        await userModel.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true })
        res.json({ message: 'success' })
    });
})

const protectedRoutes = catchAsyncError(async (req, res, next) => {
    const { token } = req.headers
    if (!token) return next(new AppError("TOKEN MUST BE PROVIDED", 401))
    const decoded = await jwt.verify(token, 'mohamed123458')
    const user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError("Invalid Token", 401))
    if (user.changedAt) {
        const changedDate = parseInt(user.changedAt.getTime() / 1000)
        if (changedDate > decoded.iat) return next(new AppError("Invalid Token", 401))
    }
    req.user = user
    next()
})

const allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new AppError("You are not authorized to access this route you are " + req.user.role, 401))
        next()

    })
}

export {
    signIn,
    signUp,
    verfiy,
    protectedRoutes ,
    allowedTo
}