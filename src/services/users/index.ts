import user from "../../models/schemas/user";
import { hashPasswrord } from "../../helpers/index";
import { userType, updateType } from "../Types/index";
import createError from "http-errors";
import validateUserData from "./validateUserData";
import { createAuth } from "./auth";
import { Types } from "mongoose";

/**
 * creates a new user account in the database
 * @param data - user data
 * @returns returns user id
 * @throws throws error if user already exists
 */
export const createUser = async (data: userType) => {
  await validateUserData(data);

  const hash = await hashPasswrord(data.password);
  const newUser = await user.create({
    ...data,
    password: hash,
  });

  if (!newUser) {
    throw new createError
    .InternalServerError("unable to create account");
  }
  await createAuth(newUser._id);
  return newUser;
};

/**
 * check if user exists
 * @param email - user email
 * @throws throws error if user already exists
 */
export const checkUserExist = async (email: string, phone: string) => {
  if (await user.findOne({ email, phone })) {
    throw new createError.BadRequest("User already exists");
  }
};

/**
 * find user by id
 * @param _id - user id
 * @returns returns user
 * @throws error when user not found
 */
export const findUserById = async (_id: string) => {
  if (!Types.ObjectId.isValid(_id)) {
    throw new createError.BadRequest("Invalid user id");
  }
  return await user.findById(_id);
};

export const findUserByEmail = async (email: string) => {
  if(!await user.findOne({ email })) {
    throw new createError.NotFound("User not found");
  };
  return await user.findOne({ email });
};

/**
 * find one user and update
 * @param _id - user id
 * @param full_name - user full name
 * @param email - user email
 * @param telephone - user telephone number
 * @param whatsup - user whatsup number
 * @returns true
 * @throws error when user is not found
 */
export const findOneAndUpdate = async (data: updateType) => {
  if (data._id) {
    if (!Types.ObjectId.isValid(data._id)) {
      throw new createError.BadRequest("Invalid user id");
    }
    await user.findByIdAndUpdate({ _id: data._id }, { isAuthenticated: true });
  }
  return true;
};
