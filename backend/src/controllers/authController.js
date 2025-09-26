import jwt from "jsonwebtoken";
import User from "../models/User.js";



const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role);
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Prepare user data conditionally
    const userData = { name, email, password, role };

    if (role === 'mentor') {
      const { expertise, availableSlots } = req.body;
      userData.expertise = expertise;
      userData.availableSlots = availableSlots;
    }

    const user = new User(userData); // using new + save
    const userData1 = await user.save();
    console.log(userData1);
    return res.status(201).json({ "message": "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id, user.role), user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { registerUser, loginUser };