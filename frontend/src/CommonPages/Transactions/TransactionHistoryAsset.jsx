import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTransactionHistoryByAssetsID } from "../../Shared/Services/TransactionServices";

const TransactionHistoryAsset = () => {
  const { referenceNumber } = useParams();
  const [activities, setActivities] = useState([]);
  const [displayedActivities, setDisplayedActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finalStatus, setFinalStatus] = useState(null);
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const flattenHistory = (node, depth = 0) => {
    let result = [];

    result.push({
      assetID: node.assetID,
      status: node.status,
      owner: node.currentOwner,
      amount: node.amount,
      batch: node.batch,
      expiry: node.expiry,
      name: node.name,
      level: depth,
      active:node.active,
      transfered: node.transfered,
      created: node.createdAt
    });

    if (Array.isArray(node.history)) {
      node.history.forEach((h) => {
        result = result.concat(flattenHistory(h, depth + 1));
      });
    }

    return result;
  };

  useEffect(() => {
    getTransactionHistoryByAssetsID(referenceNumber)
      .then((response) => {
        // console.log(response.data.response.result)
        if (response && response.data.response.result) {
          const flatHistory = flattenHistory(response.data.response.result).reverse();
          // console.log(flatHistory)
          setActivities(flatHistory);

          setLoading(false)
        }
      })
      .catch((error) => {
        // console.error("Error fetching transaction status:", error);
        // setLoading(false);
      });
  }, [referenceNumber]);


  // Scroll to bottom on new step
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayedActivities]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown date";
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
                        {activities.map((activity, index) => (
                          <li
                            key={`${activity.assetID}-${index}`}
                          >
                            <div className="activity-user">
                              <div
                                className={`avatar rounded-circle text-white ${activity.level === 0 ? "bg-primary" : "bg-secondary"
                                  }`}
                              >
                                {activity.level === 0 ? "🔷" : "🔷"}
                              </div>
                            </div>
                            <div className="activity-content timeline-group-blk">
                              <div className="timeline-group flex-shrink-0">
                                <h4>
                                  {activity.active === 0 &&(
                                  <del> <small>{activity.assetID}</small></del>

                                  )}
                                  {activity.active === 1 &&(
                                   <small>{activity.assetID}</small>

                                  )}
                                </h4>
                                <span className="time">
                                  Batch: {activity.batch}
                                </span>
                                <span className="time">
                                  transfered: {formatDate(activity.transfered)}
                                </span>
                              </div>
                              <div className="comman-activitys flex-grow-1">
                                <h3>
                                  Status: <span>{activity.status}</span>
                                </h3>
                                <p>Owner: {activity.owner}</p>
                                <p>manufactured : {formatDate(activity.created)}</p>
                                <p>Amount: {activity.amount}</p>
                                {activity.level === 0 && (
                                  <p className="text-success fw-bold">✅ Final/Latest Transaction</p>
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

export default TransactionHistoryAsset;
