import mongoose, { Document, Schema, Types } from "mongoose";

interface ICourse extends Document {
  title: string;
  description: string;
  credits: number;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    credits: Number,
  },
  {
    timestamps: true,
  }
);
// index for efficient search
courseSchema.index({ title: "text", description: "text" });

export default mongoose.model<ICourse>("Course", courseSchema);
