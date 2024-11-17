import { Assignment } from "../model/assignmentModel.js";

export const viewAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      adminId: req.user.id,
    }).populate("userId", "username");
    res.send(assignments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateAssignmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).send({ message: "Assignment not found." });

    if (assignment.adminId.toString() !== req.user.id)
      return res.status(403).send({ message: "Access denied." });

    assignment.status = status;
    await assignment.save();

    res.send({ message: "Assignment status updated successfully." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
