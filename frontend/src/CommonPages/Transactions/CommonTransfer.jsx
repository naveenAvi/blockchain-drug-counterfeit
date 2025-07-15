import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { getDrugs } from '../../Shared/Services/DrugService';
import { getManufacturers } from '../../Shared/Services/manufacturerServices';
import CreateOrderInvoice from '../../components/invoices/createOrderInvoice';
import { myEntity } from '../../Shared/Services/userServices';
import { getMyDrugAmount } from '../../Shared/Services/TransactionServices';

 const request = {
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

// Placeholder: Fetch from backend/blockchain
const drugs = [
  { id: 1, name: "Paracetamol", types: ["Tablet", "Liquid"], dosages: ["500 mg", "5 ml"] },
  { id: 2, name: "Amoxicillin", types: ["Capsule", "Injection"], dosages: ["250 mg", "10 ml"] }
];

const manufacturers = [
  { id: 1, name: "Pfizer Inc." },
  { id: 2, name: "Sun Pharma" }
];

const CommonTransfer = () => {
  const [drugs, setDrugs] = useState([]);
  const [manufactuers, setmanufactuers] = useState([]);
  const [fromParty, setfromParty] = useState({});
  const [invoiceshow, setinvoiceshow] = useState({display:false, order:{}});



  const [selectedDrugId, setSelectedDrugId] = useState('');
  const [walletAmount, setwalletAmount] = useState({});
  const [drugType, setDrugType] = useState('');
  const [dosage, setDosage] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [referenceDoc, setReferenceDoc] = useState(null);
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const selectedDrug = drugs.find(d => d.id === parseInt(selectedDrugId));

  const fetchDrugs = async () => {
    getDrugs()
      .then(response => {
        let drugsData = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            drugsData = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            drugsData = response.data.data;
          } else if (response.data.drugs && Array.isArray(response.data.drugs)) {
            drugsData = response.data.drugs;
          } else {
            console.warn('Unexpected API response structure:', response.data);
            drugsData = [];
          }
        }
        setDrugs(drugsData);
      })
  }
  const fetchManufacturers = async () => {
    getManufacturers()
      .then(response => {
        let manufacturersData = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            manufacturersData = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            manufacturersData = response.data.data;
          } else if (response.data.drugs && Array.isArray(response.data.drugs)) {
            manufacturersData = response.data.drugs;
          } else {
            console.warn('Unexpected API response structure:', response.data);
            manufacturersData = [];
          }
        }
        setmanufactuers(manufacturersData);
      })
  }
  const fetchDrugBalance = async () => {
    getMyDrugAmount(selectedDrugId)
      .then(response => {
        console.log('Drug balance:', response.data);
        setwalletAmount(response.data)
        console.log(walletAmount)
      })
  }

  useEffect(() => {
    fetchDrugs();
    fetchManufacturers();
    myEntity().then(response => {
      const entity = response.data;
      setfromParty(entity.entity)
    }).catch(error => {
      
    } );
  }, [])

  useEffect(() => {
    fetchDrugBalance()
  }, [selectedDrugId])
  





  const validate = () => {
    const newErrors = {};
    if (!selectedDrugId) newErrors.drug = "Please select a drug";
    if (!drugType) newErrors.drugType = "Select drug type";
    if (!dosage) newErrors.dosage = "Select dosage";
    if (!manufacturerId) newErrors.manufacturer = "Select manufacturer";
    if (!invoiceNumber.trim()) newErrors.invoice = "Invoice number is required";
    // if (!referenceDoc) newErrors.reference = "Upload invoice or permit document";
    if (!amount || isNaN(amount)) newErrors.amount = "Enter valid amount";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validate()) return;
    console.log(manufactuers)
    const order = {
      drugId: selectedDrugId,
      drug: selectedDrug,
      manufacturer: manufactuers.find(m => m.id === parseInt(manufacturerId)),
      type: drugType,
      dosage,
      manufacturerId,
      invoiceNumber,
      referenceDoc,
      amount,
      fromParty
    };

    setinvoiceshow({display:true, order})
    // You can then send this to your backend / smart contract
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id="menu-item13" id1="menu-items13" activeClassName="create-order" />

      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <h4 className="page-title">Transfer drug tokens</h4>
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
                {selectedDrug && (
                  <div className="card shadow-sm bg-light border-0">
                    <div className="card-body">
                      <h5 className="fw-bold mb-4 text-primary">
                        Medicine Details - {selectedDrug.name}
                      </h5>

                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <div className="d-flex align-items-center mb-2">
                            <span className="me-2 text-muted">
                              <i className="ti ti-award"></i>
                            </span>
                            <h6 className="mb-0 fw-bold">Dosage</h6>
                          </div>
                          <p className="text-secondary mb-0">{selectedDrug.dossages}</p>
                        </div>

                        <div className="col-md-6 mb-2">
                          <div className="d-flex align-items-center mb-2">
                            <span className="me-2 text-muted">
                              <i className="ti ti-award"></i>
                            </span>
                            <h6 className="mb-0 fw-bold">Type</h6>
                          </div>
                          <p className="text-secondary mb-0">{selectedDrug.dosage_form}</p>
                        </div>

                        <div className="col-md-6 mb-2">
                          <div className="d-flex align-items-center mb-2">
                            <span className="me-2 text-muted">
                              <i className="ti ti-award"></i>
                            </span>
                            <h6 className="mb-0 fw-bold">Excipients</h6>
                          </div>
                          <p className="text-secondary mb-0">{selectedDrug.excipients}</p>
                        </div>

                        <div className="col-md-6 mb-2">
                          <div className="d-flex align-items-center mb-2">
                            <span className="me-2 text-muted">
                              <i className="ti ti-award"></i>
                            </span>
                            <h6 className="mb-0 fw-bold">National Drug Code</h6>
                          </div>
                          <p className="text-secondary mb-0">{selectedDrug.national_drug_code}</p>
                        </div>


                        <div className="col-md-6 mb-2">
                          <div className="d-flex align-items-center mb-2">
                            <span className="me-2 text-muted">
                              <i className="ti ti-award"></i>
                            </span>
                            <h6 className="mb-0 fw-bold">Available</h6>
                          </div>
                          <p className="text-secondary mb-0">{walletAmount?.avail_amount}</p>
                        </div>

                        

                      </div>
                    </div>
                  </div>
                )}


                <div className="col-md-6">
                  <div className="form-group">
                    <label>To <span className="text-danger">*</span></label>
                    <select className="form-control" value={manufacturerId} onChange={e => setManufacturerId(e.target.value)}>
                      
                      {manufactuers.map(m => (
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
      <CreateOrderInvoice  request={request} order={invoiceshow} onClose={setinvoiceshow} />
    </div>
  );

}
export default CommonTransfer;
