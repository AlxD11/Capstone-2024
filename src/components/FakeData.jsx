export const BarChartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"],
    datasets: [
        {
            label: "mood",
            data: [5, 3, 2, 1, 4, 4, 2],
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: true,
        },
        {
            label: "mood",
            data: [0, 2, 3, 4, 1, 1, 3],
            backgroundColor: "rgba(255, 99, 132, 0.1)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: true,
        },
    ],
};