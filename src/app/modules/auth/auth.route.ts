import express, { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

const router = express.Router()

router.post(
  '/signup',
  catchAsync(async (req: Request, res: Response) => {
    const { ...userData } = req.body
    const result = await UserController.createUser(userData)

    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'User is created successfully',
      data: result,
    })
  }),
)
