// All content, trademarks, and data on this document are the property of Healthworks Analtics, LLC and are protected by applicable intellectual property laws. Unauthorized use, reproduction, or distribution of this material is strictly prohibited.
import { Select } from 'antd'
import React from 'react';
import Chart from "react-apexcharts";

function Scenariobar(props) {
    const chartOptions = {
        chart: {
            type: "bar",
            stacked: true, // Enables stacking
        },
        plotOptions: {
            bar: {
                horizontal: false, // Ensures vertical orientation
                borderRadius: 0, // Optional: Rounds the edges of bars
                columnWidth: "60%", // Adjust column width
                distributed: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ["5 Jun 24", "10 Jun 24", "20 Jun 24", "25 Jun 24",],
            labels: {
                rotate: -45,
                style: {
                    fontSize: '12px',
                    colors: ['#5C5C5C']
                },
            }
        },
        fill: {
            colors: ["#9775A2", "#F5B5B0"],  // Solid colors for the bars
            opacity: 1,  // Ensure no transparency
        },
        tooltip: {
            shared: true, // Enables shared tooltips for stacked bars
            intersect: false, // Ensures no conflict with shared tooltips
        },
        grid: {
            show: false
        },
        states: {
            hover: {
                filter: {
                    type: "none", // Disables opacity change or emphasis on hover
                },
            },
            active: {
                filter: {
                    type: "none", // Ensures no opacity change when a bar is active
                },
            },
        },
    };

    const chartSeries = [
        {
            name: "Pre-AEP Enrollment (Dec 23)",
            data: [35, 45, 55, 60,],
        },
        {
            name: "Post-AEP Enrollment (Feb 24)",
            data: [10, 10, 20, 15,],
        },
    ];

    return (
        <div>
            {/* <div className='text-[15px] text-[#5C5C5C] font-semibold letter-spacing: 0.75px;'>
                
            </div> */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-2">
                <div className="text-left mb-2 sm:mb-0">
                    <p className="text-[15px] text-[#5C5C5C] font-semibold" style={{ letterSpacing: '0.75px' }}>
                        Improvement Timeline
                    </p>
                </div>
                <div className="text-right rounded-none">
                    <Select
                        defaultValue="lastMonth"
                        options={[
                            { value: 'lastMonth', label: 'Last Month' },
                            { value: 'sep', label: 'Sep 2024' },
                        ]}
                        className="w-[160px] text-left"
                        style={{ height: '30px', border: 'none', borderRadius: '0' }}
                        suffixIcon={''}
                    />
                </div>
            </div>

            <Chart className='pl-4' options={chartOptions} series={chartSeries} type="bar" height={300} />
        </div>
    );
}

export default Scenariobar;