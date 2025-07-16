import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Link, useParams } from 'react-router-dom';
import { postData } from '../../../api';    

const OrderHistory = (props) => {
  const { drugid } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const selectedDrugId = drugid || 10;

  useEffect(() => {
    setLoading(true);
    setError('');
    postData(`/order-history`)
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
        setError('Failed to load order history.');
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
                  <li className="breadcrumb-item active">Order History</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="mb-4">Order History</h4>
                  {loading && <div className="alert alert-info">Loading history...</div>}
                  {error && <div className="alert alert-danger">{error}</div>}
                  {!loading && !error && history.length === 0 && (
                    <div className="alert alert-warning">No order history found.</div>
                  )}
                  {!loading && !error && history.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-bordered align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Order Number</th>
                            <th>Invoice Number</th>
                            <th>Reference Document</th>
                            <th>Manufacturer</th>
                            <th>Importer</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                            <th>Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history.map(order => (
                            <tr key={order.order_number}>
                              <td>{order.order_number}</td>
                              <td>{order.invoice_number}</td>
                              <td>{order.reference_document}</td>
                              <td>{order.manufacturer?.name || '-'}</td>
                              <td>{order.importer?.name || '-'}</td>
                              <td>{order.order_date ? new Date(order.order_date).toLocaleString() : '-'}</td>
                              <td>
                                <span className={`badge bg-${order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'secondary'}`}>{order.status}</span>
                              </td>
                              <td>{order.total_amount}</td>
                              <td>{order.notes || '-'}</td>
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

export default OrderHistory;
