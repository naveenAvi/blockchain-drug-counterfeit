import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

const CreateUsers = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle the user creation logic (API call, etc.)
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
                      <label className="form-label"><strong>User Name</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter user name"
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
                    <button type="submit" className="btn btn-primary w-100 py-2">Submit</button>
                    {submitted && (
                      <div className="alert alert-success mt-4" role="alert">
                        User created (mock)!
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
