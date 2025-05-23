import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import MainScreen from './MainScreen';
import '../styles/GlobalStyles.css';
import '../styles/Reports.css';
import { useLoading } from './Loading';

const MyResponsiveLine = ({ rangeStart, rangeEnd }) => {
    const [lineData, setLineData] = useState([]);
    const { setLoading } = useLoading();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    console.error("No user is signed in.");
                    return;
                }
                const userId = currentUser.uid;

                const startDate = new Date(rangeStart);
                const endDate = new Date(rangeEnd);

                const startTimestamp = Timestamp.fromDate(startDate);
                const endTimestamp = Timestamp.fromDate(endDate);

                const q = query(
                    collection(db, "user_info", userId, "Data", "Mood Poll", "Mood_entries"),
                    where("date", ">=", startTimestamp),
                    where("date", "<", endTimestamp)
                );

                const querySnapshot = await getDocs(q);

                const moodEntries = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        date: data.date.toDate().toDateString() ,
                        sleepQuality: data.sleepQuality || 0,
                        physicalEnergy: data.physicalEnergy || 0,
                        mentalEnergy: data.mentalEnergy || 0,
                    };
                });

                const dateRange = [];
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    dateRange.push(new Date(currentDate).toDateString());
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                const transformedData = [
                    {
                        id: "Sleep Quality",
                        data: dateRange.map(date => {
                            const entry = moodEntries.find(e => e.date === date);
                            return { x: date, y: entry ? entry.sleepQuality : 0 };
                        }),
                    },
                    {
                        id: "Physical Energy",
                        data: dateRange.map(date => {
                            const entry = moodEntries.find(e => e.date === date);
                            return { x: date, y: entry ? entry.physicalEnergy : 0 };
                        }),
                    },
                    {
                        id: "Mental Energy",
                        data: dateRange.map(date => {
                            const entry = moodEntries.find(e => e.date === date);
                            return { x: date, y: entry ? entry.mentalEnergy : 0 };
                        }),
                    },
                ];

                setLineData(transformedData.filter(series => series.data.some(item => item.y !== null)));
                console.log("Line fetched:", transformedData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [rangeStart, rangeEnd]);

    console.log("Line Data:", lineData);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (lineData.length === 0) {
        return <div>No mood data available for the selected range.</div>;
    }

    return (
        <ResponsiveLine
            data={lineData}
            margin={{ top: 20, right: 150, bottom: 60, left: 50 }}
            width={500}
            height={400}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 5 }}
            yFormat=" >-.2f"
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            theme={{
                textColor: "var(--body-text-color)",
                labels: {
                    text: {
                        fill: "var(--body-text-color)",
                    },
                },
                legends: {
                    text: {
                        fill: "var(--body-text-color)",
                    },
                },
                grid: {
                    line: {
                        stroke: "var(--body-text-color)",
                        strokeWidth: 1,
                    },
                },
                axis: {
                    legend:{
                        text: {
                            fontSize: 12,
                            fill: "var(--body-text-color)",
                        },
                    },
                    ticks: {
                        text: {
                            fontSize: 12,
                            fill: "var(--body-text-color)",
                        },
                    },
                },
            }}
            axisBottom={{
                tickSize: 3,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Day',
                legendOffset: 40,
                legendPosition: 'middle',
                truncateTickAt: 0,
                format: (value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { day: 'numeric' });
                },
            }}
            axisLeft={{
                tickSize: 3,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Value',
                legendOffset: -40,
                legendPosition: 'middle',
                truncateTickAt: 0,
                tickValues: [0, 1, 2, 3, 4, 5],
            }}
            colors={{ scheme: 'category10' }}
            pointSize={6}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={1}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-8}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};

function Report({ dateStart, dateEnd, title}) {
    const { setLoading } = useLoading();
    const [error, setError] = useState(null);
    const [moodJournals, setMoodJournals] = useState({});
    const [expandedDate, setExpandedDate] = useState(null);
    const toggleExpand = (date) => {
        setExpandedDate(expandedDate === date ? null : date);
    };
    useEffect(() => {
        const fetchMoodJournals = async () => {
            if (!auth.currentUser) return;
            setLoading(true);
            const userId = auth.currentUser.uid;
            const moodEntriesCollection = collection(
                db,
                'user_info',
                userId,
                'Data',
                'Mood Poll',
                'Mood_entries'
            );

            const journalQuery = query(
                moodEntriesCollection,
                where('date', '>=', Timestamp.fromDate(dateStart)),
                where('date', '<=', Timestamp.fromDate(dateEnd))
            );

            try {
                const jounalQuerySnapshot = await getDocs(journalQuery);
                const journals = {};
                jounalQuerySnapshot.forEach((document1) => {
                    const data = document1.data();
                    const date = data.date.toDate().toDateString();
                    if (!journals[date]) {
                        journals[date] = [];
                    }
                    journals[date].push({ Summary: data.summary, Mood: data.mood });
                });
                setMoodJournals(journals);
                console.log(journals);
            } catch (error) {
                console.error('Error fetching mood journals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMoodJournals();
    }, [dateStart, dateEnd]);
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="MonthReport">
            <h2>Your mood {title}</h2>
            <div className="MonthReportInfo" style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ flex: '1', height: '450px', display: 'flex', flexDirection: 'column'  }}>
                    <MyResponsiveLine rangeStart={dateStart.toDateString()} rangeEnd={dateEnd.toDateString()} />
                </div>
                <div style={{ flex: '1', marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                    <div className="mood-journal-journal-display">
                        <label className="mood-journal-heading">
                            <h2>Your journals</h2>
                        </label>
                        {Object.keys(moodJournals)
                            .sort((a, b) => new Date(b) - new Date(a))
                            .map((date) => (
                                <div key={date}>
                                    <div className="mood-journal-expand-toggle" onClick={() => toggleExpand(date)}>
                                        <button className="mood-journal-toggle-button">
                                            {expandedDate === date ? '-' : '+'}
                                        </button>
                                        <span className="mood-journal-date">{date}</span>
                                    </div>
                                    {expandedDate === date && (
                                        <div className="mood-journal-expanded-content">
                                            {moodJournals[date].map((journal, index) => (
                                                <div key={index} className="mood-journal-entry">
                                                    <h4>
                                                        <p>Mood: {journal.Mood}</p>
                                                    </h4>
                                                    <h4>
                                                        <p>Summary: {journal.Summary}</p>
                                                    </h4>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
function WeekReport() {
    let today = new Date();
    let dateStart = new Date(today.valueOf() - ((today.getDay()) * 86400000));
    let dateEnd = new Date(dateStart.valueOf() + (7 * 86400000) - 86400000);
    let dateStartPrevious = new Date(dateStart.valueOf() - (7 * 86400000));

    return (
        <Report dateStart={dateStart} dateEnd={dateEnd} dateStartPrevious={dateStartPrevious} title="this Week" />
    );
}

function LastTwoWeeksReport() {
    let today = new Date();
    let dateEnd = new Date(today.valueOf() - ((today.getDay()) * 86400000) - 86400000);
    let dateStart = new Date(dateEnd.valueOf() - (13 * 86400000));

    let dateEndPrevious = new Date(dateStart.valueOf() - 86400000);
    let dateStartPrevious = new Date(dateEndPrevious.valueOf() - (13 * 86400000));

    return (
        <Report dateStart={dateStart} dateEnd={dateEnd} dateStartPrevious={dateStartPrevious} dateEndPrevious={dateEndPrevious} title="Last Two Weeks" />
    );
}


function DetailedReports() {
    return (
        <>
            <MainScreen>
                <div className="Reports">
                    <WeekReport />
                    <LastTwoWeeksReport />
                </div>
            </MainScreen>
        </>
    );
}

export default DetailedReports;