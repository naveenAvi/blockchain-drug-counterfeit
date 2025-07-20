import { Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { createOrder } from '../../Shared/Services/ImporterServices';
import AlertService from '../../notificationService';

const CreateOrderInvoice = ({ order, onClose, request }) => {
  const [rejectLoading, setRejectLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [drugDetails, setdrugDetails] = useState({});
  const [fromParty, setfromParty] = useState({});
  const [issueDate, setIssueDate] = useState('');

  useEffect(() => {
    let importer = null;
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userObj = JSON.parse(userStr);
        if (userObj.role === 'importer') {
          importer = userObj;
        }
      }
    } catch (e) {
      importer = null;
    }
    setfromParty(importer || {});
    if (order) {
      setdrugDetails(order.order.drug);
    }
    setIssueDate(new Date().toLocaleDateString());
  }, [order]);

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleRequestTokens = async () => {
    setRequestLoading(true);
    const payload = {
      invoice_number: "11",
      reference_document: null,
      manufacturer_id: parseInt(order.order.manufacturerId),
      importer_id: fromParty?.id,
      order_date: new Date().toISOString().split('T')[0],
      status: "pending",
      total_amount: parseInt(order.order.amount),
      notes: "",
      drugid: order.order.drug.id,
    };

    try {
      await createOrder(payload);
      AlertService.success("created the Order")
      onClose({display:false,order: {} })
    } catch (error) {
      AlertService.error("failed to create the Order")
    } finally {
      setRequestLoading(false);
    }
  };

  const handleReject = async () => {
    onClose({display:false,order: {} })
  };

  return (
    <>
      <Modal show={order?.display} size="lg" centered onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content container-fluid">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="card">
                  <div className="card-body">
                    {/* Header */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h4 className="mt-2">Request Details</h4>
                        <p><strong>Invoice No:</strong> {request.invoiceNumber}</p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <p><strong>Issue Date:</strong> {issueDate}</p>
                      </div>
                    </div>

                    {/* Address Info */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h6>From (Importer)</h6>
                        <p>
                          ID: {fromParty?.id || '-'}<br />
                          {fromParty?.name}<br />
                          {fromParty?.address && <>{fromParty.address},<br /></>}
                          {fromParty?.country && <>{fromParty.country}.<br /></>}
                          {fromParty?.contact || fromParty?.email}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <h6>To (Manufacturer)</h6>
                        <p>
                          {order?.order?.manufacturer?.name}.<br />
                          {truncateText(order?.order?.manufacturer?.address, 150)},<br />
                          {order?.order?.manufacturer?.country}.<br />
                          {order?.order?.manufacturer?.contact}
                        </p>
                      </div>
                    </div>

                    {/* Items Table */}
                    <div className="table-responsive mb-4">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Description</th>
                            <th>Form</th>
                            <th>Rate/Item</th>
                            <th className="text-end">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{drugDetails?.name}</td>
                            <td>{drugDetails?.dosage_form}</td>
                            <td>{drugDetails?.rate}</td>
                            <td className="text-end">{order?.order?.amount}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Totals */}
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Reference Document:</strong> {request.invoiceNumber}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="text-end mt-4">
                      <button
                        className="btn btn-success me-2"
                        onClick={handleRequestTokens}
                        disabled={requestLoading}
                      >
                        {requestLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Requesting...
                          </>
                        ) : (
                          'Request Tokens'
                        )}
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={handleReject}
                        disabled={rejectLoading}
                      >
                        {rejectLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Rejecting...
                          </>
                        ) : (
                          'Reject'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateOrderInvoice;