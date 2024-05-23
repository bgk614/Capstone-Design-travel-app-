import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'; // 페이지 이동을 위한 Link 컴포넌트 사용
// import '../../styles/PageStyle/MyPageStyle/MySchedulesPage.css';

export default function MyPlan() {
    const [pastSchedules, setPastSchedules] = useState([]);
    const [upcomingSchedules, setUpcomingSchedules] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/schedules/past')
            .then(response => {
                setPastSchedules(response.data);
            })
            .catch(error => console.error("Error fetching past schedules", error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/schedules/upcoming')
            .then(response => {
                setUpcomingSchedules(response.data);
            })
            .catch(error => console.error("Error fetching upcoming schedules", error));
    }, []);

    const handleDelete = (scheduleId, type) => {
        axios.delete(`http://localhost:8080/api/schedules/${scheduleId}`)
            .then(() => {
                if (type === 'past') {
                    setPastSchedules(pastSchedules.filter(schedule => schedule.id !== scheduleId));
                } else {
                    setUpcomingSchedules(upcomingSchedules.filter(schedule => schedule.id !== scheduleId));
                }
                alert('Schedule deleted successfully');
            })
            .catch(error => console.error("Error deleting schedule", error));
    };

    return (
        <div className="my-schedules">
            <h1>내 일정</h1>
            
            <section>
                <h2>지난 일정 ({pastSchedules.length})</h2>
                {pastSchedules.length > 0 ? (
                    <ul>
                        {pastSchedules.map((schedule) => (
                            <li key={schedule.id}>
                                <h3>{schedule.title}</h3>
                                <p>{schedule.description}</p>
                                <small>Ended on: {new Date(schedule.endDate).toLocaleDateString()}</small>
                                <button onClick={() => handleDelete(schedule.id, 'past')}>Delete</button>
                                <Link to={`/edit-schedule/${schedule.id}`}>Edit</Link>
                            </li>
                        ))}
                    </ul>
                ) : <p>지난 일정이 없습니다.</p>}
            </section>
            <section>
                <h2>예정 일정 ({upcomingSchedules.length})</h2>
                {upcomingSchedules.length > 0 ? (
                    <ul>
                        {upcomingSchedules.map((schedule) => (
                            <li key={schedule.id}>
                                <h3>{schedule.title}</h3>
                                <p>{schedule.description}</p>
                                <small>Starts on: {new Date(schedule.startDate).toLocaleDateString()}</small>
                                <button onClick={() => handleDelete(schedule.id, 'upcoming')}>Delete</button>
                                <Link to={`/edit-schedule/${schedule.id}`}>Edit</Link>
                            </li>
                        ))}
                    </ul>
                ) : <p>예정 일정이 없습니다.</p>}
            </section>
        </div>
    );
}
