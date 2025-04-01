import React, { useState, useEffect } from 'react';
import { ResponsiveTimeRange } from '@nivo/calendar';
import { ResponsiveLine } from '@nivo/line'
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import MainScreen from './MainScreen';
import '../styles/GlobalStyles.css';
import '../styles/Reports.css';
import { useLoading } from './Loading';

const MyResponsiveTimeRange = ({ rangeStart, rangeEnd }) => {
    const [calendarData, setCalendarData] = useState([]);
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
                colors={['#8b0000', '#ff0000', '#f08080', '#90ee90', '#66bb6a', '#008000']}
                domain={[0, 1, 2, 3, 4, 5]}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                theme={{
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
          const data = querySnapshot.docs.map((doc) => {
            const docData = doc.data();
            return {
              day: docData.date.toDate().toISOString().slice(0, 10),
              sleepQuality: docData.sleepQuality || 0,
              physicalEnergy: docData.physicalEnergy || 0,
              mentalEnergy: docData.mentalEnergy || 0,
            };
          });
          const transformedData = [
            {
              id: "Sleep Quality",
              data: data.map((item) => ({ x: item.day, y: item.sleepQuality })),
            },
            {
              id: "Physical Energy",
              data: data.map((item) => ({ x: item.day, y: item.physicalEnergy })),
            },
            {
              id: "Mental Energy",
              data: data.map((item) => ({ x: item.day, y: item.mentalEnergy })),
            },
          ];

          setLineData(transformedData);
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

    return (
        <ResponsiveLine
            data={lineData}
            margin={{ top: 20, right: 30, bottom: 60, left: 50 }}
            width={500}
            height={400}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0 }}
            yFormat=" >-.2f"
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
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
                style: {
                    tickTextColor: 'black',
                    tickTextFontSize: 12,
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
                style: {
                    tickTextColor: 'black',
                    tickTextFontSize: 12,
                },
            }}
            pointSize={6}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={1}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-8}
            enableTouchCrosshair={true}
            useMesh={true}
        />
    );
};

function Report({ dateStart, dateEnd, dateStartPrevious, title, timeframe }) {
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

    // Calculate the overall averages for the sleep / energy / mood data
    let sleepAvg = 0;
    let sleepCount = 0;
    let physicalAvg = 0;
    let physicalCount = 0;
    let mentalAvg = 0;
    let mentalCount = 0;
    /* 0: Object { day: "2025-03-16", sleepQuality: 0, physicalEnergy: 0, … } */
    userDataCurrent.forEach((item) => {
        if (item.sleepQuality != 0) {
            sleepAvg += item.sleepQuality;
            sleepCount++;
        }
        if (item.physicalEnergy != 0) {
            physicalAvg += item.physicalEnergy;
            physicalCount++;
        }
        if (item.mentalEnergy != 0) {
            mentalAvg += item.mentalEnergy;
            mentalCount++;
        }

    });

    sleepAvg = sleepAvg / sleepCount;
    physicalAvg = physicalAvg / physicalCount;
    mentalAvg = mentalAvg / mentalCount;

    // Calculate the overall averages for last month's sleep / energy / mood data
    let sleepAvgPrevious = 0;
    sleepCount = 0;
    let physicalAvgPrevious = 0;
    physicalCount = 0;
    let mentalAvgPrevious = 0;
    mentalCount = 0;
    /* 0: Object { day: "2025-03-16", sleepQuality: 0, physicalEnergy: 0, … } */
    userDataPrevious.forEach((item) => {
        if (item.sleepQuality != 0) {
            sleepAvgPrevious += item.sleepQuality;
            sleepCount++;
        }
        if (item.physicalEnergy != 0) {
            physicalAvgPrevious += item.physicalEnergy;
            physicalCount++;
        }
        if (item.mentalEnergy != 0) {
            mentalAvgPrevious += item.mentalEnergy;
            mentalCount++;
        }

    });

    sleepAvgPrevious = sleepAvgPrevious / sleepCount;
    physicalAvgPrevious = physicalAvgPrevious / physicalCount;
    mentalAvgPrevious = mentalAvgPrevious / mentalCount;

    // Use toDateString() to leave out the time info, which can throw off the report calendar display.
    /* TODO: I'd like to make the comparisions more smooth / say something like "which is better / the same as /wrose than last month." */
    return (
        <div className="MonthReport">
            <h2 className="ReportHeader2">Your mood {title}</h2>
            <div className="MonthReportInfo" style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ flex: '1', marginRight: '20px' }}> {/* Container for MyResponsiveTimeRange, flex 1 */}
                    <MyResponsiveTimeRange rangeStart={dateStart.toDateString()} rangeEnd={dateEnd.toDateString()} />
                </div>
                <div style={{ flex: '1', height: '300px' }}> {/* Container for MyResponsiveLine, flex 1 */}
                    <MyResponsiveLine rangeStart={dateStart.toDateString()} rangeEnd={dateEnd.toDateString()}/>
                </div>
                <div style={{ flex: '1', marginLeft: '20px', display: 'flex', flexDirection: 'column' }}> {/* Container for summaries, flex 1 */}
                    <div className="overview" style={{ marginBottom: '20px' }}>
                        <h3>Overview</h3>
                        <p>Your <span className="category">sleep</span> has been {describeData(sleepAvg)}</p>
                        <p>Your <span className="category">physical energy</span> has been {describeData(physicalAvg)}</p>
                        <p>Your <span className="category">mental energy</span> has been {describeData(mentalAvg)}</p>
                    </div>
                    <div>
                        <h3>Compared to Last {timeframe}</h3>
                        <p>Your <span className="category">sleep</span> was {describeData(sleepAvgPrevious)}</p>
                        <p>Your <span className="category">physical energy</span> was {describeData(physicalAvgPrevious)}</p>
                        <p>Your <span className="category">mental energy</span> was {describeData(mentalAvgPrevious)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/** Returns a human-readable description of the data.
 * The descriptions closely match the mood poll options, but the "bad" options have slightly
 * more positive language.
 * Assumes a scale of 1 to 5 (same as mood poll choice values), where higher is better. */
function describeData(data) {
    if (data > 4) {
        return "excellent. Congrats!";
    }
    else if (data > 3) {
        return "good. Nice work! Your efforts are paying off.";
    }
    else if (data > 2) {
        return "okay. You're doing good."; //"so-so"
    }
    else if (data > 1) {
        return "not the best. That's ok, these thins take time."; //poor
    }
    else if (data > 0) {
        return "needing a lot of attention. Don't worry, we'll get there."; //miserable
    }
    else {
        return "unmeasured.";
    }
}

/** @status - logic is bugged and needs refining
 *
 * Returns a descriptive comparision of how data1 relates to data2.
 * Data is assumed to go from low values (worse) to high values (better). */
function compareData(data1, data2) {
    if (data2 == null || data1 == null) {
        return "unmeasurable";
    }
    else if ((data1 - data2) > 0.25) {
        return "a little better then";
    }
    else if ((data1 - data2) > 0.5) {
        return "better then";
    }
    else if ((data1 - data2) > 1) {
        return "much better then";
    }
    else if ((data2 - data1) > 0.25) {
        return "a little less then";
    }
    // If data2 is larger (better) by a lot,
    else if ((data2 - data1) > 0.5) {
        return "not quite as good as";
    }
    else if ((data2 - data1) > 1) {
        return "not nearly as good as";
    }
    else {
        return "about the same as"; // occuring when one data is "unmeasurable" but the other is valid
    }
}

function WeekReport() {
    let today = new Date();
    let dateStart = new Date(today.valueOf() - ((today.getDay()) * 86400000)); // 86,400,000 milliseconds per day
    let dateEnd = new Date(dateStart.valueOf() + (7 * 86400000)); // Add 7 days
    let dateStartPrevious = new Date(dateStart.valueOf() - (7 * 86400000)); //Rewind 7 days

    return (
        <Report dateStart={dateStart} dateEnd={dateEnd} dateStartPrevious={dateStartPrevious} title="this Week" timeframe="Week" />
    );
}

function MonthReport() {
    let today = new Date();
    let dateStart = new Date(today.valueOf() - ((today.getDate() - 1) * 86400000)); // 86,400,000 milliseconds per day
    let endMonth = dateStart.getMonth() + 1;
    let endYear = dateStart.getFullYear();
    // Move to the next year if we went from December (11) to January (0)
    if (endMonth == 12) {
        endMonth = 0;
        endYear++;
    }
    let dateEnd = new Date(endYear + "-" + (endMonth + 1) + "-01"); // Add 1 to month to account for 0-index offset

    let endMonthPrevious = dateStart.getMonth() - 1;
    let endYearPrevious = dateStart.getYear();

    // Move to the previous year if we went from January (0) to December (11)
    if (endMonthPrevious == -1) {
        endMonthPrevious = 11;
        endYearPrevious--;
    }
    let dateStartPrevious = new Date(endYearPrevious + "-" + (endMonthPrevious + 1) + "-01");

    let monthName = "this ";
    switch (dateStart.getMonth()) {
        case 0:
            monthName += "January";
            break;
        case 1:
            monthName += "February";
            break;
        case 2:
            monthName += "March";
            break;
        case 3:
            monthName += "April";
            break;
        case 4:
            monthName += "May";
            break;
        case 5:
            monthName += "June";
            break;
        case 6:
            monthName += "July";
            break;
        case 7:
            monthName += "August";
            break;
        case 8:
            monthName += "September";
            break;
        case 9:
            monthName += "October";
            break;
        case 10:
            monthName += "November";
            break;
        case 11:
            monthName += "December";
            break;
        default:
            "month";
    }

    return (
        <Report dateStart={dateStart} dateEnd={dateEnd} dateStartPrevious={dateStartPrevious} title={monthName} timeframe="Month" />
    );
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
                    <WeekReport />

                    <MonthReport />
                    <YearReport />
                </div>
            </MainScreen>
        </>
    );
}

export default Reports;