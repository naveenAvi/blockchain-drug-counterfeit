import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  cameraicon,
  doctor,
  imagesend,
  menuicon16,
  profilebg,
  profileuser01,
} from "../imagepath";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { confirmAndCreateTokens, getManuorderListByID } from "../../Shared/Services/manufacturerServices";
import { getTransactionsByReference } from "../../Shared/Services/TransactionServices";

const getHeaderCards = (order, Transactions) => {
  const totalAmount = order.total_amount;
  const paidAmount = Transactions.reduce((total, item) => total + Number(item.amount), 0);
  const remaining = totalAmount - paidAmount;

  const isPaidOff = remaining === 0;

  return (
    <div className="d-flex flex-row gap-2" style={{ width: "100%" }}>

      <div
        className="card p-3 rounded flex-grow-1"
        style={{ backgroundColor: '#e6f0ff', color: '#0d6efd' }}
      >
        <h5>Total Amount</h5>
        <h4>{totalAmount}</h4>
      </div>

      <div
        className="card p-3 rounded flex-grow-1"
        style={{ backgroundColor: '#fff9e6', color: '#ffc107' }}
      >
        <h5>Created</h5>
        <h4>{paidAmount}</h4>
      </div>

      <div
        className="card p-3 rounded flex-grow-1"
        style={{
          backgroundColor: isPaidOff ? '#e6ffe6' : '#ffe6e6',
          color: isPaidOff ? '#198754' : '#dc3545',
        }}
      >
        <h5>Remaining</h5>
        <h4>{remaining}</h4>
      </div>
    </div>
  );
};

const OrderDetailsPage = () => {

  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [Transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    batchID: '',
    amount: '',
  });

  const [formErrors, setFormErrors] = useState({
    batchID: '',
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = () => {
    let errors = {};

    if (!formData.batchID.trim()) {
      errors.batchID = 'Batch ID is required';
    }

    if (!formData.amount) {
      errors.amount = 'Amount is required';
    } else if (formData.amount <= 0) {
      errors.amount = 'Amount must be greater than zero';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    confirmcreation()
  };


  useEffect(() => {
    getManuorderListByID({ orderid: orderId }).then(response => {
      setOrder(response.data.data[0]);
      if (response.data.data[0]) {
        setTransactions(response.data.data[0].transactions || []);
      }
    });
    // getTransactionsByReference(orderId).then(response => {
    //   setTransactions(response.data)
    //   console.log(response.data)
    // })
  }, [orderId]);

  const confirmcreation = () => {
    setIsLoading(true);
    
    confirmAndCreateTokens({...order, amount: formData.amount, batchID: formData.batchID})
      .then(response => {
        navigate(`/transaction-status/${order.order_number}-${formData.batchID}`)
        // AlertService.success('Created and assigned to the manufacturer');
      })
      .catch(error => {
        navigate(`/transaction-status/${order.order_number}-${formData.batchID}`)

        // AlertService.error('Failed to create tokens: ' + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <div>
      <>
        <Header />
        <Sidebar id="menu-item2" id1="menu-items2" activeClassName="patient" />
        <>
          <div className="page-wrapper">
            <div className="content">
              {/* Page Header */}
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="#">Orders </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <i className="feather-chevron-right">
                          <FeatherIcon icon="chevron-right" />
                        </i>
                      </li>
                      <li className="breadcrumb-item active">
                        Order Details
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="about-info">
                            <h4>
                              Order details from {" "} {order.importer_name}
                              <span>
                                <Link to="#">
                                  <i className="feather-more-vertical">
                                    <FeatherIcon icon="more-vertical" />
                                  </i>
                                </Link>
                              </span>
                            </h4>
                          </div>
                          <div className="doctor-profile-head">
                            {/* <div className="profile-bg-img">
                              <img src={profilebg} alt="Profile" />
                            </div> */}
                            <div className="row">
                              <div className="col-lg-4 col-md-4">
                                <div className="profile-user-box">
                                  <div className="profile-user-img">
                                    <img src={profileuser01} alt="Profile" />

                                  </div>
                                  <div className="names-profiles">
                                    <h4>{order.drug_name}</h4>
                                    <h5>{order.drug_type}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-8 col-md-4 d-flex align-items-center">
                                {getHeaderCards(order, Transactions)}
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="doctor-personals-grp">
                        <div className="card">
                          <div class="card-body">
                            <h6 class="fw-bold mb-3">Order details</h6>
                            <div>
                              <div class="d-flex align-items-center mb-3">
                                <span class="avatar rounded-circle bg-light text-dark fs-16 flex-shrink-0 me-2">
                                  <i class="ti ti-file"></i>
                                </span>
                                <div>
                                  <h6 class="fw-semibold fs-13 mb-1">Drug Name</h6>
                                  <p>{order.drug_name}</p>
                                </div>
                              </div>
                              <div class="d-flex align-items-center mb-3">
                                <span class="avatar rounded-circle bg-light text-dark fs-16 flex-shrink-0 me-2">
                                  <i class="ti ti-phone"></i>
                                </span>
                                <div>
                                  <h6 class="fw-semibold fs-13 mb-1">Drug Strength</h6>
                                  <p>{order.drug_strength}</p>
                                </div>
                              </div>
                              <div class="d-flex align-items-center mb-3">
                                <span class="avatar rounded-circle bg-light text-dark fs-16 flex-shrink-0 me-2">
                                  <i class="ti ti-mail"></i>
                                </span>
                                <div>
                                  <h6 class="fw-semibold fs-13 mb-1">Drug Type</h6>
                                  <p>{order.drug_type}</p>
                                </div>
                              </div>
                              <div class="d-flex align-items-center mb-3">
                                <span class="avatar rounded-circle bg-light text-dark fs-16 flex-shrink-0 me-2">
                                  <i class="ti ti-map-pin-check"></i>
                                </span>
                                <div>
                                  <h6 class="fw-semibold fs-13 mb-1">Importer Name</h6>
                                  <p>{order.importer_name}</p>
                                </div>
                              </div>
                              <div class="d-flex align-items-center mb-3">
                                <span class="avatar rounded-circle bg-light text-dark fs-16 flex-shrink-0 me-2">
                                  <i class="ti ti-calendar-event"></i>
                                </span>
                                <div>
                                  <h6 class="fw-semibold fs-13 mb-1">Invoice Number</h6>
                                  <p>{order.invoice_number}</p>
                                </div>
                              </div>
                              <div class="d-flex align-items-center mb-3">
                                <span class="avatar rounded-circle bg-light text-dark fs-16 flex-shrink-0 me-2">
                                  <i class="ti ti-droplet"></i>
                                </span>
                                <div>
                                  <h6 class="fw-semibold fs-13 mb-1">Order Date</h6>
                                  <p>{order.order_date}</p>
                                </div>
                              </div>
                              <div class="d-flex align-items-center mb-3">
                                <span class="avatar rounded-circle bg-light text-dark fs-16 flex-shrink-0 me-2">
                                  <i class="ti ti-user-check"></i>
                                </span>
                                <div>
                                  <h6 class="fw-semibold fs-13 mb-1">Order Number</h6>
                                  <p>{order.order_number}</p>
                                </div>
                              </div>
                              <div class="d-flex align-items-center">
                                <span class="avatar rounded-circle bg-light text-dark fs-16 flex-shrink-0 me-2">
                                  <i class="ti ti-gender-male"></i>
                                </span>
                                <div>
                                  <h6 class="fw-semibold fs-13 mb-1">status</h6>
                                  <p>{order.status}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="col-lg-8">
                      <div className="doctor-personals-grp">

                        <div className="card">
                          <div className="card-header">
                            <h4 className="card-title ">Drug Creation History</h4>
                          </div>
                          <div className="card-body p-0 table-dash">
                            <div className="table-responsive">
                              <table className="table mb-0 border-0 datatable custom-table patient-profile-table">
                                <thead>
                                  <tr>
                                    <th>Created At</th>

                                    <th>Drug ID</th>
                                    <th>Batch ID</th>
                                    <th>Status</th>
                                    <th>AMount</th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                  {Transactions.map(item => {
                                    const formattedDate = new Date(item.created_at).toLocaleString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    });
                                    return <tr>
                                      <td>{formattedDate}</td>
                                      <td>{item.drugid}</td>
                                      <td>{item.batchID}</td>
                                      <td>{item.status}</td>
                                      <td>{item.amount}</td>
                                      <td className="text-end">
                                        <div className="dropdown dropdown-action">
                                          <Link
                                            to="#"
                                            className="action-icon dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="fa fa-ellipsis-v" />
                                          </Link>
                                          <div className="dropdown-menu dropdown-menu-end">
                                            <Link
                                              className="dropdown-item"
                                              to="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#delete_patient"
                                            >
                                              <i className="fa fa-trash-alt m-r-5"></i>{" "}
                                              Delete
                                            </Link>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  })}


                                  <tr>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={new Date().toLocaleString('en-GB', {
                                          day: '2-digit',
                                          month: '2-digit',
                                          year: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={order.drugID}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <div>
                                        <input
                                          type="text"
                                          className={`form-control ${formErrors.batchID ? 'is-invalid' : ''}`}
                                          name="batchID"
                                          value={formData.batchID}
                                          onChange={handleChange}
                                        />
                                        {formErrors.batchID && (
                                          <div className="invalid-feedback">{formErrors.batchID}</div>
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value="Pending"
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <div>
                                        <input
                                          type="number"
                                          className={`form-control ${formErrors.amount ? 'is-invalid' : ''}`}
                                          name="amount"
                                          value={formData.amount}
                                          onChange={handleChange}
                                          placeholder="Enter Amount"
                                        />
                                        {formErrors.amount && (
                                          <div className="invalid-feedback">{formErrors.amount}</div>
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
                                        {isLoading ? (
                                          <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                            Creating...
                                          </>
                                        ) : (
                                          'Create'
                                        )}
                                      </button>
                                    </td>
                                  </tr>

                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div
            id="delete_patient"
            className="modal fade delete-modal"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img src={imagesend} alt="" width={50} height={46} />
                  <h3>Are you sure want to delete this ?</h3>
                  <div className="m-t-20">
                    {" "}
                    <Link
                      to="#"
                      className="btn btn-white me-2"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </Link>
                    <button type="submit" className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    </div>
  );
};

export default OrderDetailsPage;
