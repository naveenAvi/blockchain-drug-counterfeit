import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import Header from '../Header';
import Sidebar from '../Sidebar';
import TextEditor from '../TextEditor';

const drugTypes = [
  { value: 'tablet', label: 'Tablet' },
  { value: 'liquid', label: 'Liquid' },
  { value: 'injection', label: 'Injection' },
  { value: 'capsule', label: 'Capsule' }
];

const units = ['ml', 'mg', 'pieces'];

const AddNewDrug = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    dosages: [],
    specifications: '',
    image: null
  });

  const [newDosage, setNewDosage] = useState({ value: '', unit: 'ml' });
  const [errors, setErrors] = useState({});

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
    if (!formData.name.trim()) newErrors.name = "Drug name is required";
    if (!formData.type) newErrors.type = "Drug type is required";
    if (!formData.dosages.length) newErrors.dosages = "At least one dosage is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Drug Definition Submitted:", formData);
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id='menu-item11' id1='menu-items11' activeClassName='add-blog' />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="col-sm-12">
              <h4 className="page-title">Define New Drug</h4>
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
                      <option value="">Select Type</option>
                      {drugTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    {errors.type && <small className="text-danger">{errors.type}</small>}
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
                        {units.map(u => <option key={u}>{u}</option>)}
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
                    <label>Specifications</label>
                    <TextEditor
                      value={formData.specifications}
                      onChange={(value) => setFormData({ ...formData, specifications: value })}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label>Upload Image (Optional)</label>
                    <input name="image" type="file" accept="image/*" className="form-control" onChange={handleChange} />
                  </div>
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-primary">Create Drug</button>
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
