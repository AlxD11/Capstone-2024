import React, { useState, useEffect } from 'react';
import { ResponsiveTimeRange } from '@nivo/calendar';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import MainScreen from './MainScreen';
import '../styles/GlobalStyles.css';
import '../styles/Reports.css';

// Ref(?): https://nivo.rocks/time-range/
const MyResponsiveTimeRange = ({rangeStart, rangeEnd}) => {
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
                // Gets data from the database in the format required by the graph
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
                from={rangeStart}
                to={rangeEnd}
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

/** Returns the total number of times the user reported being sad, excited, calm, happy, angry, etc. */
function GetMoods() {    
    
}

function TodayReport() {
    
}

function WeekReport() {
    
}

function MonthReport() {
    
    let today = new Date();
    let dateStart = new Date(today.valueOf() - ((today.getDate() - 1) * 86400000)); // 86,400,000 milliseconds per day
    let endMonth = dateStart.getMonth() + 1;
    let endYear = dateStart.getFullYear();
    // Move to the next year if we went from December (11) to January (0)
    if (endMonth == 12) {
        endMonth = 0;
        endYear ++;
    }
    let dateEnd = new Date(endYear + "-" + (endMonth + 1) + "-01"); // Add 1 to month to account for 0-index offset
    
    let endMonthPrevious = dateStart.getMonth() - 1;
    let endYearPrevious = dateStart.getYear();
    
    if (endMonthPrevious == -1) {
        endMonthPrevious = 11;
        endYearPrevious --;
    }
    let dateStartPrevious = new Date(endYearPrevious + "-" + (endMonthPrevious + 1) + "-01");
    
    let monthName = "this month";
    switch(dateStart.getMonth())
    {
        case 0:
            monthName = "January";
            break;
        case 1:
            monthName = "February";
            break;
        case 2:
            monthName = "March";
            break;
        case 3:
            monthName = "April";
            break;
        case 4:
            monthName = "May";
            break;
        case 5:
            monthName = "June";
            break;
        case 6:
            monthName = "July";
            break;
        case 7:
            monthName = "August";
            break;
        case 8:
            monthName = "September";
            break;
        case 9:
            monthName = "October";
            break;
        case 10:
            monthName = "November";
            break;
        case 11:
            monthName = "December";
            break;
    }
    
    const [userDataCurrent, setUserDataCurrent] = useState([]);
    const [userDataPrevious, setUserDataPrevious] = useState([]);
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
                const startTimestamp = Timestamp.fromDate(dateStart);
                const endTimestamp = Timestamp.fromDate(dateEnd);
                const startTimestampPrevious = Timestamp.fromDate(dateStartPrevious);
                const endTimestampPrevious = Timestamp.fromDate(dateStart);

                const q = query(
                    collection(db, "user_info", userId, "Data", "Mood Poll", "Mood_entries"),
                    where('date', '>=', startTimestamp),
                    where('date', '<', endTimestamp)
                );

                // Get the user's data for the current time period
                const querySnapshot = await getDocs(q);
                // Gets data from the database
                const data = querySnapshot.docs.map((doc) => {
                    const docData = doc.data();
                    return {
                        day: docData.date.toDate().toISOString().slice(0, 10),
                        sleepQuality: docData.sleepQuality || 0,
                        physicalEnergy: docData.physicalEnergy || 0,
                        mentalEnergy: docData.mentalEnergy || 0,
                    };
                });
                // Compute the averages for each day (probably not needed since users can currently only do one poll per day)
                const aggregatedData = Object.values(
                    data.reduce((acc, item) => {
                        const day = item.day;
                        if (!acc[day]) {
                            acc[day] = { day: day, sleepSum: 0, sleepCount: 0, physicalSum: 0, physicalCount: 0, mentalSum: 0, mentalCount: 0 };
                        }
                        acc[day].sleepSum += item.sleepQuality;
                        acc[day].sleepCount++;
                        acc[day].physicalSum += item.physicalEnergy;
                        acc[day].physicalCount++;
                        acc[day].mentalSum += item.mentalEnergy;
                        acc[day].mentalCount++;
                        // FIXME: Make sure this will accurately handle cases where the user didn't answer all poll questions
                        return acc;
                    }, {})
                // Save the averages
                ).map((item) => ({
                    day: item.day,
                    sleepQuality: item.sleepCount > 0 ? Math.round(item.sleepSum / item.sleepCount) : 0,
                    physicalEnergy: item.physicalCount > 0 ? Math.round(item.physicalSum / item.physicalCount) : 0,
                    mentalEnergy: item.mentalCount > 0 ? Math.round(item.mentalSum / item.mentalCount) : 0,
                }));

                
                const qPrev = query(
                    collection(db, "user_info", userId, "Data", "Mood Poll", "Mood_entries"),
                    where('date', '>=', startTimestampPrevious),
                    where('date', '<', endTimestampPrevious)
                );
                
                // Get the data from the previous time period to compare it
                const querySnapshotPrevious = await getDocs(qPrev);
                // Gets data from the database
                const dataPrevious = querySnapshotPrevious.docs.map((doc) => {
                    const docData = doc.data();
                    return {
                        day: docData.date.toDate().toISOString().slice(0, 10),
                        sleepQuality: docData.sleepQuality || 0,
                        physicalEnergy: docData.physicalEnergy || 0,
                        mentalEnergy: docData.mentalEnergy || 0,
                    };
                });
                // Compute the averages for each day (probably not needed since users can currently only do one poll per day)
                const aggregatedDataPrevious = Object.values(
                    dataPrevious.reduce((acc, item) => {
                        const day = item.day;
                        if (!acc[day]) {
                            acc[day] = { day: day, sleepSum: 0, sleepCount: 0, physicalSum: 0, physicalCount: 0, mentalSum: 0, mentalCount: 0 };
                        }
                        acc[day].sleepSum += item.sleepQuality;
                        acc[day].sleepCount++;
                        acc[day].physicalSum += item.physicalEnergy;
                        acc[day].physicalCount++;
                        acc[day].mentalSum += item.mentalEnergy;
                        acc[day].mentalCount++;
                        // FIXME: Make sure this will accurately handle cases where the user didn't answer all poll questions
                        return acc;
                    }, {})
                // Save the averages
                ).map((item) => ({
                    day: item.day,
                    sleepQuality: item.sleepCount > 0 ? Math.round(item.sleepSum / item.sleepCount) : 0,
                    physicalEnergy: item.physicalCount > 0 ? Math.round(item.physicalSum / item.physicalCount) : 0,
                    mentalEnergy: item.mentalCount > 0 ? Math.round(item.mentalSum / item.mentalCount) : 0,
                }));

                setUserDataCurrent(aggregatedData);
                setUserDataPrevious(aggregatedDataPrevious);
                console.log("Data fetched:", userDataCurrent);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log("User Data:", userDataCurrent);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    // Use toDateString() to leave out the time info, which can throw off the report calendar display.
    return (
        <div className="MonthReport">
            <h2>Your mood in {monthName}</h2>
            <div className="MonthReportInfo">
                <MyResponsiveTimeRange rangeStart={dateStart.toDateString()} rangeEnd={dateEnd.toDateString()} />
                <div>
                    {userDataCurrent.map((day, index) => (
                        <div>
                            <h3>Overview</h3>
                            <p>Your <span className="category">sleep</span> has been {describeData(day.sleepQuality)}.</p>
                            <p>Your <span className="category">physical energy</span> has been {describeData(day.physicalEnergy)}.</p>
                            <p>Your <span className="category">mental energy</span> has been {describeData(day.mentalEnergy)}.</p>
                        </div>
                    ))}
                    {userDataPrevious.map((day, index) => (
                        <div>
                            <h3>Compared to Last Month</h3>
                            <p>Your <span className="category">sleep</span> was {describeData(day.sleepQuality)}.</p>
                            <p>Your <span className="category">physical energy</span> was {describeData(day.physicalEnergy)}.</p>
                            <p>Your <span className="category">mental energy</span> was {describeData(day.mentalEnergy)}.</p>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    );
}

/** Assumes a scale of 1 to 5 (same as mood poll choice values). */
function describeData(data)
{
    if (data > 4)
    {
        return "excellent";
    }
    else if (data > 3)
    {
        return "good";
    }
    else if (data > 2)
    {
        return "okay"; //"so-so"
    }
    else if (data > 1)
    {
        return "not the best"; //poor
    }
    else if (data > 0)
    {
        return "needing a lot of attention"; //miserable
    }
    else
    {
        return "unmeasured";
    }
}

function compareData(data1, data2)
{
    if (data2 == null)
    {
        return "";
    }
    else if ((data1 - data2) > 0.25)
    {
        return "a little better";
    }
    else if ((data1 - data2) > 0.5)
    {
        return "a lot better";
    }
    else if ((data2 - data1) > 0.25)
    {
        return "not quite as good";
    }
    // If data2 is larger (better) by a lot,
    else if ((data2 - data1) > 0.5)
    {
        return "a big drop";
    }
    else
    {
        return "about the same";
    }
}

function YearReport() {
    let year = new Date().getFullYear();
    
    let dateStart = year + "-01-01";
    let dateEnd = year + "-12-31";
    
    return (
        <div className="YearReport">
            <h2>Your mood in {year}</h2>
            <MyResponsiveTimeRange rangeStart={dateStart} rangeEnd={dateEnd} />
        </div>
    );
}

function Reports() {
    return (
        <>
            <MainScreen>
                <div className="Reports">
                    <MonthReport/>
                    <YearReport/>
                </div>
            </MainScreen>
        </>
    );
}

export default Reports;