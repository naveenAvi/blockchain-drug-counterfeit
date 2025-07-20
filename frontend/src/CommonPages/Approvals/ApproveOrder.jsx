import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

const ApproveOrder = () => {
  // Hardcoded order details for now
  const order = {
    order_number: 'ORD-001',
    invoice_number: 'INV-2024-001',
    reference_document: 'REF-12345',
    manufacturer: { name: 'Entity One' },
    importer: { name: 'Entity Two' },
    order_date: '2024-07-15T00:00:00.000Z',
    status: 'pending',
    total_amount: 1001,
    notes: 'Urgent delivery',
    drug: 'Paracetamol',
    quantity: 5000,
    dosage: '500mg',
  };

  const [actionStatus, setActionStatus] = useState('');
  const [error, setError] = useState('');

  const handleApprove = () => {
    setActionStatus('Order approved successfully!');
    setError('');
    // Here you would call the API to approve the order
  };

  const handleReject = () => {
    setActionStatus('Order rejected.');
    setError('');
    // Here you would call the API to reject the order
  };

  return (
    <>
      <Header />
      <Sidebar id="menu-item2" id1="menu-items2" activeClassName="order-list" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/order-list">Orders</Link></li>
                  <li className="breadcrumb-item active">Approve Order</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="mb-4">Order Details</h4>
                  {actionStatus && <div className="alert alert-success">{actionStatus}</div>}
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Order Number</strong></label>
                        <input type="text" className="form-control" value={order.order_number} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Status</strong></label>
                        <input type="text" className={`form-control bg-${order.status === 'approved' ? 'success' : order.status === 'rejected' ? 'danger' : 'warning'} text-white`} value={order.status} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Drug</strong></label>
                        <input type="text" className="form-control" value={order.drug} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Dosage</strong></label>
                        <input type="text" className="form-control" value={order.dosage} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Quantity</strong></label>
                        <input type="text" className="form-control" value={order.quantity} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Invoice Number</strong></label>
                        <input type="text" className="form-control" value={order.invoice_number} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Reference Document</strong></label>
                        <input type="text" className="form-control" value={order.reference_document} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Total Amount</strong></label>
                        <input type="text" className="form-control" value={order.total_amount} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Manufacturer</strong></label>
                        <input type="text" className="form-control" value={order.manufacturer.name} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Importer</strong></label>
                        <input type="text" className="form-control" value={order.importer.name} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Order Date</strong></label>
                        <input type="text" className="form-control" value={order.order_date ? new Date(order.order_date).toLocaleString() : '-'} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Notes</strong></label>
                        <input type="text" className="form-control" value={order.notes} readOnly />
                      </div>
                    </div>
                  </form>
                  <div className="mt-4 d-flex justify-content-end gap-2">
                    <button className="btn btn-success px-4" onClick={handleApprove} type="button">Approve</button>
                    <button className="btn btn-danger px-4" onClick={handleReject} type="button">Reject</button>
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

export default ApproveOrder;
