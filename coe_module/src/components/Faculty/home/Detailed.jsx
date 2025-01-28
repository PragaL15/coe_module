import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';

export default function DetailedData() {
    const [products, setProducts] = useState([]);
    const [first, setFirst] = useState(0); // Start index for pagination
    const [rows] = useState(2); // Fixed rows per page to 3

    const columns = [
        { field: 'semesterCode', header: 'Semester Code' },
        { field: 'courseCode', header: 'Course Code' },
        { field: 'noOfPapers', header: 'No. of Papers' },
        { field: 'deadline', header: 'Deadline' },
        { field: 'garduate', header: 'Graduate' }
    ];

    const dummyData = [
        {  semesterCode: 'SEM103', courseCode: 'CS101', noOfPapers: 10, deadline: '5', garduate: 'UG' },
        {  semesterCode: 'SEM103', courseCode: 'CS102', noOfPapers: 15, deadline: '6', garduate: 'PG' },
        {  semesterCode: 'SEM103', courseCode: 'CS201', noOfPapers: 20, deadline: '7', garduate: 'UG' },
        {  semesterCode: 'SEM203', courseCode: 'CS202', noOfPapers: 25, deadline: '9', garduate: 'PG' },
        {  semesterCode: 'SEM203', courseCode: 'CS301', noOfPapers: 30, deadline: '9', garduate: 'UG' },
        {  semesterCode: 'SEM203', courseCode: 'CS302', noOfPapers: 35, deadline: '20', garduate: 'PG' }
    ];

    const onPageChange = (event) => {
        setFirst(event.first);
    };

    useEffect(() => {
        setProducts(dummyData);
    }, []);

    // Paginated data for the current page
    const paginatedProducts = products.slice(first, first + rows);

    return (
        <div className="border-2 md:ml-8 ml-0 mt-4 rounded-md w-3/6 md:w-full">
            <DataTable 
                value={paginatedProducts} 
                tableStyle={{ minWidth: '40rem', fontSize: '15px',marginTop:'9px' }} 
                className="p-datatable-sm rounded-lg"
            >
                {columns.map((col) => (
                    <Column 
                        key={col.field} 
                        field={col.field} 
                        header={col.header} 
                        className="mt-1 p-3 ml-6 border-gray-300" 
                    />
                ))}
            </DataTable>
            <Paginator 
                first={first} 
                rows={rows} 
                totalRecords={products.length} 
                onPageChange={onPageChange} 
                className="text-sm"
            />
        </div>
    );
}
