import { Router } from "express";
import Student from "../models/student.js";
import fetchstudent from "../middlewares/fetchstudent.js";

const studentRoute = Router();

// ROUTE 0 : get all students list
studentRoute.get("/getStudents", async (req, res) => {
  try {
    // Parse the 'from' parameter as an integer, default to 0 if not provided
    const fromIndex = parseInt(req.query.from) || 0;

    // Query the database to get students starting from the specified index
    const students = await Student.find()
      .skip(fromIndex)
      .limit(10)
      .select("-email -password")
      .exec();

    return res.json({
      success: true,
      message: "Students retrieved successfully.",
      students: students,
    });
  } catch (error) {
    console.error("Error retrieving students:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// ROUTE 1: get student details by ID
studentRoute.get("/getStudentByID", async (req, res) => {
  try {
    var studentId = req.query.id;
    if (studentId.length < 10) {
      res.status(200).json({ success: false, message: "Invalid Id" });
    }
    const student = await Student.findById(studentId).select(
      "-password -email"
    );
    if (student) {
      res.status(200).json({ success: true, data: student });
    } else {
      res.status(200).json({ success: false, data: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ROUTE 2 : get current logged in student details --login required
studentRoute.get("/getLoggedInStudent", fetchstudent, async (req, res) => {
  try {
    var studentId = req.student.id;
    const student = await Student.findById(studentId).select("-password");
    if (student) {
      res.status(200).json({ success: true, data: student });
    } else {
      res.status(200).json({ success: false, data: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//ROUTE 3 : Update student --login required
studentRoute.post("/updateStudent", fetchstudent, async (req, res) => {
  try {
    let studentId = req.student.id;
    const updateData = req.body.updateData;
    console.log(updateData);

    if ("email" in updateData || "password" in updateData) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot update email or password" });
    }

    let student = await Student.findByIdAndUpdate(studentId, updateData).select(
      "-password"
    );
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default studentRoute;
