import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "feather-icons-react";
import { postData } from '../../api';
import { login02, loginicon01, loginicon02, loginicon03, loginlogo } from "../imagepath";

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'importer', label: 'Importer' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'normal', label: 'Normal' },
];

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await postData('/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const messages = Object.values(err.response.data.errors).flat().join(' ');
        setError(messages);
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed.');
      }
    }
  };

  return (
    <div className="main-wrapper login-body">
      <div className="container-fluid px-0">
        <div className="row">
          {/* Image/Logo Section */}
          <div className="col-lg-6 login-wrap">
            <div className="login-sec">
              <div className="log-img">
                <img className="img-fluid" src={login02} alt="Register visual" />
              </div>
            </div>
          </div>

          {/* Register Form Section */}
          <div className="col-lg-6 login-wrap-bg">
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="login-right">
                  <div className="login-right-wrap">
                    <div className="account-logo">
                      <Link to="/">
                        <img src={loginlogo} alt="Logo" />
                      </Link>
                    </div>
                    <h2>Register</h2>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Name <span className="login-danger">*</span></label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email <span className="login-danger">*</span></label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password <span className="login-danger">*</span></label>
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          className="form-control pass-input"
                          name="password"
                          required
                          value={form.password}
                          onChange={handleChange}
                        />
                        <span className="toggle-password" onClick={() => setPasswordVisible(v => !v)}>
                          {passwordVisible ? <EyeOff className="react-feather-custom" /> : <Eye className="react-feather-custom" />}
                        </span>
                      </div>
                      <div className="form-group">
                        <label>Confirm Password <span className="login-danger">*</span></label>
                        <input
                          type={confirmPasswordVisible ? 'text' : 'password'}
                          className="form-control pass-input"
                          name="confirmPassword"
                          required
                          value={form.confirmPassword}
                          onChange={handleChange}
                        />
                        <span className="toggle-password" onClick={() => setConfirmPasswordVisible(v => !v)}>
                          {confirmPasswordVisible ? <EyeOff className="react-feather-custom" /> : <Eye className="react-feather-custom" />}
                        </span>
                      </div>
                      <div className="form-group">
                        <label>Role <span className="login-danger">*</span></label>
                        <select
                          className="form-control"
                          name="role"
                          required
                          value={form.role}
                          onChange={handleChange}
                        >
                          <option value="">Select role</option>
                          {roles.map(r => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group login-btn mt-3">
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                      </div>
                    </form>

                    <div className="next-sign">
                      <p className="account-subtitle">
                        Already have an account? <Link to="/login">Login</Link>
                      </p>
                      <div className="social-login">
                        <Link to="#"><img src={loginicon01} alt="#" /></Link>
                        <Link to="#"><img src={loginicon02} alt="#" /></Link>
                        <Link to="#"><img src={loginicon03} alt="#" /></Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Register Form Section */}
        </div>
      </div>
    </div>
  );
};

export default Register;
