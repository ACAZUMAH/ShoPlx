import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    telephone: { type: String, required: true },
    whatsapp_no: { type: String, required: true },
    password: { type: String, required: true },
    isAuthenticated: { type: Boolean, default: false, },
  },
  {
    timestamps: true,
  }
);

const authSchema = new Schema(
  {
    user_id: { ref: 'users', type: Types.ObjectId, required: true },
    code: { type: String },
    expiresIn: { type: Date, default: Date.now() + 1 * 60 * 60000 },
  }
)

const user = model("users", userSchema);
export const auth = model("auth", authSchema);
export default user;
