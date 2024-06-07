import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/PageStyle/PlanDetailPage.css";

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const PlanDetailPage = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                const response = await axios.get(`${Server_IP}/plans/${id}`);
                console.log(response.data); // 응답 데이터 콘솔 로그
                const planData = response.data;
                setPlan(planData);
            } catch (error) {
                console.error("Error fetching plan details", error);
                setError("Error fetching plan details");
            } finally {
                setLoading(false);
            }
        };
        fetchPlanDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const groupByDay = (itinerary) => {
        return itinerary.reduce((acc, item) => {
            (acc[item.day] = acc[item.day] || []).push(item);
            return acc;
        }, {});
    };

    const groupedItinerary = groupByDay(plan.itinerary);

    return (
        <div className="plan-detail-container">
            <h1>{plan.title}</h1>
            <div className="plan-images">
                {plan.images.map((image, index) => (
                    <img key={index} src={`${Server_IP}/static/${image.split('/').pop()}`} alt={`Plan image ${index + 1}`} className="plan-image" />
                ))}
            </div>
            <p>{plan.description}</p>
            <div className="itinerary">
                <h2>일정표</h2>
                {Object.keys(groupedItinerary).map(day => (
                    <div key={day} className="day-itinerary">
                        <h3>Day {day}</h3>
                        {groupedItinerary[day].map((item, index) => (
                            <div key={index} className="itinerary-item">
                                <span className="time">{item.time}</span> - <span className="activity">{item.activity}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanDetailPage;
