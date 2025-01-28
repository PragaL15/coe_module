import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function PatientForm({
  goToStepper = () => {},
  exitStepper = () => {},
}) {
  const [faculty_id, setFaculty_id] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semesterCode, setSemesterCode] = useState("");
  const [department, setDepartment] = useState("");
  const [papers_left, setPapersLeft] = useState(0);
  const [reason, setReason] = useState(""); 

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [pendingPapersOptions, setPendingPapersOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [facultyData, setFacultyData] = useState([]); 

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData(
      "http://localhost:4000/api/FacultyRecordsDisplay",
      setFacultyOptions,
      "faculty_id",
      "faculty_id",
      setFacultyData
    );
    fetchData(
      "http://localhost:4000/api/semOption",
      setSemesterOptions,
      "sem_code",
      "sem_code"
    );
    fetchData(
      "http://localhost:4000/api/deptOption",
      setDepartmentOptions,
      "dept_name",
      "dept_name"
    );
    
    fetchCourses();
  }, []);

  const fetchData = async (url, setOptions, labelKey, valueKey, setData) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      const data = await response.json();
      const options = data.map((item) => ({
        label: item[labelKey],
        value: item[valueKey],
      }));
      setOptions(options);

      if (setData) setData(data); 
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  const fetchCourses = async () => {
    try {
      const facultyResponse = await fetch(
        "http://localhost:4000/api/FacultyRecordsDisplay"
      );
      if (!facultyResponse.ok)
        throw new Error("Failed to fetch course data from FacultyRecordsDisplay");

      const facultyData = await facultyResponse.json();
      const courseIds = facultyData.map((item) => item.course_id);

      const courseResponse = await fetch(
        "http://localhost:4000/api/courseOption"
      );
      if (!courseResponse.ok)
        throw new Error("Failed to fetch data from courseOption");

      const courseData = await courseResponse.json();

      const courseMap = courseData.reduce((acc, item) => {
        acc[item.course_id] = item.course_name;
        return acc;
      }, {});

      const options = courseIds.map((id) => ({
        label: courseMap[id] || `Unknown Course (${id})`,
        value: id,
      }));

      setCourseOptions(options);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleFacultyOrCourseChange = () => {
    if (faculty_id && courseCode) {
      const filteredRows = facultyData.filter(
        (row) =>
          row.faculty_id === faculty_id &&
          row.course_id === courseCode
      );

      const semesterSet = new Set();
      const departmentSet = new Set();
      const paperPendingSet = new Set();

      filteredRows.forEach((row) => {
        semesterSet.add(row.sem_code);
        departmentSet.add(row.dept_id);
        paperPendingSet.add(row.paper_pending);
      });

      const semesterOptions = Array.from(semesterSet).map((sem_code) => ({
        label: sem_code,
        value: sem_code,
      }));

      const departmentOptions = Array.from(departmentSet).map((dept_id) => ({
        label: dept_id,
        value: dept_id,
      }));

      const pendingPapersOptions = Array.from(paperPendingSet).map(
        (paper_pending) => ({
          label: paper_pending,
          value: paper_pending,
        })
      );

      setSemesterOptions(semesterOptions);
      setDepartmentOptions(departmentOptions);
      setPendingPapersOptions(pendingPapersOptions); 
    }
  };

  useEffect(() => {
    handleFacultyOrCourseChange();
  }, [faculty_id, courseCode]);

  const handleSubmit = async () => {
    const newErrors = {};

    if (!faculty_id) newErrors.faculty_id = "Faculty ID is required";
    if (!courseCode) newErrors.courseCode = "Course code is required";
    if (!semesterCode) newErrors.semesterCode = "Semester code is required";
    if (!department) newErrors.department = "Department is required";
    if (!papers_left || parseInt(papers_left) < 0)
      newErrors.papers_left = "Valid number of pending papers is required";
    if (!reason) newErrors.reason = "Reason is required";  

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      faculty_id,
      papers_left,
      course_id: courseCode,
      remarks: reason,
      approval_status: 0,
      status: 0,
      sem_code: semesterCode,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/FacultyRequestSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit form data");
      const result = await response.json();
      console.log("Form Submitted", result);
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };
  return (
    <div className="w-full p-6 bg-gray-100 overflow-y-visible">
      <h1 className="text-2xl font-bold mb-6 ">Request Details</h1>
      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg ">
        <div>
          <label className="label-class">Faculty ID:</label>
          <Dropdown
            value={faculty_id}
            options={facultyOptions}
            onChange={(e) => setFaculty_id(e.value)}
            className="input-class-drop"
            placeholder="Select Faculty ID"
          />
          {errors.faculty_id && (
            <span className="text-red-500 text-sm">{errors.faculty_id}</span>
          )}
        </div>

        <div>
          <label className="label-class">Course Name:</label>
          <Dropdown
            value={courseCode}
            options={courseOptions}
            onChange={(e) => setCourseCode(e.value)}
            className="input-class-drop"
            placeholder="Select Course"
          />
          {errors.courseCode && (
            <span className="text-red-500 text-sm">{errors.courseCode}</span>
          )}
        </div>

        <div>
          <label className="label-class">Semester Code:</label>
          <Dropdown
            value={semesterCode}
            options={semesterOptions}
            onChange={(e) => setSemesterCode(e.value)}
            className="input-class-drop"
            placeholder="Select Semester"
          />
          {errors.semesterCode && (
            <span className="text-red-500 text-sm">{errors.semesterCode}</span>
          )}
        </div>

        <div>
          <label className="label-class">Department:</label>
          <Dropdown
            value={department}
            options={departmentOptions}
            onChange={(e) => setDepartment(e.value)}
            className="input-class-drop"
            placeholder="Select Department"
          />
          {errors.department && (
            <span className="text-red-500 text-sm">{errors.department}</span>
          )}
        </div>

        <div>
          <label className="label-class">Papers Pending:</label>
          <Dropdown
            value={papers_left}
            options={pendingPapersOptions}
            onChange={(e) => setPapersLeft(e.value)}
            className="input-class-drop"
            placeholder="Select Pending Papers"
          />
          {errors.papers_left && (
            <span className="text-red-500 text-sm">{errors.papers_left}</span>
          )}
        </div>
        <div>
          <label className="label-class">Reason:</label>
          <InputText
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input-class-inp"
            placeholder="Enter the reason"
          />
          {errors.reason && (
            <span className="text-red-500 text-sm">{errors.reason}</span>
          )}
        </div>
      </div>

      <Button
        label="Submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-2 mt-4 mb-4 rounded-md hover:bg-blue-600 w-24"
      />
    </div>
  );
}
