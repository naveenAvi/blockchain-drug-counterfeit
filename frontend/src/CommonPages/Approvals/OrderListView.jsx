import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

const OrderListView = () => {
  // For now, hardcode order details
  const order = {
    order_number: 'ORD-0005',
    drug_name: 'Paracetamol',
    drug_type: 'Tablet',
    importer_name: 'Importer Pvt Ltd',
    manufacturer_name: 'Pharma Manufacturer Inc.',
    invoiceNumber: 'INV-2025-001',
    amount: '₹38,300',
    status: 'Approved',
    date: '2025-06-01',
    quantity: 10000,
    dosage: '500mg',
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
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h3 className="mb-4">Order Details</h3>
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Order Number</strong></label>
                        <input type="text" className="form-control" value={order.order_number} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Status</strong></label>
                        <input type="text" className={`form-control bg-${order.status === 'Approved' ? 'success' : order.status === 'Rejected' ? 'danger' : 'warning'} text-white`} value={order.status} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Drug Name</strong></label>
                        <input type="text" className="form-control" value={order.drug_name} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Drug Type</strong></label>
                        <input type="text" className="form-control" value={order.drug_type} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Importer</strong></label>
                        <input type="text" className="form-control" value={order.importer_name} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Manufacturer</strong></label>
                        <input type="text" className="form-control" value={order.manufacturer_name} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Invoice No.</strong></label>
                        <input type="text" className="form-control" value={order.invoiceNumber} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Amount</strong></label>
                        <input type="text" className="form-control" value={order.amount} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Date</strong></label>
                        <input type="text" className="form-control" value={order.date} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Quantity</strong></label>
                        <input type="text" className="form-control" value={order.quantity} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Dosage</strong></label>
                        <input type="text" className="form-control" value={order.dosage} readOnly />
                      </div>
                    </div>
                  </form>
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
