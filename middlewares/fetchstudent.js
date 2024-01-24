import jwt from "jsonwebtoken";

let success = false;

const fetchstudent = (req, res, next) => {
  // Get the student from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    success = false;
    res.status(401).json({
      success: success,
      error: "Please authenticate using a valid token.",
    });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.student = data.student;
    next();
  } catch (error) {
    success = false;
    res.status(401).json({
      success: success,
      error: "Please authenticate using a valid token.",
    });
  }
};

export default fetchstudent;
