import mongoose, { Schema, Types } from "mongoose";

// Schema and Types
interface IStudent {
  name: string;
  email: string;
  age: number;
  department: string;
  addmissionDate: Date;
  enrolledCourse: Types.Array<Types.ObjectId>;
}
const studentSchema: Schema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    department: String,
    addmissionDate: { type: Date, default: Date.now },
    enrolledCourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//  for filtering students based on departments
studentSchema.index({ department: 1 });

// Mongoose Model
export default mongoose.model<IStudent>("Student", studentSchema);
