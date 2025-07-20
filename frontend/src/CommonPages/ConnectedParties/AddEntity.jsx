import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { addEntities } from '../../Shared/Services/entityService';

const countries = ["USA", "India", "Germany", "Canada", "UK", "China", "France", "Others"];

const allowedEntities = ['manufacturer', 'importer', 'distributor', 'pharmacy'];

const licenseTypeLabels = {
  manufacturer: 'Manufacturing License',
  importer: 'Import License',
  distributor: 'Distribution License',
  pharmacy: 'Pharmacy License',
};

const AddEntity = () => {
  const { entityType } = useParams();
  const normalizedEntity = entityType?.toLowerCase();

  if (!allowedEntities.includes(normalizedEntity)) {
    return <Navigate to="/404" replace />;
  }

  const capitalizedEntity = normalizedEntity.charAt(0).toUpperCase() + normalizedEntity.slice(1);
  const licenseLabel = licenseTypeLabels[normalizedEntity] || 'License Type';

  const [formData, setFormData] = useState({
    type: entityType,
    name: '',
    address: '',
    country: '',
    contact: '',
    company_email: '',
    licenseType: '',
    licenseNumber: '',
    established_year: '',
    logo: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    if (!formData.name.trim()) newErrors.name = `${capitalizedEntity} name is required`;
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact number is required";
    if (!formData.company_email.trim()) newErrors.company_email = "Company email is required";
    if (!formData.licenseType.trim()) newErrors.licenseType = `${licenseLabel} is required`;
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
    if (!formData.established_year) newErrors.established_year = "Year is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    addEntities(formData)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `${capitalizedEntity} registered successfully!`,
          timer: 2000,
          showConfirmButton: false,
        });
        setFormData({
          type: entityType,
          name: '',
          address: '',
          country: '',
          contact: '',
          company_email: '',
          licenseType: '',
          licenseNumber: '',
          established_year: '',
          logo: null,
        });
        setErrors({});
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to register entity. Please try again.',
        });
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id="menu-item12" id1="menu-items12" activeClassName={`add-${normalizedEntity}`} />

      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <h4 className="page-title">Register {capitalizedEntity}</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-body row">

                <div className="col-md-6">
                  <div className="form-group">
                    <label>{capitalizedEntity} Name <span className="text-danger">*</span></label>
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

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Company Email <span className="text-danger">*</span></label>
                    <input type="email" name="company_email" className="form-control" value={formData.company_email} onChange={handleChange} />
                    {errors.company_email && <small className="text-danger">{errors.company_email}</small>}
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
                    <input type="number" name="established_year" min="1800" max="2099" className="form-control" value={formData.established_year} onChange={handleChange} />
                    {errors.established_year && <small className="text-danger">{errors.established_year}</small>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>{licenseLabel} <span className="text-danger">*</span></label>
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

                <div className="col-12 text-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : (
                      `Register ${capitalizedEntity}`
                    )}
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

export default AddEntity;
