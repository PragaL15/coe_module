import React, { useState } from 'react'; 
import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function PreviousDetails() {
    // State to store faculty details
    const [prevDetails, setPrevDetails] = useState({
        TotalSession: '',
        TotalPaperAllocated: '',
        TotalPaperCorrected: '',
        TotalAmountRecived: '',
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
        <Splitter>
            <SplitterPanel className="flex flex-col p-4">
                <h3 className="text-lg font-bold mb-4">Previous Details Summary</h3>
                <div className="flex flex-col gap-y-3">
                    <p>
                        <strong>Total Days:</strong> {prevDetails.TotalSession || '21'}
                    </p>
                    <p>
                        <strong>Total Paper Allocated:</strong> {prevDetails.TotalPaperAllocated || '456'}
                    </p>
                    <p>
                        <strong>Total Paper Corrected:</strong> {prevDetails.TotalPaperCorrected || '234'}
                    </p>
                    <p>
                        <strong>Total Amount Received:</strong> {prevDetails.TotalAmountRecived || '3600'}
                    </p>
                    <p>
                        <strong>Amount Pending:</strong> {prevDetails.AmountPending || '1000'}
                    </p>
                </div>
            </SplitterPanel>
        </Splitter>
    );
}
