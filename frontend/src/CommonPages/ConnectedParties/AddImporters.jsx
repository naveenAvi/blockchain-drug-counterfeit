import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';

const countries = ["USA", "India", "Germany", "Canada", "UK", "China", "France", "Others"];

const AddImporters = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country: '',
    contact: '',
    licenseType: '',
    licenseNumber: '',
    establishedYear: '',
    logo: null
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Spinner state

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Importer name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact number is required";
    if (!formData.licenseType.trim()) newErrors.licenseType = "License type is required";
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
    if (!formData.establishedYear) newErrors.establishedYear = "Year is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Importer Data Submitted:", formData);
    // Send to blockchain or backend API here
    setLoading(true); // Start loading
    setTimeout(() => {
      console.log("Importer Data Submitted:", formData);
      setLoading(false);
    }, 2000);
  };


  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id='menu-item12' id1='menu-items12' activeClassName='add-Importer' />

      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <h4 className="page-title">Register Importer</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-body row">

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Importer Name <span className="text-danger">*</span></label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Contact Number <span className="text-danger">*</span></label>
                    <input type="text" name="contact" className="form-control" value={formData.contact} onChange={handleChange} />
                    {errors.contact && <small className="text-danger">{errors.contact}</small>}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label>Address <span className="text-danger">*</span></label>
                    <textarea name="address" className="form-control" rows="3" value={formData.address} onChange={handleChange}></textarea>
                    {errors.address && <small className="text-danger">{errors.address}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Country <span className="text-danger">*</span></label>
                    <select name="country" className="form-control" value={formData.country} onChange={handleChange}>
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && <small className="text-danger">{errors.country}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Established Year <span className="text-danger">*</span></label>
                    <input type="number" name="establishedYear" min="1800" max="2099" className="form-control" value={formData.establishedYear} onChange={handleChange} />
                    {errors.establishedYear && <small className="text-danger">{errors.establishedYear}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>License Type <span className="text-danger">*</span></label>
                    <input type="text" name="licenseType" className="form-control" value={formData.licenseType} onChange={handleChange} />
                    {errors.licenseType && <small className="text-danger">{errors.licenseType}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>License Number <span className="text-danger">*</span></label>
                    <input type="text" name="licenseNumber" className="form-control" value={formData.licenseNumber} onChange={handleChange} />
                    {errors.licenseNumber && <small className="text-danger">{errors.licenseNumber}</small>}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label>Upload Logo (Optional)</label>
                    <input type="file" name="logo" accept="image/*" className="form-control" onChange={handleChange} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  {loading ? 'Submitting...' : 'Register Importer'}
                </button>

              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddImporters;
