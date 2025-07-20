import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "feather-icons-react";
import { userSignupAction } from "../../Shared/Services/userServices";

import { signup02, signupicon01, signupicon02, signupicon03, signuplogo } from "../imagepath";
import { useUser } from "../../Shared/contexts/userContext";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const userSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await userSignupAction({ email, password });

      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      localStorage.setItem('authToken', token);
      setUser(user);

      //should be addedddd
      if (user.role === 'manufacturer') {
        navigate('/manufacturer/dashboard');
      } else if (user.role === 'pharmacy') {
        navigate('/pharmacy/dashboard');
      } else if (user.role === 'distributor') {
        navigate('/distributor/dashboard');
      } else {
        navigate('/user/dashboard');
      }

    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="main-wrapper signup-body">
      <div className="container-fluid px-0">
        <div className="row">
          {/* Image/Logo Section */}
          <div className="col-lg-6 signup-wrap">
            <div className="signup-sec">
              <div className="log-img">
                <img className="img-fluid" src={signup02} alt="Signup visual" />
              </div>
            </div>
          </div>

          {/* Signup Form Section */}
          <div className="col-lg-6 signup-wrap-bg">
            <div className="signup-wrapper">
              <div className="signupbox">
                <div className="signup-right">
                  <div className="signup-right-wrap">
                    <div className="account-logo">
                      <Link to="/">
                        <img src={signuplogo} alt="Logo" />
                      </Link>
                    </div>
                    <h2>Signup</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={userSignup}>
                      <div className="form-group">
                        <label>Email <span className="signup-danger">*</span></label>
                        <input
                          className="form-control"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Password <span className="signup-danger">*</span></label>
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

                      <div className="form-group signup-btn mt-3">
                        <button type="submit" className="btn btn-primary btn-block">Signup</button>
                      </div>
                    </form>

                    <div className="next-sign">
                      <p className="account-subtitle">
                        Need an account? <Link to="/signup">Sign Up</Link>
                      </p>
                      <div className="social-signup">
                        <Link to="#"><img src={signupicon01} alt="#" /></Link>
                        <Link to="#"><img src={signupicon02} alt="#" /></Link>
                        <Link to="#"><img src={signupicon03} alt="#" /></Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Signup Form Section */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
