import express from "express";
import Student from "../models/student.js";

const searchRoute = express.Router();

// Route 0 : searching students by name, tech stack, and bio
searchRoute.get("/students", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required for search.",
      });
    }

    // Search for accounts that match the query in name, tech stack, and bio
    const searchResults = await Student.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search for name
        { techStack: { $elemMatch: { $regex: query, $options: "i" } } }, // Case-insensitive Search for tech stack
        { bio: { $regex: query, $options: "i" } }, // Case-insensitive search for bio
      ],
    });

    return res.json({
      success: true,
      message: "Search results retrieved successfully.",
      results: searchResults,
    });
  } catch (error) {
    console.error("Error searching accounts:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default searchRoute;
