import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTransactionStatus } from "../../Shared/Services/TransactionServices";

const StatusLogging = () => {
    const { referenceNumber } = useParams();
    const [activities, setActivities] = useState([]);
    const [displayedActivities, setDisplayedActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [finalStatus, setFinalStatus] = useState(null);
    const navigate = useNavigate();
    const bottomRef = useRef(null);

    useEffect(() => {
        getTransactionStatus(referenceNumber)
            .then((response) => {
                setActivities(response.data || []);
            })
            .catch((error) => {
                console.error("Error fetching transaction status:", error);
            });
    }, []);




    useEffect(() => {
        if (!Array.isArray(activities) || activities.length === 0) return;

        let index = 0;
        let timer = null;

        setDisplayedActivities([]);
        setFinalStatus(null);

        const showNext = () => {
            if (index >= activities.length) {
                const failedStep = activities.find((step) => step.passfail === "fail");
                if (failedStep) {
                    setFinalStatus(`❌ Transaction failed at stage: ${failedStep.stage}`);
                } else {
                    setFinalStatus("✅ Transaction completed successfully.");
                }
                setLoading(false);
                return;
            }

            const current = activities[index];
            if (current) {
                setDisplayedActivities((prev) => [...prev, current]);
            }

            index++;
            timer = setTimeout(showNext, 800);
        };

        timer = setTimeout(showNext, 500);

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [activities]);


    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [displayedActivities]);




    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="main-wrapper">
            <Header />
            <Sidebar activeClassName="invoice-report" />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="#">Activities</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <FeatherIcon icon="chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">User Activity</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="activity">
                                        <div className="activity-box">
                                            {loading && (
                                                <div className="text-center py-3">
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    <p>Loading transaction status...</p>
                                                </div>
                                            )}
                                            <ul className="activity-list">
                                                {displayedActivities.map((activity) => (
                                                    <li key={activity.statusid}>
                                                        <div className="activity-user">
                                                            <div
                                                                className={`avatar rounded-circle text-white ${activity.passfail === "pass"
                                                                    ? "bg-success"
                                                                    : "bg-danger"
                                                                    }`}
                                                            >
                                                                {activity.passfail === "pass" ? "✔️" : "❌"}
                                                            </div>
                                                        </div>
                                                        <div className="activity-content timeline-group-blk">
                                                            <div className="timeline-group flex-shrink-0">
                                                                <h4>{formatDate(activity.created_at)}</h4>
                                                                <span className="time">
                                                                    Event Ref: #{activity.statusid}
                                                                </span>
                                                            </div>
                                                            <div className="comman-activitys flex-grow-1">
                                                                <h3>
                                                                    Stage: <span>{activity.stage}</span>
                                                                </h3>
                                                                <p>Status: {activity.passfail.toUpperCase()}</p>
                                                                {activity.message && (
                                                                    <p>Message: {activity.message}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {!loading && finalStatus && (
                                        <div className="text-center mt-4">
                                            <h5>{finalStatus}</h5>
                                            <button
                                                className="btn btn-primary mt-3"
                                                onClick={() => navigate(-1)}
                                            >
                                                Go Back
                                            </button>
                                        </div>
                                    )}
                                </div>
                                            <div ref={bottomRef} />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusLogging;
