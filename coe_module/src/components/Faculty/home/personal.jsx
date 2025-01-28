import React, { useState } from 'react'; 
import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function PersonalDetails() {
    // State to store faculty details
    const [facultyDetails, setFacultyDetails] = useState({
        name: '',
        department: '',
        mobileNumber: '',
        email: '',
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
        <div className="md:w-full w-3/6">
        <Splitter>
            <SplitterPanel className="md:flex md:flex-col p-4 text-md border-2 rounded-md">
                <h3 className="text-lg font-bold mb-2 ">Faculty Details Summary</h3>
                <div className="flex flex-col text-sm gap-y-3">
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
                </div>
            </SplitterPanel>
        </Splitter>
        </div>
    );
}
