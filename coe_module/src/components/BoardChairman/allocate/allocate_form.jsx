import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function BECallocating({ goToStepper = () => {}, exitStepper = () => {} }) {
  const [faculty_id, setFaculty_id] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semesterCode, setSemesterCode] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [department, setDepartment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [papers_alloted, setPapers_alloted] = useState(0);
  const [bce_id, setBce_id] = useState("");

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [academicOptions, setAcademicOptions] = useState([]);
  const [bceOptions, setBceOptions] = useState([]);

  const [errors, setErrors] = useState({});

  const fetchData = async (url, setOptions, labelKey, valueKey) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      const data = await response.json();
      const options = data.map((item) => ({
        label: item[labelKey],
        value: item[valueKey],
      }));
      setOptions(options);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    fetchData("http://localhost:4000/api/faculty", setFacultyOptions, "faculty_id", "faculty_id");
    fetchData("http://localhost:4000/api/courseOption", setCourseOptions, "course_code", "course_id");
    fetchData("http://localhost:4000/api/semOption", setSemesterOptions, "sem_code", "sem_code");
    fetchData("http://localhost:4000/api/deptOption", setDepartmentOptions, "dept_name", "dept_name");
    fetchData("http://localhost:4000/api/academicOption", setAcademicOptions, "academic_year", "academic_year");
    fetchData("http://localhost:4000/api/bceOption", setBceOptions, "bce_id", "bce_id");
  }, []);

  const handleSubmit = async () => {
    const newErrors = {};

    if (!faculty_id) newErrors.faculty_id = "Faculty ID is required";
    if (!courseCode) newErrors.courseCode = "Course code is required";
    if (!semesterCode) newErrors.semesterCode = "Semester code is required";
    if (!academicYear) newErrors.academicYear = "Academic year is required";
    if (!department) newErrors.department = "Department is required";
    if (!deadline) newErrors.deadline = "Deadline is required";
    if (!bce_id) newErrors.bce_id = "BCE ID is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      faculty_id,
      papers_alloted,
      course_id: courseCode,
      sem_code: semesterCode,
      sem_academic_year: academicYear,
      year: department,
      bce_id,
      deadline_left: parseInt(deadline, 10),
    };

    try {
      const response = await fetch("http://localhost:4000/api/BoardApproval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      alert("Form submitted successfully!");
      setFaculty_id("");
      setCourseCode("");
      setSemesterCode("");
      setAcademicYear("");
      setDepartment("");
      setDeadline("");
      setPapers_alloted(0);
      setBce_id("");
      goToStepper();
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-100 ml-64">
      <h1 className="text-2xl font-bold mb-6">Allocate Faculties:</h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
        <div>
          <label className="label-class">Faculty ID:</label>
          <Dropdown
            value={faculty_id}
            options={facultyOptions}
            onChange={(e) => setFaculty_id(e.value)}
            className="input-class-drop"
            placeholder="Select Faculty ID"
          />
          {errors.faculty_id && <span className="text-red-500 text-sm">{errors.faculty_id}</span>}
        </div>

        <div>
          <label className="label-class">Course Code:</label>
          <Dropdown
            value={courseCode}
            options={courseOptions}
            onChange={(e) => setCourseCode(e.value)}
            className="input-class-drop"
            placeholder="Select Course Code"
          />
          {errors.courseCode && <span className="text-red-500 text-sm">{errors.courseCode}</span>}
        </div>

        <div>
          <label className="label-class">Semester Code:</label>
          <Dropdown
            value={semesterCode}
            options={semesterOptions}
            onChange={(e) => setSemesterCode(e.value)}
            className="input-class-drop"
            placeholder="Select Semester Code"
          />
          {errors.semesterCode && <span className="text-red-500 text-sm">{errors.semesterCode}</span>}
        </div>

        <div>
          <label className="label-class">Academic Year:</label>
          <Dropdown
            value={academicYear}
            options={academicOptions}
            onChange={(e) => setAcademicYear(e.value)}
            className="input-class-drop"
            placeholder="Select Academic Year"
          />
          {errors.academicYear && <span className="text-red-500 text-sm">{errors.academicYear}</span>}
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
          {errors.department && <span className="text-red-500 text-sm">{errors.department}</span>}
        </div>

        <div>
          <label className="label-class">Deadline:</label>
          <InputText
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Deadline"
          />
          {errors.deadline && <span className="text-red-500 text-sm">{errors.deadline}</span>}
        </div>

        <div>
          <label className="label-class">Papers Alloted:</label>
          <InputText
            value={papers_alloted}
            onChange={(e) => setPapers_alloted(parseInt(e.target.value, 10))}
            className="input-class-inp"
            placeholder="Enter Papers Alloted"
          />
        </div>

        <div>
          <label className="label-class">BCE ID:</label>
          <Dropdown
            value={bce_id}
            options={bceOptions}
            onChange={(e) => setBce_id(e.value)}
            className="input-class-drop"
            placeholder="Select BCE ID"
          />
          {errors.bce_id && <span className="text-red-500 text-sm">{errors.bce_id}</span>}
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
