import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
} from "chart.js"
import {BarChartData} from "./FakeData"

ChartJS.register({
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
});

export const BarChart = () => {
    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            },
        },
        plugins:{
            title:{
                display: true,
                text: " This is how you reported your mood was for this week"
            },
        },
    };
    return <Bar options={options} data={BarChartData}/>
}