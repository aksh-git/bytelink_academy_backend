import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gravatar: {
      type: String,
    },
    techStack: {
      type: [],
    },
    location: {
      type: String,
    },
    fieldOfInterest: {
      type: [],
    },
    seeking: {
      type: [],
    },
    bio: {
      type: String,
    },
    githuhURL: {
      type: String,
    },
    twitterURL: {
      type: String,
    },
    websiteURL: {
      type: String,
    },
    linkedinURL: {
      type: String,
    },

    // auth purpose
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const student = mongoose.model("student", studentSchema);
export default student;
