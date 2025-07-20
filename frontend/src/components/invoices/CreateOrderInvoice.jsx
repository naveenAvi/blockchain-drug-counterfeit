import { Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { createOrder } from '../../Shared/Services/ImporterServices';


const CreateOrderInvoice = ({ order, onClose, request }) => {

    console.log(order)
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [drugDetails, setdrugDetails] = useState({});
    const [fromParty, setfromParty] = useState({});

    useEffect(() => {
        if (order) {
            setdrugDetails(order.order.drug)
            setfromParty(order.order.fromParty)
            console.log(drugDetails)
        }
    }, [order])


    const handleRequestTokens = () => {
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

        createOrder(payload)
            .then(response => {
                alert('Order created successfully!');
             })
            .catch(error => { })

    };

    const handleReject = () => {
        if (!rejectReason.trim()) return;
        console.log('Rejected:', rejectReason);
        setShowRejectModal(false);
        // Send rejection reason to backend or blockchain
    };

    return (
        <>
            <Modal show={order?.display}  size="lg" centered>
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
                                                <p>{fromParty?.name}.<br />
                                                    {fromParty?.address},<br />
                                                    {fromParty?.country}.<br />
                                                    {fromParty?.contact}
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <h6>To (Manufacturer)</h6>
                                                <p>{order?.order?.manufacturer?.name}.<br />
                                                    {order?.order?.manufacturer?.address},<br />
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
                                                    <tr >
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
                </Modal.Body>
            </Modal>

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

export default CreateOrderInvoice;
