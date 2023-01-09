import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "./style.css";

import EmptyActivity from "../../assets/activity-empty-state.png";

import { getAllActivity, addActivity } from "../../utils/https/activity";
import Card from "../../components/Card";

function Dashboard() {
    const [activity, setActivity] = useState([]);
    const [isNotGet, setIsNotGet] = useState(true);

    const handleSubmit = () => {
        const body = {
            email: "ivan@skyshi.com",
            title: "New Activity"
        }
        addActivity(body)
            .then((res) => {
                fetchData()
            })
    }

    const fetchData = () => {
        getAllActivity()
            .then((res) => {
                setActivity(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (activity.length === 0 && isNotGet) {
            fetchData();
            setIsNotGet(false);
        }
    }, [activity, isNotGet]);

    useEffect(() => {
        document.title = "To Do List - Dashboard"
    })
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="todo-header">
                    <h1 className="activity-title">Activity</h1>
                    <button className="addActivity" onClick={handleSubmit} data-cy="activity-add-button">+ Tambah</button>
                </div>
                <div className="detail-content">
                    {activity.length === 0 ? (
                        <div className="empty-item">
                            <img src={EmptyActivity} alt="empty" id="TextEmptyToDo" />
                        </div>
                    ) : (
                        <>
                            <div className="row">
                                {activity.map((activities) => {
                                    return (
                                        <Card
                                            id={activities.id}
                                            title={activities.title}
                                            date={activities.created_at}
                                        />
                                    )
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
