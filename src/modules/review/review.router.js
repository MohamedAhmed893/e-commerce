import express from 'express'
import * as reviews from './review.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { validation } from '../../middleware/validation.js'
import { addReviewSchema, reviewSchemaVl } from './review.SchemaVl.js'

const reviewRouter =express.Router()
reviewRouter.route('/').post(protectedRoutes,allowedTo('user','admin') ,validation(addReviewSchema),reviews.addReview).get(reviews.getAllReview)
reviewRouter.route('/:id').get(validation(reviewSchemaVl),reviews.getSpacificReview).put(protectedRoutes,allowedTo('user','admin') ,validation(reviewSchemaVl),reviews.updateReview).delete(protectedRoutes,allowedTo('user','admin') ,validation(reviewSchemaVl),reviews.deleteReview)

export default reviewRouter