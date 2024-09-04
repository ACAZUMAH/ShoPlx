import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

/**
 * error handler middleware
 * @param err - error
 * @param req - request
 * @param res - response
 * @param next - nextfunction
 * @returns error response
 */
const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (createError.isHttpError(err)) {
    return res.status(err.statusCode).send({errors: [{msg: err.message}]})
  }
  return res.status(500).json({ msg: 'Internal Server Error' })
}

export default errorHandler
