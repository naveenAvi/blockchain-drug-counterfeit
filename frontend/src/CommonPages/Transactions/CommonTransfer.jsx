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

// Searchable Select Component
const SearchableSelect = ({ options, value, onChange, placeholder, searchKey = 'name', valueKey = 'id', displayKey = 'name', error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option[searchKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option[valueKey] === value);

  const handleSelect = (option) => {
    onChange(option[valueKey]);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="searchable-select position-relative">
      <div 
        className={`form-control d-flex justify-content-between align-items-center ${error ? 'is-invalid' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer', minHeight: '38px' }}
      >
        <span className={selectedOption ? 'text-dark' : 'text-muted'}>
          {selectedOption ? selectedOption[displayKey] : placeholder}
        </span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu show w-100 shadow-lg border-0 mt-1" style={{ zIndex: 1050 }}>
          <div className="p-2 border-bottom">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder={`Search ${placeholder.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="dropdown-options" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option[valueKey]}
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => handleSelect(option)}
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <div className="fw-medium">{option[displayKey]}</div>
                    {option.email && <small className="text-muted">{option.email}</small>}
                  </div>
                </div>
              ))
            ) : (
              <div className="dropdown-item text-muted">No results found</div>
            )}
          </div>
        </div>
      )}
      
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

const CommonTransfer = () => {
  const [drugs, setDrugs] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [fromParty, setFromParty] = useState({});
  const [invoiceShow, setInvoiceShow] = useState({ display: false, order: {} });
  const [selectedDrugId, setSelectedDrugId] = useState('');
  const [walletAmount, setWalletAmount] = useState({});
  const [drugType, setDrugType] = useState('');
  const [dosage, setDosage] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [referenceDoc, setReferenceDoc] = useState(null);
  const [amount, setAmount] = useState(''); 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const selectedDrug = drugs.find(d => d.id === parseInt(selectedDrugId));

  const fetchDrugs = async () => {
    try {
      const response = await getDrugs();
      let drugsData = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          drugsData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          drugsData = response.data.data;
        } else if (response.data.drugs && Array.isArray(response.data.drugs)) {
          drugsData = response.data.drugs;
        }
      }
      setDrugs(drugsData);
    } catch (error) {
      console.error('Error fetching drugs:', error);
    }
  };

  const fetchManufacturers = async () => {
    try {
      const response = await getManufacturers();
      let manufacturersData = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          manufacturersData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          manufacturersData = response.data.data;
        }
      }
      setManufacturers(manufacturersData);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  const fetchDrugBalance = async () => {
    if (!selectedDrugId) return;
    try {
      const response = await getMyDrugAmount(selectedDrugId);
      setWalletAmount(response.data);
    } catch (error) {
      console.error('Error fetching drug balance:', error);
    }
  };

  useEffect(() => {
    fetchDrugs();
    fetchManufacturers();
    myEntity()
      .then(response => {
        setFromParty(response.data.entity);
      })
      .catch(error => {
        console.error('Error fetching entity:', error);
      });
  }, []);

  useEffect(() => {
    fetchDrugBalance();
  }, [selectedDrugId]);

  const validate = () => {
    const newErrors = {};
    if (!selectedDrugId) newErrors.drug = "Please select a drug";
    if (!manufacturerId) newErrors.manufacturer = "Please select a manufacturer";
    if (!invoiceNumber.trim()) newErrors.invoice = "Invoice number is required";
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) newErrors.amount = "Please enter a valid amount";
    
    // Check if amount exceeds available balance
    if (walletAmount?.avail_amount && parseFloat(amount) > parseFloat(walletAmount.avail_amount)) {
      newErrors.amount = "Amount exceeds available balance";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const order = {
        drugId: selectedDrugId,
        drug: selectedDrug,
        manufacturer: manufacturers.find(m => m.id === parseInt(manufacturerId)),
        type: drugType,
        dosage,
        manufacturerId,
        invoiceNumber,
        referenceDoc,
        amount,
        fromParty
      };

      setInvoiceShow({ display: true, order });
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedDrugId('');
    setManufacturerId('');
    setInvoiceNumber('');
    setAmount('');
    setReferenceDoc(null);
    setErrors({});
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id="menu-item13" id1="menu-items13" activeClassName="create-order" />

      <div className="page-wrapper">
        <div className="content ">
          {/* Enhanced Page Header */}
          <div className="page-header bg-primary-subtle rounded-3 p-4 mb-4">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="page-title mb-1 text-primary">
                  <i className="fas fa-exchange-alt me-2"></i>
                  Transfer Drug Tokens
                </h4>
                <p className="text-muted mb-0">Transfer pharmaceutical tokens between entities</p>
              </div>
              <div className="col-auto">
                <button 
                  type="button" 
                  className="btn btn-outline-primary btn-sm"
                  onClick={resetForm}
                >
                  <i className="fas fa-redo me-1"></i>
                  Reset Form
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              {/* Main Transfer Form */}
              <div className="col-lg-8">
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-white border-bottom">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-info-circle me-2 text-primary"></i>
                      Transfer Details
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      {/* Drug Selection */}
                      <div className="col-md-6">
                        <label className="form-label fw-medium">
                          <i className="fas fa-pills me-1 text-primary"></i>
                          Select Drug <span className="text-danger">*</span>
                        </label>
                        <SearchableSelect
                          options={drugs}
                          value={selectedDrugId}
                          onChange={(value) => {
                            setSelectedDrugId(value);
                            setDrugType('');
                            setDosage('');
                          }}
                          placeholder="Choose a drug"
                          searchKey="name"
                          error={errors.drug}
                        />
                      </div>

                      {/* Manufacturer Selection */}
                      <div className="col-md-6">
                        <label className="form-label fw-medium">
                          <i className="fas fa-building me-1 text-primary"></i>
                          Transfer To <span className="text-danger">*</span>
                        </label>
                        <SearchableSelect
                          options={manufacturers}
                          value={manufacturerId}
                          onChange={setManufacturerId}
                          placeholder="Select manufacturer"
                          searchKey="name"
                          error={errors.manufacturer}
                        />
                      </div>

                      {/* Invoice Number */}
                      <div className="col-md-6">
                        <label className="form-label fw-medium">
                          <i className="fas fa-file-invoice me-1 text-primary"></i>
                          Invoice Number <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="text" 
                          className={`form-control ${errors.invoice ? 'is-invalid' : ''}`}
                          value={invoiceNumber} 
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          placeholder="Enter invoice number"
                        />
                        {errors.invoice && <div className="invalid-feedback">{errors.invoice}</div>}
                      </div>

                      {/* Amount */}
                      <div className="col-md-6">
                        <label className="form-label fw-medium">
                          <i className="fas fa-coins me-1 text-primary"></i>
                          Amount <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <input 
                            type="number" 
                            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            min="0"
                            step="0.01"
                          />
                          <span className="input-group-text">
                            <i className="fas fa-hashtag"></i>
                          </span>
                          {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                        </div>
                        {walletAmount?.avail_amount && (
                          <small className="text-muted">
                            Available: <span className="fw-medium text-success">{walletAmount.avail_amount}</span>
                          </small>
                        )}
                      </div>

                      {/* Reference Document */}
                      <div className="col-12">
                        <label className="form-label fw-medium">
                          <i className="fas fa-paperclip me-1 text-primary"></i>
                          Reference Document (Invoice/Permit)
                        </label>
                        <div className="input-group">
                          <input 
                            type="file" 
                            className={`form-control ${errors.reference ? 'is-invalid' : ''}`}
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setReferenceDoc(e.target.files[0])}
                          />
                          <span className="input-group-text">
                            <i className="fas fa-upload"></i>
                          </span>
                          {errors.reference && <div className="invalid-feedback">{errors.reference}</div>}
                        </div>
                        <small className="text-muted">Supported formats: PDF, JPG, PNG (Max 5MB)</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drug Information Sidebar */}
              <div className="col-lg-4">
                {selectedDrug && (
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-header bg-primary text-white">
                      <h5 className="card-title mb-0">
                        <i className="fas fa-info-circle me-2"></i>
                        Drug Information
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <div className="bg-light rounded-circle p-3 d-inline-block mb-2">
                          <i className="fas fa-pills fa-2x text-primary"></i>
                        </div>
                        <h6 className="fw-bold text-primary">{selectedDrug.name}</h6>
                      </div>

                      <div className="info-grid">
                        <div className="info-item mb-3">
                          <div className="d-flex align-items-center mb-1">
                            <i className="fas fa-prescription-bottle text-primary me-2"></i>
                            <span className="fw-medium">Dosage</span>
                          </div>
                          <p className="text-muted mb-0 ms-4">{selectedDrug.dossages || 'Not specified'}</p>
                        </div>

                        <div className="info-item mb-3">
                          <div className="d-flex align-items-center mb-1">
                            <i className="fas fa-tablets text-primary me-2"></i>
                            <span className="fw-medium">Form</span>
                          </div>
                          <p className="text-muted mb-0 ms-4">{selectedDrug.dosage_form || 'Not specified'}</p>
                        </div>

                        <div className="info-item mb-3">
                          <div className="d-flex align-items-center mb-1">
                            <i className="fas fa-flask text-primary me-2"></i>
                            <span className="fw-medium">Excipients</span>
                          </div>
                          <p className="text-muted mb-0 ms-4">{selectedDrug.excipients || 'Not specified'}</p>
                        </div>

                        <div className="info-item mb-3">
                          <div className="d-flex align-items-center mb-1">
                            <i className="fas fa-barcode text-primary me-2"></i>
                            <span className="fw-medium">NDC</span>
                          </div>
                          <p className="text-muted mb-0 ms-4">{selectedDrug.national_drug_code || 'Not specified'}</p>
                        </div>

                        <div className="info-item">
                          <div className="d-flex align-items-center mb-1">
                            <i className="fas fa-check-circle text-success me-2"></i>
                            <span className="fw-medium">Available</span>
                          </div>
                          <p className="text-success fw-bold mb-0 ms-4">
                            {walletAmount?.avail_amount || '0'} units
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card shadow-sm border-0 mt-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Please review all details before proceeding with the transfer
                    </small>
                  </div>
                  <div className="btn-group">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={resetForm}
                    >
                      <i className="fas fa-times me-1"></i>
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-1"></i>
                          Place Transfer Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <CreateOrderInvoice 
        request={request} 
        order={invoiceShow} 
        onClose={setInvoiceShow} 
      />

      <style jsx>{`
        .searchable-select .dropdown-menu {
          border-radius: 8px;
          border: 1px solid #e9ecef;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .searchable-select .dropdown-item {
          padding: 8px 12px;
          border-radius: 4px;
          margin: 2px 8px;
        }
        
        .searchable-select .dropdown-item:hover {
          background-color: #f8f9fa;
          border-radius: 4px;
        }
        
        .info-grid .info-item {
          border-left: 3px solid #e9ecef;
          padding-left: 12px;
          transition: border-color 0.3s ease;
        }
        
        .info-grid .info-item:hover {
          border-left-color: #007bff;
        }
        
        .card {
          border-radius: 12px;
          overflow: hidden;
        }
        
        .card-header {
          border-bottom: 1px solid #e9ecef;
        }
        
        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          border: none;
          border-radius: 8px;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #0056b3 0%, #004494 100%);
        }
        
        .bg-primary-subtle {
          background-color: rgba(13, 110, 253, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default CommonTransfer;