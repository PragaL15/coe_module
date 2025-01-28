import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function DailyWorklogUpdate() {
  const [faculty_id, setFaculty_id] = useState("");
  const [faculty_name, setFaculty_name] = useState(""); // Store faculty name
  const [paper_id, setPaper_id] = useState("");
  const [paper_corrected_today, setPaperCorrectedToday] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [paperOptions, setPaperOptions] = useState([]);

  const [errors, setErrors] = useState({});

  // Fetch Faculty data from /api/FacultyRecordsDisplay and /api/faculty
  const fetchFacultyAndPaperData = async () => {
    try {
      // Fetch faculty data from /api/FacultyRecordsDisplay
      const facultyResponse = await fetch("http://localhost:4000/api/FacultyRecordsDisplay");
      if (!facultyResponse.ok) throw new Error("Failed to fetch faculty data");
      const facultyData = await facultyResponse.json();

      // Fetch faculty data from /api/faculty for names
      const facultyNameResponse = await fetch("http://localhost:4000/api/faculty");
      if (!facultyNameResponse.ok) throw new Error("Failed to fetch faculty names");
      const facultyNameData = await facultyNameResponse.json();

      // Map faculty records to create faculty options with names
      const facultyOptions = facultyData.map((item) => {
        // Find the corresponding faculty name from /api/faculty
        const faculty = facultyNameData.find((facultyItem) => facultyItem.faculty_id === item.faculty_id);
        return {
          label: `${item.faculty_id} - ${faculty ? faculty.faculty_name : 'Unknown'}`,
          value: item.faculty_id,
          name: faculty ? faculty.faculty_name : 'Unknown', // Store faculty name as well
        };
      });

      setFacultyOptions(facultyOptions);

      // Fetch paper data from the /api/paperIDoption endpoint
      const paperResponse = await fetch("http://localhost:4000/api/paperIDoption");
      if (!paperResponse.ok) throw new Error("Failed to fetch paper data");
      const paperData = await paperResponse.json();

      const paperOptions = paperData.map((item) => ({
        label: item.paper_id, 
        value: item.id, 
      }));

      setPaperOptions(paperOptions);
    } catch (error) {
      console.error("Error fetching faculty and paper data:", error);
    }
  };

  // Fetch faculty name when a faculty is selected
  const fetchFacultyName = async (facultyId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/faculty/${facultyId}`);
      if (!response.ok) throw new Error("Failed to fetch faculty name");
      const data = await response.json();
      setFaculty_name(data.faculty_name);
    } catch (error) {
      console.error("Error fetching faculty name:", error);
    }
  };

  // Run fetchFacultyAndPaperData on initial render
  useEffect(() => {
    fetchFacultyAndPaperData(); 
  }, []);

  // Handle faculty selection
  useEffect(() => {
    if (faculty_id) {
      fetchFacultyName(faculty_id); // Fetch the faculty name when faculty_id changes
    }
  }, [faculty_id]);

  const handleSubmit = async () => {
    const newErrors = {};

    // Validation for required fields
    if (!faculty_id) newErrors.faculty_id = "Faculty ID is required";
    if (!paper_id) newErrors.paper_id = "Paper ID is required";
    if (!paper_corrected_today) newErrors.paper_corrected_today = "paper corrected is required"
     if(paper_corrected_today>26) newErrors.paper_corrected_today =alert("Number of papers per day must be less than 26");
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
      setFaculty_name(""); // Reset faculty name after submission
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
    <div className="md:w-4/5 p-2 bg-gray-100 mt-11 md:ml-14 ">
      <h1 className="text-2xl font-bold mb-6">Daily Faculty Worklog Update</h1>
      <div className="grid md:grid-cols-2 gap-4 bg-white p-6 border rounded-lg shadow-lg">
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
          {faculty_name && (
            <div className="mt-2 text-gray-600">Faculty Name: {faculty_name}</div>
          )}
        </div>

        <div>
          <label className="label-class">Paper ID:</label>
          <Dropdown
            value={paper_id}
            options={paperOptions}
            onChange={(e) => setPaper_id(e.value)}
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
