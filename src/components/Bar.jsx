import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
} from "chart.js"



export const BarChart = (cloudData) => {
    const options = {
        responsive: true,
        scales: {
            x: {
                suggestedMin: 0,
                stacked: true
            },
            y: {
                suggestedMax:5,
                stacked: true
            },
        },
        plugins:{
            legend: {
                display: false
            },
            title:{
                display: true,
                text: " This is how you reported your mood was for this week"
            },
        },
    };
    console.log(cloudData.children[0])
    const BarData = {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"],
        datasets: [
            {
                label: "mood",
                data: cloudData.children[0],
                backgroundColor: "rgba(255, 99, 132, 1)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                borderRadius: Number.MAX_VALUE,
                borderSkipped: true,
            },
    ],
    }
    return <Bar options={options} data={BarData}/>
}
