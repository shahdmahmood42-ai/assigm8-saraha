import { Router } from "express";
import * as US from "./user.service.js";
import { authentication } from "../../commen/middleware/authentication.js";
import { authorization } from "../../commen/middleware/authorization.js";
import { RoleEnum } from "../../commen/enum/user.enum.js";
// import { multerLocal } from "../../commen/middleware/multer.js";
import { validation } from './../../commen/middleware/validation.js';
import { signInSchema, signUpSchema } from './user.validation.js';

const userRouter = Router();

userRouter.post("/signup" , validation(signUpSchema) ,US.signUp);
userRouter.post("/signup/gmail", US.signUpWithGmail);
userRouter.post("/signin", validation(signInSchema) ,US.signin);
userRouter.get("/profile", authentication ,authorization(RoleEnum.user) , US.getprofile );
export default userRouter;
