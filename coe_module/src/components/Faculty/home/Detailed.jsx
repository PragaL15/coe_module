import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';

export default function DetailedData() {
    const [products, setProducts] = useState([]);
    const [first, setFirst] = useState(0); // Start index for pagination
    const [rows] = useState(3); // Fixed rows per page to 3

    const columns = [
        { field: 'year', header: 'Year' },
        { field: 'semesterCode', header: 'Semester Code' },
        { field: 'courseCode', header: 'Course Code' },
        { field: 'noOfPapers', header: 'No. of Papers' },
        { field: 'deadline', header: 'Deadline' },
        { field: 'garduate', header: 'Graduate' }
    ];

    const dummyData = [
        { year: 2022, semesterCode: 'S1', courseCode: 'CS101', noOfPapers: 10, deadline: '2022-12-30', garduate: 'UG' },
        { year: 2022, semesterCode: 'S2', courseCode: 'CS102', noOfPapers: 15, deadline: '2023-03-15', garduate: 'PG' },
        { year: 2023, semesterCode: 'S1', courseCode: 'CS201', noOfPapers: 20, deadline: '2023-06-20', garduate: 'UG' },
        { year: 2023, semesterCode: 'S2', courseCode: 'CS202', noOfPapers: 25, deadline: '2023-09-10', garduate: 'PG' },
        { year: 2024, semesterCode: 'S1', courseCode: 'CS301', noOfPapers: 30, deadline: '2024-01-05', garduate: 'UG' },
        { year: 2024, semesterCode: 'S2', courseCode: 'CS302', noOfPapers: 35, deadline: '2024-03-10', garduate: 'PG' }
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
        <div className="border-2 ml-8 rounded-md">
            <DataTable 
                value={paginatedProducts} 
                tableStyle={{ minWidth: '40rem', fontSize: '13px' }} 
                className="p-datatable-sm rounded-lg mt-6 ml-6"
            >
                {columns.map((col) => (
                    <Column 
                        key={col.field} 
                        field={col.field} 
                        header={col.header} 
                        className="text-sm mt-1 p-3 ml-6 border-gray-300" 
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