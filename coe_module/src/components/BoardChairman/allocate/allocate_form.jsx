import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function BECallocating({
  goToStepper = () => {},
  exitStepper = () => {},
}) {
  const [faculty_id, setFaculty_id] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [sem_code, setSem_code] = useState("");
  const [dept_id, setDept_id] = useState("");
  const [paper_allocated, setPaper_allocated] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [paperid, setPaperid] = useState(0);
  const [bce_id, setBce_id] = useState("");

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [bceOptions, setBceOptions] = useState([]);
  const [paperIDOptions, setPaperIDOptions] = useState([]);

  const [errors, setErrors] = useState({});

  // Fetch data for dropdowns
  const fetchData = async (url, setOptions, labelKey, valueKey) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      const data = await response.json();
      const options = data.map((item) => ({
        label: item[labelKey],  // Display faculty_name or other labels
        value: item[valueKey],  // Corresponding ID for selection
      }));
      setOptions(options);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    // Fetch dropdown data
    fetchData(
      "http://localhost:4000/api/faculty", // Fetch faculty data from your API
      setFacultyOptions,
      "faculty_name",  // Display faculty_name in dropdown
      "faculty_id"     // Use faculty_id as value
    );
    fetchData(
      "http://localhost:4000/api/courseOption",
      setCourseOptions,
      "course_code",
      "course_id"
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
      "id"
    );
    fetchData(
      "http://localhost:4000/api/bceOption",
      setBceOptions,
      "bce_id",
      "bce_id"
    );
    fetchData(
      "http://localhost:4000/api/paperIDoption",
      setPaperIDOptions,
      "paper_id",
      "paper_id"
    );
  }, []);

  const handleSubmit = async () => {
    const newErrors = {};

    // Validate fields
    if (!faculty_id) newErrors.faculty_id = "Faculty ID is required";
    if (!courseCode) newErrors.courseCode = "Course code is required";
    if (!sem_code) newErrors.sem_code = "Semester code is required";
    if (!dept_id) newErrors.dept_id = "Department is required";
    if (!deadline || isNaN(deadline)) newErrors.deadline = "Deadline is required";
    if (!bce_id) newErrors.bce_id = "BCE ID is required";
    if (!paperid) newErrors.paperid = "Paper ID is required";
    if (!paper_allocated || isNaN(paper_allocated)) newErrors.paper_allocated = "Papers Allotted must be a number";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      faculty_id,
      paper_allocated,
      course_id: courseCode,
      sem_code: sem_code,
      dept_id,
      bce_id,
      paperid,
      deadline: parseInt(deadline, 10),
    };

    console.log(formData);

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
      setSem_code("");
      setDept_id("");
      setDeadline(0);
      setPaper_allocated(0);
      setBce_id("");
      setPaperid(0);
      goToStepper();
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="md:w-full p-6 bg-gray-100 md:ml-64">
      <h1 className="text-2xl font-bold mt-6 mb-6">Allocate Faculties:</h1>
      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
        <div>
          <label className="label-class">Faculty:</label>
          <Dropdown
            value={faculty_id}
            options={facultyOptions}
            onChange={(e) => setFaculty_id(e.value)}
            className="input-class-drop"
            placeholder="Select Faculty"
          />
          {errors.faculty_id && (
            <span className="text-red-500 text-sm">{errors.faculty_id}</span>
          )}
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
          {errors.courseCode && (
            <span className="text-red-500 text-sm">{errors.courseCode}</span>
          )}
        </div>

        <div>
          <label className="label-class">Semester Code:</label>
          <Dropdown
            value={sem_code}
            options={semesterOptions}
            onChange={(e) => setSem_code(e.value)}
            className="input-class-drop"
            placeholder="Select Semester Code"
          />
          {errors.sem_code && (
            <span className="text-red-500 text-sm">{errors.sem_code}</span>
          )}
        </div>

        <div>
          <label className="label-class">Department:</label>
          <Dropdown
            value={dept_id}
            options={departmentOptions}
            onChange={(e) => setDept_id(e.value)}
            className="input-class-drop"
            placeholder="Select Department"
          />
          {errors.dept_id && (
            <span className="text-red-500 text-sm">{errors.dept_id}</span>
          )}
        </div>

        <div>
          <label className="label-class">Deadline:</label>
          <InputText
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Deadline"
          />
          {errors.deadline && (
            <span className="text-red-500 text-sm">{errors.deadline}</span>
          )}
        </div>

        <div>
          <label className="label-class">Papers Allocated:</label>
          <InputText
            value={paper_allocated}
            onChange={(e) => setPaper_allocated(parseInt(e.target.value, 10))}
            className="input-class-inp"
            placeholder="Enter Papers Allocated"
          />
          {errors.paper_allocated && (
            <span className="text-red-500 text-sm">{errors.paper_allocated}</span>
          )}
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
          {errors.bce_id && (
            <span className="text-red-500 text-sm">{errors.bce_id}</span>
          )}
        </div>

        <div>
          <label className="label-class">Paper ID:</label>
          <Dropdown
            value={paperid}
            options={paperIDOptions}
            onChange={(e) => setPaperid(e.value)}
            className="input-class-drop"
            placeholder="Select Paper ID"
          />
          {errors.paperid && (
            <span className="text-red-500 text-sm">{errors.paperid}</span>
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
