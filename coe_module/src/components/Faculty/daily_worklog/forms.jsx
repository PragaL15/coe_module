import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function DailyWorklogUpdate() {
  const [faculty_id, setFaculty_id] = useState("");
  const [faculty_name, setFaculty_name] = useState("");
  const [paper_id, setPaper_id] = useState(""); 
  const [paper_corrected_today, setPaperCorrectedToday] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString()); // For storing current timestamp

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [paperOptions, setPaperOptions] = useState([]); // Updated for paper options

  const [errors, setErrors] = useState({});

  // Fetch Faculty and Paper data
  const fetchFacultyAndPaperData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/FacultyRecordsDisplay");
      if (!response.ok) throw new Error("Failed to fetch faculty and paper data");
      const data = await response.json();

      // Extract faculty options
      const facultyOptions = data.map((item) => ({
        label: `${item.faculty_id} - ${item.faculty_name}`, 
        value: item.faculty_id,
      }));

      // Extract paper options
      const paperOptions = data.map((item) => ({
        label: item.paper_id, 
        value: item.paper_id,
      }));

      setFacultyOptions(facultyOptions);
      setPaperOptions(paperOptions);
    } catch (error) {
      console.error("Error fetching faculty and paper data:", error);
    }
  };

  useEffect(() => {
    fetchFacultyAndPaperData(); // Fetch both faculty and paper data on mount
  }, []);

  const handleSubmit = async () => {
    const newErrors = {};

    // Validation for required fields
    if (!faculty_id) newErrors.faculty_id = "Faculty ID is required";
    if (!paper_id) newErrors.paper_id = "Paper ID is required";
    if (!paper_corrected_today || isNaN(paper_corrected_today))
      newErrors.paper_corrected_today = "Number of papers corrected today is required";
    if (!remarks) newErrors.remarks = "Remarks are required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      faculty_id,
      paper_id,
      paper_corrected_today: parseInt(paper_corrected_today, 10),
      remarks,
      createdAt,
    };

    try {
      const response = await fetch("http://localhost:4000/api/FacultyDailyUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      alert("Daily worklog updated successfully!");
      setFaculty_id("");
      setPaper_id("");
      setPaperCorrectedToday(0);
      setRemarks("");
      setCreatedAt(new Date().toISOString()); // Reset createdAt to the current time
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-100 ml-64">
      <h1 className="text-2xl font-bold mb-6">Daily Faculty Worklog Update</h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-lg">
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
          <label className="label-class">Paper ID:</label>
          <Dropdown
            value={paper_id}
            options={paperOptions}
            onChange={(e) => setPaper_id(e.value)} // Removed the fetch for faculty data
            className="input-class-drop"
            placeholder="Select Paper ID"
          />
          {errors.paper_id && (
            <span className="text-red-500 text-sm">{errors.paper_id}</span>
          )}
        </div>

        <div>
          <label className="label-class">Papers Corrected Today:</label>
          <InputText
            value={paper_corrected_today}
            onChange={(e) => setPaperCorrectedToday(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Number of Papers Corrected"
          />
          {errors.paper_corrected_today && (
            <span className="text-red-500 text-sm">{errors.paper_corrected_today}</span>
          )}
        </div>

        <div>
          <label className="label-class">Remarks:</label>
          <InputText
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="input-class-inp"
            placeholder="Enter Remarks"
          />
          {errors.remarks && (
            <span className="text-red-500 text-sm">{errors.remarks}</span>
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
