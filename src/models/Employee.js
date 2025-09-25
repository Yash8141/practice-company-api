import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    dob: { type: Date },
    city: { type: String },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // FK
    login: { type: mongoose.Schema.Types.ObjectId, ref: "Login" },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", EmployeeSchema);
