import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import Student from "../models/student.js";
import jwt from "jsonwebtoken";

const authRoute = Router();

// ROUTE 0: student login
authRoute.post(
  "/login",
  [
    body("email", "Please provide a valid email.").isEmail(),
    body("password", "Please provode a valid password.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
        message: errors.array()[0].msg,
      });
    }
    const { email, password } = req.body;
    try {
      const student = await Student.findOne({ email: email });
      if (!student) {
        return res.status(400).json({
          success: false,
          message: "Please Login with correct credentials",
        });
      }
      const passComp = await bcrypt.compare(password, student.password);
      if (!passComp) {
        return res.status(400).json({
          success: false,
          message: "Please Login with correct credentials",
        });
      }
      const data = {
        student: {
          id: student.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.json({ success: true, authtoken: authtoken, data: data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }
  }
);

// ROUTE 1: register new student
authRoute.post(
  "/register",
  [
    body("email", "Please provide a valid email.").isEmail(),
    body("fullname", "Please provide a valid firstname.").isLength({ min: 2 }),
    body("password", "Please provode a valid password.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
        message: errors.array()[0].msg,
      });
    }
    const { email, fullname, password } = req.body;
    try {
      const studentWemail = await Student.findOne({ email: email });
      if (studentWemail) {
        return res.status(400).json({
          success: false,
          message: "Sorry a student with this email already exist.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      //creating a new student
      const newstudent = await Student.create({
        email: email,
        name: fullname,
        password: secPass,
      });

      const data = {
        student: {
          id: newstudent.id,
        },
      };
      //giving authtoken for next 24 hour
      const authtoken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.json({ success: true, authtoken: authtoken });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }
  }
);

export default authRoute;
