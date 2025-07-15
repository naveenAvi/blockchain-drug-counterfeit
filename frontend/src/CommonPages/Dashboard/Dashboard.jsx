import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

const UserDashboard = () => {
  // Hardcoded data for now
  const tokenAmount = 1200;
  const drugList = [
    { name: 'Paracetamol', type: 'Tablet', tokens: 300 },
    { name: 'Ibuprofen', type: 'Tablet', tokens: 200 },
    { name: 'Amoxicillin', type: 'Capsule', tokens: 150 },
  ];
  const transactionHistory = [
    { date: '2024-06-01', drug: 'Paracetamol', amount: 100, type: 'Received' },
    { date: '2024-06-02', drug: 'Ibuprofen', amount: 50, type: 'Sent' },
    { date: '2024-06-03', drug: 'Amoxicillin', amount: 75, type: 'Received' },
  ];

  return (
    <>
      <Header />
      <Sidebar id="menu-item13" id1="menu-items13" activeClassName="dashboard" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="mb-0">User Dashboard</h3>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-center shadow-sm mb-4">
                <div className="card-body py-4">
                  <h5 className="card-title">Current Token Amount</h5>
                  <h2 className="text-primary">{tokenAmount}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-3">Available Drug List</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Drug Name</th>
                          <th>Type</th>
                          <th>Tokens</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drugList.map((drug, idx) => (
                          <tr key={idx}>
                            <td>{drug.name}</td>
                            <td>{drug.type}</td>
                            <td>{drug.tokens}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">Drug Transaction History</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Date</th>
                          <th>Drug</th>
                          <th>Amount</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionHistory.map((tx, idx) => (
                          <tr key={idx}>
                            <td>{tx.date}</td>
                            <td>{tx.drug}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserDashboard;
