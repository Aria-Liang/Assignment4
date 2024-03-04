const express = require("express");
const data = require("../database/student-info.json");
const studentInfo = express.Router();

// console.log(data, "this is our data");

//our routes/endpoints/crud operation

/*
1. GET(fetch all student-info)
2. POST to retrieve your information based on 'student-id'
3. POST to retrieve student's info who has taken CS548 -> the result should be all students ( return student-id only)
4. POST to retrieve who has taken the courses you have taken except CS548.
*/

//1. GET(fetch all student-info)
studentInfo.get("/student-info", (req, res) => {
  //no request because there is no request from client side
  //just send the data which is needed in this case it's data
  res.json(data);
});

//2. POST to retrieve your information based on 'student-id'
studentInfo.post("/retrieve-student", (req, res) => {
  const { Student_id } = req.body;
  const student = data.find((s) => s.student_id === Student_id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).send("Student not found");
  }
});

//3. POST to retrieve student's info who has taken CS548 -> the result should be all students ( return student-id only)
studentInfo.post("/students-cs548", (req, res) => {
  const studentsCs548 = data
    .filter((student) =>
      student.courses.some((course) => course.course_id === "CS548")
    )
    .map((student) => student.student_id);

  res.json(studentsCs548);
});

//4. POST to retrieve who has taken the courses you have taken except CS548.
studentInfo.post("/shared-courses", (req, res) => {
  const { studentId } = req.body;

  const requestingStudent = data.find(
    (student) => student.student_id === studentId
  );
  if (!requestingStudent) {
    return res.status(404).send("Student not found");
  }

  const courseIds = requestingStudent.courses
    .filter((course) => course.course_id !== "CS548")
    .map((course) => course.course_id);

  const sharedStudentIds = new Set();

  data.forEach((student) => {
    student.courses.forEach((course) => {
      if (
        courseIds.includes(course.course_id) &&
        student.student_id !== studentId
      ) {
        sharedStudentIds.add(student.student_id);
      }
    });
  });

  res.json([...sharedStudentIds]);
});

module.exports = studentInfo;
