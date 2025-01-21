import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function BasicDemo() {
    const [sheetsData, setSheetsData] = useState([
        { courseCode: 'CS101', sheets: 25 },
        { courseCode: 'CS102', sheets: 5 },
        { courseCode: 'CS103', sheets: 50 },
        { courseCode: 'CS104', sheets: 225 },
        { courseCode: 'CS105', sheets: 325 },
        { courseCode: 'CS106', sheets: 425 },
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
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 99, 132)',
                        'rgb(201, 203, 207)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const chartOptions = {
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Course Code',
                        padding: { top: 10 }, // Adds margin between the chart and the title
                        font: {
                            size: 14,
                        },
                    },
                    grid: {
                        display: false,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'No. of Sheets',
                        font: {
                            size: 14,
                        },
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
        <div className="w-full max-w-7xl">
            <Chart
                type="bar"
                data={chartData}
                options={chartOptions}
                style={{
                    width: '180%',
                    height: '170%',
                    border: '2px solid #e5e7eb',
                    marginTop: '6px',
                    borderRadius: '6px',
                    marginBottom: '10px',
                    paddingBottom: '15px',
                    paddingTop: '16px',
                }}
            />
        </div>
    );
}
