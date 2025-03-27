import React from "react";
import { ResponsiveBar } from '@nivo/bar';
import '../styles/GlobalStyles.css';

export const BarChart = (cloudData) => {
    const dailyAverages = {
        Sunday: { sum: 0, count: 0, exists: false },
        Monday: { sum: 0, count: 0, exists: false },
        Tuesday: { sum: 0, count: 0, exists: false },
        Wednesday: { sum: 0, count: 0, exists: false },
        Thursday: { sum: 0, count: 0, exists: false },
        Friday: { sum: 0, count: 0, exists: false },
        Saturday: { sum: 0, count: 0, exists: false },
    };

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    console.log(cloudData.children[0]);

    if (cloudData.children && cloudData.children[0]) {
        cloudData.children[0].forEach((entry) => {
            const date = entry.date.toDate();
            const dayOfWeekIndex = date.getDay();
            const dayOfWeek = daysOfWeek[dayOfWeekIndex];

            if (!dailyAverages[dayOfWeek]) {
                dailyAverages[dayOfWeek] = { sum: 0, count: 0 };
            }

            if (Number.isInteger(entry.moodLevel) && entry.moodLevel >= 0 && entry.moodLevel <= 5) {
                dailyAverages[dayOfWeek].sum += entry.moodLevel;
                dailyAverages[dayOfWeek].count++;
                dailyAverages[dayOfWeek].exists = true;
            }
        });
    }

    const chartData = Object.entries(dailyAverages).map(([day, data]) => ({
        day,
        mood: data.exists ? data.sum / data.count : 0,
    }));

    return (
        <div style={{ height: "450px", width: "700px" }}>
            <ResponsiveBar
                data={chartData}
                keys={["mood"]}
                indexBy="day"
                margin={{ top: 60, right: 130, bottom: 50, left: 60 }}
                minValue={0}
                maxValue={5}
                padding={0.8}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors="#00B4D8"
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: "var(--body-text-color)",
                            },
                        },
                        legend: {
                            text: {
                                fill: "var(--body-text-color)",
                            },
                        },
                    },
                }}
                borderRadius={14}
                borderWidth={2}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            '0.6'
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Day of Week',
                    legendPosition: 'middle',
                    legendOffset: 40,
                    truncateTickAt: 0,
                    legendTextColor: "var(--body-text-color)"
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Average Mood',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0,
                    tickValues: [0, 1, 2, 3, 4, 5],
                    maxValue: 5,
                    legendTextColor: "var(--body-text-color)"
                }}
                enableGridX={true}
                enableGridY={true}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[]}
                motionConfig="wobbly"
                isInteractive={true}
            />
        </div>
    );
};