import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  task: { type: String, required: true },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Assignment = mongoose.model("Assignment", assignmentSchema);
