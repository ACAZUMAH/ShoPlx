import { Router } from "express";
import { checkSchema } from "express-validator";
import { registerationSchema } from "../middleware/userValidationSchema";
import { confirmUser, getUser, registerUser } from "../controllers/users-control";
import { verifyToken,verifyEmailToken } from "../services/auth-services/gen-tokens";

const router = Router()

router.route('/signup').post(checkSchema(registerationSchema), registerUser)
router.route('/confirm-email/:token').get(verifyEmailToken, confirmUser)
router.route('/get-user').get(verifyToken, getUser)

export default router