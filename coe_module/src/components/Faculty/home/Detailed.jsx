import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DetailedData() {
    const [products, setProducts] = useState([]);
    const columns = [
        {field: 'year', header: 'Year'},
        {field: 'semesterCode', header: 'Semester Code'},
        {field: 'courseCode', header: 'Course Code'},
        {field: 'noOfPapers', header: 'No. of Paper'},
        {field: 'deadline', header: 'Deadline'}
    ];

    const dummyData = [
        { year: 2022, semesterCode: 'S1', courseCode: 'CS101', noOfPapers: 10, deadline: '2022-12-30' },
        { year: 2022, semesterCode: 'S2', courseCode: 'CS102', noOfPapers: 15, deadline: '2023-03-15' },
        { year: 2023, semesterCode: 'S1', courseCode: 'CS201', noOfPapers: 20, deadline: '2023-06-20' },
        { year: 2023, semesterCode: 'S2', courseCode: 'CS202', noOfPapers: 25, deadline: '2023-09-10' },
        { year: 2024, semesterCode: 'S1', courseCode: 'CS301', noOfPapers: 30, deadline: '2024-01-05' }
    ];

    useEffect(() => {
        setProducts(dummyData);
    }, []);

    return (
        <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    );
}
