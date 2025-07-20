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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitted(true);
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

          <div className="card shadow" style={{ padding: '1rem 0' }}>
            <div className="card-body py-3 px-3">
              <h3 className="mb-4">Create User</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label"><strong>First Name</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label"><strong>Email</strong></label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label"><strong>Designation</strong> <span className="text-muted">(optional)</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        placeholder="Enter designation"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label"><strong>Last Name</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Enter last name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label"><strong>Entity ID</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        name="entID"
                        value={form.entID}
                        onChange={handleChange}
                        required
                        placeholder="Enter entity ID"
                      />
                    </div>

                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary py-2 px-4">Create User</button>
                  </div>
                </div>
                {/* Success/Error Messages */}
                {success && (
                  <div className="alert alert-success mt-3" role="alert">
                    {success}
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default CreateUsers;
