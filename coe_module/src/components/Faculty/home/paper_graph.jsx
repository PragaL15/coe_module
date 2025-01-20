import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function BasicDemo() {
    const [sheetsData, setSheetsData] = useState([
        { courseCode: 'CS101', sheets: 25 },
        { courseCode: 'CS102', sheets: 5 },
        { courseCode: 'CS103', sheets: 50 },
        { courseCode: 'CS104', sheets: 225 },
    ]);

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const labels = sheetsData.map(item => item.courseCode);
        const data = sheetsData.map(item => item.sheets);

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'No. of Sheets',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const chartOptions = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Course Code', 
                    },
                    grid: {
                        display: false, 
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'No. of Sheets', 
                    },
                    beginAtZero: true,
                    grid: {
                        display: false, 
                    },
                },
            },
            plugins: {
                legend: {
                    display: false, 
                },
            },
        };

        setChartData(chartData);
        setChartOptions(chartOptions);
    }, [sheetsData]); 

    return (
        <div className="w-full max-w-4xl h-28">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
