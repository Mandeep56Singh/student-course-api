import mongoose, { Document, Schema } from "mongoose";

export interface IUSer extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema<IUSer>(
  {
    email: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUSer>("User", userSchema);
