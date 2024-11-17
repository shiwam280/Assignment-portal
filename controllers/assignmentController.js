import { Assignment } from "../model/assignmentModel.js";

export const upload = async (req, res) => {
  const { task, adminId } = req.body;

  try {
    const assignment = new Assignment({
      userId: req.user.id,
      task,
      adminId,
    });
    await assignment.save();

    res.status(201).send({ message: "Assignment uploaded successfully." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
