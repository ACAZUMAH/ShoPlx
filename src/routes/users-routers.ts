/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Routes for user authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user and sends a confirmation email upon successful registration.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: johndoe@example.com
 *               telephone:
 *                 type: string
 *                 description: User's telephone number
 *                 example: "+1234567890"
 *               whatsapp_no:
 *                 type: string
 *                 description: User's WhatsApp number
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 description: Password for user account
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: User registered successfully and confirmation email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "confirmation email sent"
 *       400:
 *         description: Bad request, validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User already exists or validation failed"
 */

/**
 * @swagger
 * /auth/otp:
 *   post:
 *     summary: Verify OTP code
 *     description: Verifies the OTP code sent to the user, and returns a token if successful.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The OTP code received by the user
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully, token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: Access token for the user
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid OTP code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired OTP code"
 */

/**
 * @swagger
 * tags:
 *   - name: User Management
 *     description: Routes for user management
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve user information
 *     description: Fetches information about the authenticated user based on the provided token.
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: User information
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ca"
 *                     full_name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     telephone:
 *                       type: string
 *                       example: "+1234567890"
 *                     whatsapp_no:
 *                       type: string
 *                       example: "+1234567890"
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 */

import { Router } from "express";
import {
  getUser,
  registerUser,
  verifyCode,
  loginUser
} from "../controllers/users-control";
import { verifyToken } from "../helpers/index";

const router = Router();

router.post('/auth/register', registerUser);
router.post('/auth/otp', verifyCode);
router.route("/user").get(verifyToken, getUser);
router.post("/auth/login", loginUser);

export default router;
 