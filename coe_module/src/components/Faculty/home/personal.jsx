import React, { useState } from 'react'; 
import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function PersonalDetails() {
    // State to store faculty details
    const [facultyDetails, setFacultyDetails] = useState({
        name: '',
        department: '',
        mobileNumber: '',
        email: '',
        dateOfJoin: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFacultyDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <Splitter>
            <SplitterPanel className="flex flex-col p-4" size={75}>
                <h3 className="text-lg font-bold mb-4">Faculty Details Summary</h3>
                <div className="flex flex-col gap-y-3">
                <p>
                    <strong>Name:</strong> {facultyDetails.name || 'Dr.R.Gomathi'}
                </p>
                <p>
                    <strong>Department:</strong> {facultyDetails.department || 'Computer science and Design'}
                </p>
                <p>
                    <strong>Mobile Number:</strong> {facultyDetails.mobileNumber || '9876543212'}
                </p>
                <p>
                    <strong>Email ID:</strong> {facultyDetails.email || 'gomathir@bitsathy.ac.in'}
                </p>
                <p>
                    <strong>Date of Joining:</strong> {facultyDetails.dateOfJoin || '21/2/2016'}
                </p>
                </div>
            </SplitterPanel>
        </Splitter>
    );
}