import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        studentId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        mentorId: {
             type: mongoose.Schema.Types.ObjectId, 
             ref: "User", 
             required: true 
        },
        topic: { 
            type: String, 
            required: true 
        },
        time: { 
            type: String, 
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "declined", "rescheduled"],
            default: "pending"
        }
    },
    { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;