import Session from "../models/Session.js";

// Student books a session
const bookSession = async (req, res) => {
  try {
    const session = new Session({
      studentId: req.user.id,
      mentorId: req.body.mentorId,
      topic: req.body.topic,
      time: req.body.time
    });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mentor updates session status
const updateSessionStatus = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.status = req.body.status || session.status;
    await session.save();

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student's sessions
const getStudentSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ studentId: req.user.id }).populate("mentorId", "name expertise");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mentor's sessions
const getMentorSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ mentorId: req.user.id }).populate("studentId", "name email");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { bookSession, updateSessionStatus, getStudentSessions, getMentorSessions };