import { Request, Response } from "express";
import createError from "http-errors";
import { comparePassword, genRefreshToken } from "../helpers";
import { getOtpAndsend, verifyOtp } from "../services/auth-services/generateOTP";
import * as users from "../services/users";

/**
 * controller to register user
 * @param req - request
 * @param res - response
 * @returns - response when user is created and confirmation email is sent
 * @throws - error when user already or validation fails
 */
export const registerUser = async (req: Request, res: Response) => {
  const { email, telephone } = req.body;
  await users.checkUserExist(email, telephone);
  const user: any = await users.createUser({ ...req.body });
  await getOtpAndsend(user._id, email)
  return res
    .status(201)
    .json({ success: true, message: "One time password is sent to your email" });
};

/**
 * controller for verification and generating refresh token
 * @param req - request
 * @param res - response
 * @returns send refresh token
 * @throws
 */
export const verifyCode = async (_req: Request, _res: Response) => {
  const { code } = _req.body;
  const token = await verifyOtp(code);
  _res.status(200).json({ success: true, token: token});
};

/**
 * controller for login user and generating refresh token
 * @param req - request
 * @param res - response
 * @returns send refresh token
 * @throws error when invalid credentials
*/
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: any = await users.findUserByEmail(email);
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new createError.Unauthorized("Invalid credentials");
  }
  const token = genRefreshToken(user._id);
  res.status(200).json({ success: true, token: token });
};

/**
 * controller for getting user
 * @param req - request
 * @param res - response
 * @returns user
 */
export const getUser = async (_req: Request, _res: Response) => {
  const _id = _req.user._id;
  const User = await users.findUserById(_id);
  _res.status(200).json({ success: true, data: User });
};
