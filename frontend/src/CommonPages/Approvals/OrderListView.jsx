import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Link, useParams } from 'react-router-dom';
import { confirmAndCreateTokens, getManuorderListByID } from '../../Shared/Services/manufacturerServices';
import AlertService from '../../notificationService';

const OrderListView = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getManuorderListByID({ orderid: orderId }).then(response => {
      setOrder(response.data.data[0]);
    });
  }, [orderId]);

  const confirmcreation = () => {
    setIsLoading(true);
    confirmAndCreateTokens(order)
      .then(response => {
        console.log("Tokens created successfully", response.data);
        AlertService.success('Created and assigned to the manufacturer');
      })
      .catch(error => {
        AlertService.error('Failed to create tokens: ' + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
                  <li className="breadcrumb-item active">Order Details</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h3 className="mb-4">Order Details</h3>
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Order Number</strong></label>
                        <input type="text" className="form-control" value={order.order_number || ''} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Status</strong></label>
                        <input
                          type="text"
                          className="form-control text-white"
                          style={{
                            backgroundColor:
                              order.status === 'Approved'
                                ? '#28a745'
                                : order.status === 'Rejected'
                                  ? '#dc3545'
                                  : '#ffc107',
                            border: 'none',
                            fontWeight: '600',
                          }}
                          value={order.status || ''}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Drug Name</strong></label>
                        <input type="text" className="form-control" value={order.drug_name || ''} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Drug Type</strong></label>
                        <input type="text" className="form-control" value={order.drug_type || ''} readOnly />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Importer</strong></label>
                        <input type="text" className="form-control" value={order.importer_name || ''} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Manufacturer</strong></label>
                        <input type="text" className="form-control" value={order.manufacturer_name || ''} readOnly />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Invoice No.</strong></label>
                        <input type="text" className="form-control" value={order.invoice_number || ''} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Amount</strong></label>
                        <input type="text" className="form-control" value={order.total_amount || ''} readOnly />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Date</strong></label>
                        <input type="text" className="form-control" value={order.order_date || ''} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Quantity</strong></label>
                        <input type="text" className="form-control" value={order.total_quantity || ''} readOnly />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Dosage</strong></label>
                        <input type="text" className="form-control" value={order.dosage || ''} readOnly />
                      </div>
                    </div>
                  </form>

                  <div className="modal-footer mt-4">
                    <button className="btn btn-outline-secondary me-2" disabled={isLoading}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={confirmcreation} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                          Creating...
                        </>
                      ) : (
                        'Confirm & Create Tokens'
                      )}
                    </button>
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

export default OrderListView;
