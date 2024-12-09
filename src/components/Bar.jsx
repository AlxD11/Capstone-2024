import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchFirestoreData } from "./FakeData"; // Import the fetch function

ChartJS.register({
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
});

export const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const moodValues = await fetchFirestoreData(); // Fetch Mood data from Firestore

      const dynamicBarChartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "Mood",
            data: moodValues, // Use the fetched data
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: true,
          },
        ],
      };
      setChartData(dynamicBarChartData);
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "This is how you reported your mood for this week",
      },
    },
  };

  if (!chartData) return <p>Loading chart...</p>;

  return <Bar options={options} data={chartData} />;
};
