import { Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { createOrder } from '../../Shared/Services/ImporterServices';

const CreateOrderInvoice = ({ order, onClose, request }) => {
  const [rejectLoading, setRejectLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [drugDetails, setdrugDetails] = useState({});
  const [fromParty, setfromParty] = useState({});

  useEffect(() => {
    if (order) {
      setdrugDetails(order.order.drug);
      setfromParty(order.order.fromParty);
    }
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
      importer_id: order.order.fromParty?.id,
      order_date: new Date().toISOString().split('T')[0],
      status: "pending",
      total_amount: parseInt(order.order.amount),
      notes: "",
      drugid: order.order.drug.id,
    };

    try {
      await createOrder(payload);
      alert('Order created successfully!');
      onClose?.(); // Close modal if onClose prop exists
    } catch (error) {
      console.error(error);
      alert('Failed to create order.');
    } finally {
      setRequestLoading(false);
    }
  };

  const handleReject = async () => {
    const reason = window.prompt('Enter rejection reason:');
    if (!reason || !reason.trim()) {
      // User cancelled or entered empty reason
      return;
    }

    setRejectLoading(true);

    try {
      // TODO: Replace this with actual API call to submit rejection reason
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Rejected:', reason);
      alert('Request rejected successfully!');
      onClose?.();
    } catch (error) {
      console.error(error);
      alert('Failed to reject request.');
    } finally {
      setRejectLoading(false);
    }
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
                        <img src={'fgyhfgh'} alt="logo" style={{ height: 40 }} />
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
                        <p>
                          {fromParty?.name}.<br />
                          {truncateText(fromParty?.address, 150)},<br />
                          {fromParty?.country}.<br />
                          {fromParty?.contact}
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
                      <div className="col-md-6 text-end">
                        <p>Tax: <strong>{request.tax}</strong></p>
                        <p>Extra Charges: <strong>{request.extra}</strong></p>
                        <p>Discount: <strong>{request.discountTotal}</strong></p>
                        <h5>Total: <strong>{request.finalTotal}</strong></h5>
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
