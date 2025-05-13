import mongoose, { Document, Schema } from "mongoose";

interface IUSer {
  name: string;
  password: string;
}

const userSchema: Schema = new Schema<IUSer>(
  {
    name: {
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
userSchema.index({ name: 1 });
export default mongoose.model<IUSer>("User", userSchema);
