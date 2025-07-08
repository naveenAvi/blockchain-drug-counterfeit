import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { createCorpUser, getEntities, getEntitiesByID } from '../../Shared/Services/entityService';
import { Tag } from 'feather-icons-react';

const EntityUserCreation = () => {
  const { entityId } = useParams();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    designation: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstname.trim()) errs.firstname = 'First name is required';
    if (!formData.lastname.trim()) errs.lastname = 'Last name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email format';
    if (!formData.designation.trim()) errs.designation = 'Designation is required';
    return errs;
  };

  useEffect(() => {
    getEntitiesByID(entityId)
      .then(response => {
        setEntity(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching entity details:", error);
      })
      .finally(() => setLoading(false));
  }, [entityId]);

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      const payload = {
        ...formData,
        entID: entityId,
      };

      const res = await createCorpUser(payload);
      if (res.data.success) {
        setSuccessMessage('User created successfully!');
        setFormData({ firstname: '', lastname: '', email: '', designation: '' });
        setErrors({});
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
      }
    }
  };
  if (loading || !entity) {
    return <div className="p-5">Loading...</div>;
  }
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id="menu-item12" id1="menu-items12" activeClassName="add-entity-user" />
      <div className="page-wrapper">

        <div className="content">
          <div className="page-header">
            <h4 className="page-title">Create User for Entity ID: {entityId}</h4>
          </div>



          <div className="card">
            <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="d-flex align-items-center flex-sm-nowrap flex-wrap row-gap-3">
                <div className="me-3 doctor-profile-img">
                  {entity.logo_path ? (
                    <img
                      className="rounded"
                      alt="Logo"
                      style={{ width: 100, height: 100, objectFit: 'contain' }}
                      src={`/${entity.logo_path}`}
                    />
                  ) : (
                    <div className="rounded bg-light d-flex align-items-center justify-content-center" style={{ width: 100, height: 100 }}>
                      No Logo
                    </div>
                  )}
                </div>

                <div className="flex-fill">
                  <div className="d-flex align-items-center mb-1">
                    <h4 className="mb-0 fw-semibold me-2">{entity.name}</h4>
                    <Tag color="blue">{entity.type}</Tag>
                    {entity.type}
                  </div>

                  <span className="d-block fs-13">
                    <i className="fas fa-globe me-1"></i>
                    {entity.country}
                  </span>

                  <span className="d-block fs-13">
                    <i className="fas fa-phone-alt me-1"></i>
                    {entity.contact}
                  </span>

                  <span className="d-block fs-13">
                    <i className="fas fa-envelope me-1"></i>
                    {entity.email}
                  </span>

                </div>
              </div>

              <div>
                <p className="mb-2">License Info</p>
                <h6 className="fs-14 mb-1">{entity.license_type || 'N/A'}</h6>
                <p className="fs-14">{entity.license_number || 'N/A'}</p>
                <p className="text-muted mb-0">Established: {entity.established_year}</p>
              </div>
            </div>
          </div>



          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-body row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name <span className="text-danger">*</span></label>
                    <input type="text" name="firstname" className="form-control" value={formData.firstname} onChange={handleChange} />
                    {errors.firstname && <small className="text-danger">{errors.firstname}</small>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name <span className="text-danger">*</span></label>
                    <input type="text" name="lastname" className="form-control" value={formData.lastname} onChange={handleChange} />
                    {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email <span className="text-danger">*</span></label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Designation <span className="text-danger">*</span></label>
                    <input type="text" name="designation" className="form-control" value={formData.designation} onChange={handleChange} />
                    {errors.designation && <small className="text-danger">{errors.designation}</small>}
                  </div>
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-primary">Create User</button>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default EntityUserCreation;
