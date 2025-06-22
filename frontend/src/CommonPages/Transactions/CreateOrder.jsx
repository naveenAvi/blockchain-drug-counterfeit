import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

// Placeholder: Fetch from backend/blockchain
const drugs = [
  { id: 1, name: "Paracetamol", types: ["Tablet", "Liquid"], dosages: ["500 mg", "5 ml"] },
  { id: 2, name: "Amoxicillin", types: ["Capsule", "Injection"], dosages: ["250 mg", "10 ml"] }
];

const manufacturers = [
  { id: 1, name: "Pfizer Inc." },
  { id: 2, name: "Sun Pharma" }
];

const CreateOrder = () => {
  const [selectedDrugId, setSelectedDrugId] = useState('');
  const [drugType, setDrugType] = useState('');
  const [dosage, setDosage] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [referenceDoc, setReferenceDoc] = useState(null);
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const selectedDrug = drugs.find(d => d.id === parseInt(selectedDrugId));

  const validate = () => {
    const newErrors = {};
    if (!selectedDrugId) newErrors.drug = "Please select a drug";
    if (!drugType) newErrors.drugType = "Select drug type";
    if (!dosage) newErrors.dosage = "Select dosage";
    if (!manufacturerId) newErrors.manufacturer = "Select manufacturer";
    if (!invoiceNumber.trim()) newErrors.invoice = "Invoice number is required";
    if (!referenceDoc) newErrors.reference = "Upload invoice or permit document";
    if (!amount || isNaN(amount)) newErrors.amount = "Enter valid amount";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      drugId: selectedDrugId,
      drugName: selectedDrug?.name,
      type: drugType,
      dosage,
      manufacturerId,
      invoiceNumber,
      referenceDoc,
      amount
    };

    console.log("ORDER SUBMITTED:", order);
    // You can then send this to your backend / smart contract
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id="menu-item13" id1="menu-items13" activeClassName="create-order" />

      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <h4 className="page-title">Create Drug Order</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-body row">

                {/* Drug Selection */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Drug <span className="text-danger">*</span></label>
                    <select className="form-control" value={selectedDrugId} onChange={e => {
                      setSelectedDrugId(e.target.value);
                      setDrugType('');
                      setDosage('');
                    }}>
                      <option value="">Select Drug</option>
                      {drugs.map(drug => (
                        <option key={drug.id} value={drug.id}>{drug.name}</option>
                      ))}
                    </select>
                    {errors.drug && <small className="text-danger">{errors.drug}</small>}
                  </div>
                </div>

                {/* Type */}
                {selectedDrug && (
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Drug Type <span className="text-danger">*</span></label>
                      <select className="form-control" value={drugType} onChange={e => setDrugType(e.target.value)}>
                        <option value="">Select Type</option>
                        {selectedDrug.types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.drugType && <small className="text-danger">{errors.drugType}</small>}
                    </div>
                  </div>
                )}

                {/* Dosage */}
                {selectedDrug && (
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Dosage <span className="text-danger">*</span></label>
                      <select className="form-control" value={dosage} onChange={e => setDosage(e.target.value)}>
                        <option value="">Select Dosage</option>
                        {selectedDrug.dosages.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      {errors.dosage && <small className="text-danger">{errors.dosage}</small>}
                    </div>
                  </div>
                )}

                {/* Manufacturer */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Manufacturer <span className="text-danger">*</span></label>
                    <select className="form-control" value={manufacturerId} onChange={e => setManufacturerId(e.target.value)}>
                      <option value="">Select Manufacturer</option>
                      {manufacturers.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                    {errors.manufacturer && <small className="text-danger">{errors.manufacturer}</small>}
                  </div>
                </div>

                {/* Invoice Number */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Invoice Number <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} />
                    {errors.invoice && <small className="text-danger">{errors.invoice}</small>}
                  </div>
                </div>

                {/* Amount */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Amount <span className="text-danger">*</span></label>
                    <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} />
                    {errors.amount && <small className="text-danger">{errors.amount}</small>}
                  </div>
                </div>

                {/* Reference Document */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Reference Document (Invoice/Permit) <span className="text-danger">*</span></label>
                    <input type="file" className="form-control" accept=".pdf,.jpg,.png" onChange={e => setReferenceDoc(e.target.files[0])} />
                    {errors.reference && <small className="text-danger">{errors.reference}</small>}
                  </div>
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-primary">Place Order</button>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
