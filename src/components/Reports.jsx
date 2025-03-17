import React, { useState, useEffect } from 'react';
import { ResponsiveTimeRange } from '@nivo/calendar';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import MainScreen from './MainScreen';
import '../styles/GlobalStyles.css';

const MyResponsiveTimeRange = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [loading, setLoading] = useState(true);
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
                const now = new Date();
                const startOfYear = new Date(now.getFullYear(), 0, 1);
                const startTimestamp = Timestamp.fromDate(startOfYear);
                const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
                const endTimestamp = Timestamp.fromDate(endOfYear);

                const q = query(
                    collection(db, "user_info", userId, "Data", "Mood Poll", "Mood_entries"),
                    where('date', '>=', startTimestamp),
                    where('date', '<', endTimestamp)
                );

                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => {
                    const docData = doc.data();
                    return {
                        day: docData.date.toDate().toISOString().slice(0, 10),
                        value: docData.moodLevel || 0,
                    };
                });
                const aggregatedData = Object.values(
                    data.reduce((acc, item) => {
                        const day = item.day;
                        if (!acc[day]) {
                            acc[day] = { day: day, sum: 0, count: 0 };
                        }
                        acc[day].sum += item.value;
                        acc[day].count++;
                        return acc;
                    }, {})
                ).map((item) => ({
                    day: item.day,
                    value: item.count > 0 ? Math.round(item.sum / item.count) : 0,
                }));

                setCalendarData(aggregatedData);
                console.log("Data fetched:", aggregatedData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log("Calendar Data:", calendarData);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{ height: '400px' }}>
            <ResponsiveTimeRange
                data={calendarData}
                from="2025-01-01"
                to="2025-12-31"
                emptyColor="#eeeeee"
                maxValue={5}
                colors={['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#2ca25f', '#006d2c']}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                theme={{
                    ///...
                    labels: {
                        text: {
                            fill: "var(--body-text-color)",
                        },
                    }
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 5,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left',
                    },
                ]}
            />
        </div>
    );
};

function Reports() {
    return (
        <>
            <MainScreen>
                <div className="Reports">
                    <h2>Report for the month</h2>
                    <MyResponsiveTimeRange />
                </div>
            </MainScreen>
        </>
    );
}

export default Reports;