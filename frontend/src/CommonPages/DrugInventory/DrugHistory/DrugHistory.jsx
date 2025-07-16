import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Link, useParams } from 'react-router-dom';
import { postData } from '../../api';

const DrugHistory = (props) => {
  const { drugid } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const selectedDrugId = drugid || 10;

  useEffect(() => {
    setLoading(true);
    setError('');
    postData(`/my/drug-amount/${selectedDrugId}`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setHistory(res.data);
        } else if (Array.isArray(res.data.data)) {
          setHistory(res.data.data);
        } else {
          setHistory([]);
        }
      })
      .catch(err => {
        setError('Failed to load drug history.');
      })
      .finally(() => setLoading(false));
  }, [selectedDrugId]);

  return (
    <>
      <Header />
      <Sidebar id="menu-item14" id1="menu-items14" activeClassName="drug-history" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/view-drug">Drugs</Link></li>
                  <li className="breadcrumb-item active">Drug History</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="mb-4">Drug Transaction History</h4>
                  {loading && <div className="alert alert-info">Loading history...</div>}
                  {error && <div className="alert alert-danger">{error}</div>}
                  {!loading && !error && history.length === 0 && (
                    <div className="alert alert-warning">No transaction history found for this drug.</div>
                  )}
                  {!loading && !error && history.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-bordered align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Transaction ID</th>
                            <th>From Entity</th>
                            <th>To Entity</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Reference No</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history.map(tx => (
                            <tr key={tx.transactionID}>
                              <td>{tx.transactionID}</td>
                              <td>{tx.fromEntID}</td>
                              <td>{tx.toEntID}</td>
                              <td>{tx.amount}</td>
                              <td>
                                <span className={`badge bg-${tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'secondary'}`}>{tx.status}</span>
                              </td>
                              <td>{tx.referenceNo}</td>
                              <td>{new Date(tx.created_at).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DrugHistory; 