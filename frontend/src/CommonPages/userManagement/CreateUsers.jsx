import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { postData } from '../../api';

const CreateUsers = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', designation: '', entID: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Spinner state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitted(true);
    setLoading(true); // Start spinner
    try {
      const payload = {
        firstname: form.firstName,
        lastname: form.lastName,
        email: form.email,
        designation: form.designation,
        entID: form.entID,
      };
      await postData('/create-user', payload);
      setSuccess('User created successfully!');
      setForm({ firstName: '', lastName: '', email: '', designation: '', entID: '' });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const messages = Object.values(err.response.data.errors).flat().join(' ');
        setError(messages);
      } else {
        setError('Failed to create user.');
      }
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <>
      <Header />
      <Sidebar id="menu-item12" id1="menu-items12" activeClassName="user-create" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/entity-user-list/1">Users</Link></li>
                  <li className="breadcrumb-item active">Create User</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row min-vh-70 align-items-center justify-content-center">
            <div className="col-md-6">
              <div className="card shadow" style={{ padding: '2rem 0' }}>
                <div className="card-body py-5">
                  <h3 className="mb-4 text-center">Create User</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-control" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Enter first name" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-control" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Enter last name" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required placeholder="Enter email address" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Designation <span className="text-muted">(optional)</span></label>
                      <input type="text" className="form-control" name="designation" value={form.designation} onChange={handleChange} placeholder="Enter designation" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Entity ID</label>
                      <input type="text" className="form-control" name="entID" value={form.entID} onChange={handleChange} required placeholder="Enter entity ID" />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : null}
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>

                    {success && (
                      <div className="alert alert-success mt-4" role="alert">
                        {success}
                      </div>
                    )}
                    {error && (
                      <div className="alert alert-danger mt-4" role="alert">
                        {error}
                      </div>
                    )}
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

export default CreateUsers;
