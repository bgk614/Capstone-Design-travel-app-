import React from 'react';

const MyScheduleApp = () => {
  // Example data for the schedule, tasks, and timetable
  const schedule = {
    startDate: '2024.03.20',
    endDate: '2024.03.22',
    tasks: [
      { id: 1, text: '산 등산' },
      { id: 2, text: '맛집 투어' },
      // ... other tasks
    ],
    timetable: {
      '1': [
        { time: '09:00', task: '조식' },
        { time: '12:00', task: '산 등산 준비' },
        { time: '18:00', task: '저녁' },
        // ... other times
      ],
      '2': [
        { time: '10:00', task: '산 등산' },
        { time: '13:00', task: '산에서 점심' },
        { time: '16:00', task: '하산 후 휴식' },
        // ... other times
      ],
      '3': [
        { time: '13:00', task: '점심' },
        { time: '15:00', task: '맛집 투어' },
        { time: '19:00', task: '숙소 이동 및 휴식' },
        // ... other times
      ],
    }
  };

  // A helper function to calculate the rowspan for the first column of each day
  const calculateRowSpan = (timetable) => {
    let maxRows = 0;
    Object.keys(timetable).forEach(day => {
      maxRows = Math.max(maxRows, timetable[day].length);
    });
    return maxRows;
  };

  const maxRowSpan = calculateRowSpan(schedule.timetable);

  // Determine the unique times across all days to create the rows
  const uniqueTimes = new Set();
  Object.values(schedule.timetable).forEach(day => {
    day.forEach(slot => uniqueTimes.add(slot.time));
  });
  const sortedTimes = Array.from(uniqueTimes).sort();
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Schedule Overview */}
      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <p>{`${schedule.startDate} ~ ${schedule.endDate}`}</p>
      </div>

      {/* Todo List */}
      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h3>할일 리스트</h3>
        <ul>
          {schedule.tasks.map(task => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      </div>
{/* Timetable */}
<div style={{ overflowX: 'auto', marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f5f5f5' }}>Time</th>
              {Object.keys(schedule.timetable).map(day => (
                <th key={day} style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f5f5f5' }}>Day {day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedTimes.map((time, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{time}</td>
                {Object.keys(schedule.timetable).map(day => {
                  const task = schedule.timetable[day].find(slot => slot.time === time)?.task || '';
                  return (
                    <td key={day} style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: task ? '#e0ffff' : 'none' }}>
                      {task}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyScheduleApp;