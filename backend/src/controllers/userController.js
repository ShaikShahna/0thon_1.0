import User from "../models/User.js";

// Get mentors by topic search
const getMentors = async (req, res) => {
  try {
    const { topic } = req.query; // student provides ?topic=math for example

    if (!topic) {
      return res.status(400).json({ message: "Topic query is required" });
    }

    // Search mentors who have this topic in their expertise/subjects array
    const mentors = await User.find({
      role: "mentor",
      subjects: { $regex: topic, $options: "i" } // case-insensitive search
    }).select("-password");

    if (mentors.length === 0) {
      return res.status(404).json({ message: "No mentors found for this topic" });
    }

    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getMentors };