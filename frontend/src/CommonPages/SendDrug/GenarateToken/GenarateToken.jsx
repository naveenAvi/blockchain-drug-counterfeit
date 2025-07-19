import React, { useState } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';

const GenarateToken = () => {
  // Hardcoded drug details for now
  const drug = {
    name: 'Paracetamol',
    count: 10000,
    expiry: '2026-12-31',
    batch: 'BATCH-2024-001',
    dosage: '500mg',
    type: 'Tablet',
    manufacturer: 'Entity One',
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState('');

  const handleGenerate = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setSuccess('Token generated successfully!');
    // Here you would call the API to generate the token
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Header />
      <Sidebar id="menu-item2" id1="menu-items2" activeClassName="generate-token" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/view-drug">Drugs</Link></li>
                  <li className="breadcrumb-item active">Generate Token</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="mb-4">Generate Token for Drug</h4>
                  {success && <div className="alert alert-success">{success}</div>}
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Drug Name</strong></label>
                        <input type="text" className="form-control" value={drug.name} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Batch</strong></label>
                        <input type="text" className="form-control" value={drug.batch} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Dosage</strong></label>
                        <input type="text" className="form-control" value={drug.dosage} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Type</strong></label>
                        <input type="text" className="form-control" value={drug.type} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Count</strong></label>
                        <input type="text" className="form-control" value={drug.count} readOnly />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label"><strong>Expiry Date</strong></label>
                        <input type="text" className="form-control" value={drug.expiry} readOnly />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label"><strong>Manufacturer</strong></label>
                        <input type="text" className="form-control" value={drug.manufacturer} readOnly />
                      </div>
                    </div>
                  </form>
                  <div className="mt-4 d-flex justify-content-end">
                    <button className="btn btn-primary px-4" type="button" onClick={handleGenerate}>Generate Token</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal
            title="Confirm Token Generation"
            open={showConfirm}
            onOk={handleConfirm}
            onCancel={handleCancel}
            okText="Yes, Generate"
            cancelText="Cancel"
          >
            <p>Are you sure you want to generate a token for this drug?</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default GenarateToken;
