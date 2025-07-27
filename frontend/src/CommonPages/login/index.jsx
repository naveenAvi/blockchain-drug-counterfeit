import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "feather-icons-react";
import { userLoginAction } from "../../Shared/Services/userServices";

import { login02, loginicon01, loginicon02, loginicon03, loginlogo } from "../imagepath";
import { useUser } from "../../Shared/contexts/userContext";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const userLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await userLoginAction({ email, password });
      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      if (user.role === 'manufacturer') {
        navigate('/manufacture-dashboard');
      } else if (user.role === 'pharmacy') {
        navigate('/pharmacy/dashboard');
      } else if (user.role === 'distributor') {
        navigate('/distributor/dashboard');
      } else if (user.role === 'importer') {
        navigate('/importer-dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
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
                <img className="img-fluid" src={login02} alt="Login visual" />
              </div>
            </div>
          </div>

          {/* Login Form Section */}
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
                    <h2>Login</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={userLogin}>
                      <div className="form-group">
                        <label>Email <span className="login-danger">*</span></label>
                        <input
                          className="form-control"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Password <span className="login-danger">*</span></label>
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          className="form-control pass-input"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="toggle-password" onClick={togglePasswordVisibility}>
                          {passwordVisible ? <EyeOff className="react-feather-custom" /> : <Eye className="react-feather-custom" />}
                        </span>
                      </div>

                      <div className="forgotpass d-flex justify-content-between align-items-center">
                        <label className="custom_check d-inline-flex align-items-center mb-0">
                          Remember me
                          <input type="checkbox" />
                          <span className="checkmark ml-2" />
                        </label>
                        <Link to="/forgotpassword">Forgot Password?</Link>
                      </div>

                      <div className="form-group login-btn mt-3">
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                              Logging in...
                            </>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>
                    </form>

                    <div className="next-sign">
                      <p className="account-subtitle">
                        Need an account? <Link to="/signup">Sign Up</Link>
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
          {/* End Login Form Section */}
        </div>
      </div>
    </div>
  );
};

export default Login;
