import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import TextEditor from '../TextEditor';
import { postData } from '../../api';
import notificationService from '../../notificationService';
import Swal from 'sweetalert2';

const drugTypes = [
  { value: 'tablet', label: 'Tablet' },
  { value: 'liquid', label: 'Liquid' },
  { value: 'injection', label: 'Injection' },
  { value: 'capsule', label: 'Capsule' },
  { value: 'cream', label: 'Cream' },
  { value: 'gel', label: 'Gel' },
];

const dosageUnits = ['ml', 'mg', 'pieces', 'grams', 'units'];
const packagingTypes = ['Blister Pack', 'Bottle', 'Vial', 'Box', 'Tube', 'Pouch'];
const routesOfAdministration = ['Oral', 'Topical', 'Intravenous', 'Intramuscular', 'Subcutaneous', 'Rectal', 'Nasal', 'Inhalational'];

const AddNewDrug = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    dosages: [],
    image: null,
    drugId: '',
    activeIngredients: '',
    excipients: '',
    strength: '',
    dosageForm: '',
    routeOfAdministration: '',
    packagingType: '',
    packSize: '',
    storageConditions: '',
    shelfLife: '',
    gs1Gtin: '',
    regulatoryApprovalRegion: '',
    nationalDrugCode: '',
    marketingAuthorizationHolder: '',
    controlledSubstanceSchedule: '',
  });

  const [newDosage, setNewDosage] = useState({ value: '', unit: 'ml' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddDosage = () => {
    if (newDosage.value) {
      setFormData(prev => ({
        ...prev,
        dosages: [...prev.dosages, `${newDosage.value} ${newDosage.unit}`]
      }));
      setNewDosage({ value: '', unit: 'ml' });
    }
  };

  const handleRemoveDosage = (index) => {
    const updated = formData.dosages.filter((_, i) => i !== index);
    setFormData({ ...formData, dosages: updated });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter the drug name.";
    if (!formData.type) newErrors.type = "Please select the drug type.";
    if (!formData.dosages.length) newErrors.dosages = "Please add at least one dosage.";
    if (!formData.drugId.trim()) newErrors.drugId = "Please provide a Drug ID or SKU.";
    if (!formData.activeIngredients.trim()) newErrors.activeIngredients = "Please specify the active ingredients.";
    if (!formData.strength.trim()) newErrors.strength = "Please enter the strength or concentration.";
    if (!formData.packagingType) newErrors.packagingType = "Please select a packaging type.";
    // if (!formData.packSize.trim()) newErrors.packSize = "Please specify the pack size.";
    if (!formData.shelfLife.trim()) newErrors.shelfLife = "Please enter the shelf life.";
    if (!formData.gs1Gtin.trim()) newErrors.gs1Gtin = "Please provide the GS1 GTIN.";
    if (!formData.regulatoryApprovalRegion.trim()) newErrors.regulatoryApprovalRegion = "Please specify the regulatory approval region.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.error("Form validation failed", errors);
      return;
    }

    try {
      setLoading(true);
      const response = await postData('/drugs', formData);
      Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Drug definition submitted successfully!',
      });
      setFormData({
      name: '',
      type: '',
      dosages: [],
      image: null,
      drugId: '',
      activeIngredients: '',
      excipients: '',
      strength: '',
      dosageForm: '',
      routeOfAdministration: '',
      packagingType: '',
      packSize: '',
      storageConditions: '',
      shelfLife: '',
      gs1Gtin: '',
      regulatoryApprovalRegion: '',
      nationalDrugCode: '',
      marketingAuthorizationHolder: '',
      controlledSubstanceSchedule: '',
      });
      setErrors({});
      setNewDosage({ value: '', unit: 'ml' });
    } catch (error) {
      Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to submit drug definition. Please try again.',
      });
      
      setErrors({});
      setNewDosage({ value: '', unit: 'ml' });
      console.error('API error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id='menu-item11' id1='menu-items11' activeClassName='add-blog' />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="col-sm-12">
              <h4 className="page-title">Add a New Drug to Inventory</h4>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-body row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Drug Name <span className="text-danger">*</span></label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter the drug name"
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Drug Type <span className="text-danger">*</span></label>
                    <select
                      name="type"
                      className="form-control"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="">Select drug type</option>
                      {drugTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    {errors.type && <small className="text-danger">{errors.type}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Drug ID or SKU <span className="text-danger">*</span></label>
                    <input
                      name="drugId"
                      type="text"
                      className="form-control"
                      value={formData.drugId}
                      onChange={handleChange}
                      placeholder="e.g., DRG001, SKU12345"
                    />
                    {errors.drugId && <small className="text-danger">{errors.drugId}</small>}
                  </div>
                </div>


                <div className="col-md-6">
                  <div className="form-group">
                    <label>Active Ingredients <span className="text-danger">*</span></label>
                    <input
                      name="activeIngredients"
                      type="text"
                      className="form-control"
                      value={formData.activeIngredients}
                      onChange={handleChange}
                      placeholder="e.g., Paracetamol, Ibuprofen"
                    />
                    {errors.activeIngredients && <small className="text-danger">{errors.activeIngredients}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Excipients (optional)</label>
                    <input
                      name="excipients"
                      type="text"
                      className="form-control"
                      value={formData.excipients}
                      onChange={handleChange}
                      placeholder="e.g., Lactose, Starch"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Strength / Concentration <span className="text-danger">*</span></label>
                    <input
                      name="strength"
                      type="text"
                      className="form-control"
                      value={formData.strength}
                      onChange={handleChange}
                      placeholder="e.g., 500mg, 10mg/mL"
                    />
                    {errors.strength && <small className="text-danger">{errors.strength}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Route of Administration</label>
                    <select
                      name="routeOfAdministration"
                      className="form-control"
                      value={formData.routeOfAdministration}
                      onChange={handleChange}
                    >
                      <option value="">Select route</option>
                      {routesOfAdministration.map(route => (
                        <option key={route} value={route}>{route}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Packaging Type <span className="text-danger">*</span></label>
                    <select
                      name="packagingType"
                      className="form-control"
                      value={formData.packagingType}
                      onChange={handleChange}
                    >
                      <option value="">Select packaging</option>
                      {packagingTypes.map(pkg => (
                        <option key={pkg} value={pkg}>{pkg}</option>
                      ))}
                    </select>
                    {errors.packagingType && <small className="text-danger">{errors.packagingType}</small>}
                  </div>
                </div>


                <div className="col-md-6">
                  <div className="form-group">
                    <label>Storage Conditions (optional)</label>
                    <input
                      name="storageConditions"
                      type="text"
                      className="form-control"
                      value={formData.storageConditions}
                      onChange={handleChange}
                      placeholder="e.g., Store below 25°C, Protect from light"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Shelf Life (in months/years) <span className="text-danger">*</span></label>
                    <input
                      name="shelfLife"
                      type="text"
                      className="form-control"
                      value={formData.shelfLife}
                      onChange={handleChange}
                      placeholder="e.g., 24 months, 2 years"
                    />
                    {errors.shelfLife && <small className="text-danger">{errors.shelfLife}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>GS1 GTIN <span className="text-danger">*</span></label>
                    <input
                      name="gs1Gtin"
                      type="text"
                      className="form-control"
                      value={formData.gs1Gtin}
                      onChange={handleChange}
                      placeholder="e.g., 01234567890128"
                    />
                    {errors.gs1Gtin && <small className="text-danger">{errors.gs1Gtin}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Regulatory Approval Region <span className="text-danger">*</span></label>
                    <input
                      name="regulatoryApprovalRegion"
                      type="text"
                      className="form-control"
                      value={formData.regulatoryApprovalRegion}
                      onChange={handleChange}
                      placeholder="e.g., Sri Lanka, USA (FDA), EU (EMA)"
                    />
                    {errors.regulatoryApprovalRegion && <small className="text-danger">{errors.regulatoryApprovalRegion}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>National Drug Code (NDC) (optional, USA only)</label>
                    <input
                      name="nationalDrugCode"
                      type="text"
                      className="form-control"
                      value={formData.nationalDrugCode}
                      onChange={handleChange}
                      placeholder="e.g., 0002-1234-56"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Marketing Authorization Holder (optional)</label>
                    <input
                      name="marketingAuthorizationHolder"
                      type="text"
                      className="form-control"
                      value={formData.marketingAuthorizationHolder}
                      onChange={handleChange}
                      placeholder="e.g., ABC Pharma Ltd."
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Add Dosage</label>
                    <div className="d-flex">
                      <input
                        type="number"
                        min="1"
                        className="form-control me-2"
                        placeholder="e.g., 5"
                        value={newDosage.value}
                        onChange={(e) => setNewDosage({ ...newDosage, value: e.target.value })}
                      />
                      <select
                        className="form-control me-2"
                        value={newDosage.unit}
                        onChange={(e) => setNewDosage({ ...newDosage, unit: e.target.value })}
                      >
                        {dosageUnits.map(u => <option key={u}>{u}</option>)}
                      </select>
                      <button type="button" className="btn btn-success" onClick={handleAddDosage}>Add</button>
                    </div>
                    {errors.dosages && <small className="text-danger">{errors.dosages}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>Dosage List</label>
                  <ul className="list-group">
                    {formData.dosages.map((dosage, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {dosage}
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveDosage(index)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label>Upload Image (optional)</label>
                    <input name="image" type="file" accept="image/*" className="form-control" onChange={handleChange} />
                  </div>
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-primary" style={{minWidth: '120px'}} disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : 'Add Drug'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewDrug;