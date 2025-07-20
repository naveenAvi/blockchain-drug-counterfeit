import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { logodark } from '../imagepath';

const OrderInvoice = () => {

  const [loading, setLoading] = useState(false);

  const request ={
    invoiceNumber: 'INV-2025-001',
    from: {
      name: 'Importer Pvt Ltd',
      phone: '9876543210',
      address: '123 Market Road, Mumbai, Maharashtra, India',
    },
    to: {
      name: 'Pharma Manufacturer Inc.',
      phone: '1234567890',
      address: '88 Industrial Park, Bengaluru, Karnataka, India',
    },
    issueDate: '2025-06-01',
    dueDate: '2025-06-30',
    dueAmount: '₹1,54,220',
    items: [
      {
        description: 'Paracetamol 500mg',
        category: 'Tablet',
        rate: '₹2.50',
        quantity: 10000,
        discount: 5,
        amount: '₹23,750',
      },
      {
        description: 'Ibuprofen 400mg',
        category: 'Tablet',
        rate: '₹3.00',
        quantity: 5000,
        discount: 3,
        amount: '₹14,550',
      }
    ],
    total: '₹38,300',
    tax: '₹1,200',
    extra: '₹300',
    discountTotal: '₹1,500',
    finalTotal: '₹38,300',
    referenceDoc: 'refdoc_001.pdf',
  };

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleRequestTokens = () => {
    console.log('Token request initiated for:', request.invoiceNumber);
    // Trigger token request logic
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    console.log('Rejected:', rejectReason);
    setShowRejectModal(false);
    // Send rejection reason to backend or blockchain
  };

  return (
    <>
      <Header />
      <Sidebar id="menu-item13" id1="menu-items13" activeClassName="request-details" />

      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="card">
                <div className="card-body">

                  {/* Header */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <img src={logodark} alt="logo" style={{ height: 40 }} />
                      <h4 className="mt-2">Request Details</h4>
                      <p><strong>Invoice No:</strong> {request.invoiceNumber}</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <p><strong>Issue Date:</strong> {request.issueDate}</p>
                      <p><strong>Due Date:</strong> {request.dueDate}</p>
                      <p><strong>Due Amount:</strong> {request.dueAmount}</p>
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6>From (Importer)</h6>
                      <p>{request.from.name}<br />
                        {request.from.phone}<br />
                        {request.from.address}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6>To (Manufacturer)</h6>
                      <p>{request.to.name}<br />
                        {request.to.phone}<br />
                        {request.to.address}
                      </p>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="table-responsive mb-4">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Description</th>
                          <th>Category</th>
                          <th>Rate/Item</th>
                          <th>Quantity</th>
                          <th>Discount (%)</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {request.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.rate}</td>
                            <td>{item.quantity}</td>
                            <td>{item.discount}%</td>
                            <td className="text-end">{item.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Reference Document:</strong> {request.referenceDoc}</p>
                    </div>
                    <div className="col-md-6 text-end">
                      <p>Tax: <strong>{request.tax}</strong></p>
                      <p>Extra Charges: <strong>{request.extra}</strong></p>
                      <p>Discount: <strong>{request.discountTotal}</strong></p>
                      <h5>Total: <strong>{request.finalTotal}</strong></h5>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="text-end mt-4">
                    <button className="btn btn-success me-2" onClick={handleRequestTokens}>
                      Request Tokens
                    </button>
                    <button className="btn btn-danger" onClick={() => setShowRejectModal(true)}>
                      Reject
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reject Request</h5>
                <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)} />
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter rejection reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowRejectModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleReject}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInvoice;
