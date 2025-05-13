import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { UserType } from "../validator/userValidation.schema.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";

export const registerService = async (data: UserType["body"]) => {
  const { email, password } = data;
  const existingEmail = await userModel.findOne({ email });

  if (existingEmail) {
    throw new BadRequestError("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({ email, password: hashedPassword });
  await newUser.save();

  return newUser;
};

export const loginService = async (data: UserType["body"]) => {
  const { email, password } = data;
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new NotFoundError("User doesn't  exists");
  }

  const isPasswordCorrect = bcrypt.compare(password, user!.password)

  if(!isPasswordCorrect) {
    throw new BadRequestError("Password incorrect")
  }



};

