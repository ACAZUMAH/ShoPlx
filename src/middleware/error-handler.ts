import { Request, Response, NextFunction } from 'express'
import { customError } from '../customErrors/custom-errors'
const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof customError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  //console.log(err)
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

export default errorHandler
