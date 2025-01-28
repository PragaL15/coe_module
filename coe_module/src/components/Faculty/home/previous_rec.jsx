import React, { useState } from 'react'; 
import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function PreviousDetails() {
    // State to store faculty details
    const [prevDetails, setPrevDetails] = useState({
        TotalSession: '',
        TotalPaperAllocated: '',
        TotalPaperCorrectedUG: '',
        TotalPaperCorrectedPG: '',
        TotalAmountRecivedUG: '',
        TotalAmountRecivedPG: '',
        AmountPending: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrevDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <div className='w-3/6 md:w-full'>
        <Splitter>
            <SplitterPanel className="md:flex md:flex-col p-4  border-2 rounded-md md:w-full w-3/6">
                <h3 className="text-lg font-bold mb-6 ">Previous Details Summary</h3>
                <div className="flex flex-col gap-y-3 text-sm">
                    <p>
                        <strong>Total Days:</strong> {prevDetails.TotalSession || '21'}
                    </p>
                    <p>
                        <strong>Total Paper Corrected (UG):</strong> {prevDetails.TotalPaperCorrectedUG || '234'}
                    </p>
                    <p>
                        <strong>Total Paper Corrected (PG):</strong> {prevDetails.TotalPaperCorrectedPG || '40'}
                    </p>
                    <p>
                        <strong>Total Amount Received (UG):</strong> {prevDetails.TotalAmountRecivedUG || '3600'}
                    </p>
                    <p>
                        <strong>Total Amount Received (PG):</strong> {prevDetails.TotalAmountRecivedPG || '740'}
                    </p>
                </div>
            </SplitterPanel>
        </Splitter>
        </div>
    );
}
