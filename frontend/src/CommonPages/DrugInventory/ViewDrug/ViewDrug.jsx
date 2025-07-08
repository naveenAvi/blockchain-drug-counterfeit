import React, { useState, useEffect } from 'react';
import FeatherIcon from "feather-icons-react";
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import api from '../../../api';

const drugTypes = [
  { value: 'tablet', label: 'Tablet' },
  { value: 'liquid', label: 'Liquid' },
  { value: 'injection', label: 'Injection' },
  { value: 'capsule', label: 'Capsule' },
  { value: 'cream', label: 'Cream' },
  { value: 'gel', label: 'Gel' },
];

const packagingTypes = ['Blister Pack', 'Bottle', 'Vial', 'Box', 'Tube', 'Pouch'];
const routesOfAdministration = ['Oral', 'Topical', 'Intravenous', 'Intramuscular', 'Subcutaneous', 'Rectal', 'Nasal', 'Inhalational'];

const ViewDrug = () => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/drug');
      
      // Handle different possible response structures
      let drugsData = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          drugsData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          drugsData = response.data.data;
        } else if (response.data.drugs && Array.isArray(response.data.drugs)) {
          drugsData = response.data.drugs;
        } else {
          console.warn('Unexpected API response structure:', response.data);
          drugsData = [];
        }
      }
      
      setDrugs(drugsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching drugs:', err);
      setError('Failed to fetch drugs. Please try again.');
      setDrugs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredDrugs = (Array.isArray(drugs) ? drugs : []).filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (drug.drug_id && drug.drug_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (drug.active_ingredients && drug.active_ingredients.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDrugs = filteredDrugs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDrugs.length / itemsPerPage);

  const handleViewClick = (drug) => {
    setSelectedDrug(drug);
    setShowViewModal(true);
  };

  const handleEditClick = (drug) => {
    setSelectedDrug(drug);
    setEditFormData({
      name: drug.name,
      type: drug.type,
      drug_id: drug.drug_id,
      active_ingredients: drug.active_ingredients,
      excipients: drug.excipients || '',
      strength: drug.strength,
      dosage_form: drug.dosage_form || '',
      route_of_administration: drug.route_of_administration,
      packaging_type: drug.packaging_type,
      storage_conditions: drug.storage_conditions || '',
      shelf_life: drug.shelf_life,
      gs1_gtin: drug.gs1_gtin,
      regulatory_approval_region: drug.regulatory_approval_region,
      national_drug_code: drug.national_drug_code || '',
      marketing_authorization_holder: drug.marketing_authorization_holder,
      controlled_substance_schedule: drug.controlled_substance_schedule || 'Non-controlled',
      specifications: drug.specifications || ''
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (drug) => {
    setSelectedDrug(drug);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      await api.put(`/drug/${selectedDrug.id}`, editFormData);
      setShowEditModal(false);
      fetchDrugs(); // Refresh the list
      alert('Drug updated successfully!');
    } catch (err) {
      console.error('Error updating drug:', err);
      alert('Failed to update drug. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/drug/${selectedDrug.id}`);
      setShowDeleteModal(false);
      fetchDrugs(); // Refresh the list
      alert('Drug deleted successfully!');
    } catch (err) {
      console.error('Error deleting drug:', err);
      alert('Failed to delete drug. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Active': 'badge bg-success',
      'Inactive': 'badge bg-danger',
      'Pending': 'badge bg-warning',
      'Suspended': 'badge bg-secondary',
      'Non-controlled': 'badge bg-success',
      'Controlled': 'badge bg-warning'
    };
    return <span className={statusClasses[status] || 'badge bg-primary'}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <Header />
        <Sidebar id='menu-item11' id1='menu-items11' activeClassName='drug-inventory' />
        <div className="page-wrapper">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id='menu-item11' id1='menu-items11' activeClassName='drug-inventory' />
      
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/DrugInventory">Drug </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Drugs List</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="page-table-header mb-2">
            <div className="row align-items-center">
              <div className="col">
                <div className="doctor-table-blk">
                  <h3>Drugs Inventory</h3>
                  <div className="doctor-search-blk">
                    <div className="top-nav-search table-search-blk">
                      <form>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search drugs by name, ID, or ingredients..."
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                        <Link className="btn">
                          <FeatherIcon icon="search" />
                        </Link>
                      </form>
                    </div>
                    <div className="add-group">
                      <Link
                        to="/create-drug"
                        className="btn btn-primary add-pluss ms-2"
                      >
                        <FeatherIcon icon="plus" />
                      </Link>
                      <button
                        onClick={fetchDrugs}
                        className="btn btn-primary doctor-refresh ms-2"
                      >
                        <FeatherIcon icon="refresh-cw" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Drugs Table */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                                             <thead>
                         <tr>
                           <th>Drug ID</th>
                           <th>Drug Name</th>
                           <th>Type</th>
                           <th>Strength</th>
                           <th>Route</th>
                           <th>Packaging</th>
                           <th>Shelf Life</th>
                           <th>GTIN</th>
                           <th>Status</th>
                           <th>Actions</th>
                         </tr>
                       </thead>
                      <tbody>
                                                 {currentDrugs.length === 0 ? (
                           <tr>
                             <td colSpan="10" className="text-center">
                               {searchTerm ? 'No drugs found matching your search.' : 'No drugs available.'}
                             </td>
                           </tr>
                        ) : (
                          currentDrugs.map((drug) => (
                            <tr key={drug.id}>
                              <td>
                                <strong>{drug.drug_id}</strong>
                              </td>
                              <td>
                                <div>
                                  <h6 className="mb-0">{drug.name}</h6>
                                  <small className="text-muted">
                                    {drug.marketing_authorization_holder}
                                  </small>
                                </div>
                              </td>
                                                             <td>
                                 <span className="badge bg-info">{drug.type}</span>
                               </td>
                               <td>{drug.strength}</td>
                              <td>{drug.route_of_administration}</td>
                              <td>{drug.packaging_type}</td>
                              <td>{drug.shelf_life}</td>
                              <td>
                                <code>{drug.gs1_gtin}</code>
                              </td>
                              <td>{getStatusBadge(drug.controlled_substance_schedule || 'Active')}</td>
                              <td>
                                                                 <div className="actions">
                                   <button
                                     onClick={() => handleViewClick(drug)}
                                     className="btn btn-sm btn-outline-primary me-1"
                                     title="View Details"
                                   >
                                     <FeatherIcon icon="eye" size={14} />
                                   </button>
                                                                     <button
                                     onClick={() => handleEditClick(drug)}
                                     className="btn btn-sm btn-outline-warning me-1"
                                     title="Edit"
                                   >
                                     <FeatherIcon icon="edit-2" size={14} />
                                   </button>
                                   <button
                                     onClick={() => handleDeleteClick(drug)}
                                     className="btn btn-sm btn-outline-danger"
                                     title="Delete"
                                   >
                                     <FeatherIcon icon="trash-2" size={14} />
                                   </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div>
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDrugs.length)} of {filteredDrugs.length} drugs
                      </div>
                      <nav>
                        <ul className="pagination">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
                     </div>
         </div>
       </div>

       {/* Edit Drug Modal */}
       {showEditModal && (
         <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
           <div className="modal-dialog modal-lg modal-dialog-centered">
             <div className="modal-content">
               <div className="modal-header bg-primary text-white">
                 <h5 className="modal-title">
                   <FeatherIcon icon="edit-2" className="me-2" />
                   Edit Drug: {selectedDrug?.name}
                 </h5>
                 <button
                   type="button"
                   className="btn-close btn-close-white"
                   onClick={() => setShowEditModal(false)}
                 ></button>
               </div>
               <form onSubmit={handleEditSubmit}>
                 <div className="modal-body">
                   <div className="row">
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Drug Name <span className="text-danger">*</span></label>
                         <input
                           type="text"
                           name="name"
                           className="form-control"
                           value={editFormData.name || ''}
                           onChange={handleEditChange}
                           required
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Drug Type <span className="text-danger">*</span></label>
                         <select
                           name="type"
                           className="form-control"
                           value={editFormData.type || ''}
                           onChange={handleEditChange}
                           required
                         >
                           <option value="">Select drug type</option>
                           {drugTypes.map(type => (
                             <option key={type.value} value={type.value}>{type.label}</option>
                           ))}
                         </select>
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Drug ID <span className="text-danger">*</span></label>
                         <input
                           type="text"
                           name="drug_id"
                           className="form-control"
                           value={editFormData.drug_id || ''}
                           onChange={handleEditChange}
                           required
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Active Ingredients <span className="text-danger">*</span></label>
                         <input
                           type="text"
                           name="active_ingredients"
                           className="form-control"
                           value={editFormData.active_ingredients || ''}
                           onChange={handleEditChange}
                           required
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Strength <span className="text-danger">*</span></label>
                         <input
                           type="text"
                           name="strength"
                           className="form-control"
                           value={editFormData.strength || ''}
                           onChange={handleEditChange}
                           required
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Route of Administration</label>
                         <select
                           name="route_of_administration"
                           className="form-control"
                           value={editFormData.route_of_administration || ''}
                           onChange={handleEditChange}
                         >
                           <option value="">Select route</option>
                           {routesOfAdministration.map(route => (
                             <option key={route} value={route}>{route}</option>
                           ))}
                         </select>
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Packaging Type <span className="text-danger">*</span></label>
                         <select
                           name="packaging_type"
                           className="form-control"
                           value={editFormData.packaging_type || ''}
                           onChange={handleEditChange}
                           required
                         >
                           <option value="">Select packaging</option>
                           {packagingTypes.map(pkg => (
                             <option key={pkg} value={pkg}>{pkg}</option>
                           ))}
                         </select>
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Shelf Life <span className="text-danger">*</span></label>
                         <input
                           type="text"
                           name="shelf_life"
                           className="form-control"
                           value={editFormData.shelf_life || ''}
                           onChange={handleEditChange}
                           required
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">GS1 GTIN <span className="text-danger">*</span></label>
                         <input
                           type="text"
                           name="gs1_gtin"
                           className="form-control"
                           value={editFormData.gs1_gtin || ''}
                           onChange={handleEditChange}
                           required
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Regulatory Approval Region <span className="text-danger">*</span></label>
                         <input
                           type="text"
                           name="regulatory_approval_region"
                           className="form-control"
                           value={editFormData.regulatory_approval_region || ''}
                           onChange={handleEditChange}
                           required
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Marketing Authorization Holder</label>
                         <input
                           type="text"
                           name="marketing_authorization_holder"
                           className="form-control"
                           value={editFormData.marketing_authorization_holder || ''}
                           onChange={handleEditChange}
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Excipients</label>
                         <input
                           type="text"
                           name="excipients"
                           className="form-control"
                           value={editFormData.excipients || ''}
                           onChange={handleEditChange}
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">Storage Conditions</label>
                         <input
                           type="text"
                           name="storage_conditions"
                           className="form-control"
                           value={editFormData.storage_conditions || ''}
                           onChange={handleEditChange}
                         />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label className="form-label">National Drug Code</label>
                         <input
                           type="text"
                           name="national_drug_code"
                           className="form-control"
                           value={editFormData.national_drug_code || ''}
                           onChange={handleEditChange}
                         />
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="modal-footer">
                   <button
                     type="button"
                     className="btn btn-secondary"
                     onClick={() => setShowEditModal(false)}
                   >
                     Cancel
                   </button>
                   <button
                     type="submit"
                     className="btn btn-primary"
                     disabled={editLoading}
                   >
                     {editLoading ? (
                       <>
                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                         Updating...
                       </>
                     ) : (
                       <>
                         <FeatherIcon icon="save" className="me-2" />
                         Update Drug
                       </>
                     )}
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       )}

       {/* Delete Drug Modal */}
       {showDeleteModal && (
         <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
           <div className="modal-dialog modal-dialog-centered">
             <div className="modal-content">
               <div className="modal-header bg-danger text-white">
                 <h5 className="modal-title">
                   <FeatherIcon icon="trash-2" className="me-2" />
                   Delete Drug
                 </h5>
                 <button
                   type="button"
                   className="btn-close btn-close-white"
                   onClick={() => setShowDeleteModal(false)}
                 ></button>
               </div>
               <div className="modal-body">
                 <div className="text-center">
                   <div className="mb-3">
                     <FeatherIcon icon="alert-triangle" size={48} className="text-danger" />
                   </div>
                   <h5>Are you sure you want to delete this drug?</h5>
                   <p className="text-muted">
                     <strong>{selectedDrug?.name}</strong> ({selectedDrug?.drug_id})
                   </p>
                   <p className="text-danger small">
                     This action cannot be undone. All drug information will be permanently deleted.
                   </p>
                 </div>
               </div>
               <div className="modal-footer">
                 <button
                   type="button"
                   className="btn btn-secondary"
                   onClick={() => setShowDeleteModal(false)}
                 >
                   Cancel
                 </button>
                 <button
                   type="button"
                   className="btn btn-danger"
                   onClick={handleDeleteConfirm}
                   disabled={deleteLoading}
                 >
                   {deleteLoading ? (
                     <>
                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                       Deleting...
                     </>
                   ) : (
                     <>
                       <FeatherIcon icon="trash-2" className="me-2" />
                       Delete Drug
                     </>
                   )}
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}

       {/* View Drug Modal */}
       {showViewModal && (
         <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
           <div className="modal-dialog modal-lg modal-dialog-centered">
             <div className="modal-content">
               <div className="modal-header bg-info text-white">
                 <h5 className="modal-title">
                   <FeatherIcon icon="eye" className="me-2" />
                   Drug Details: {selectedDrug?.name}
                 </h5>
                 <button
                   type="button"
                   className="btn-close btn-close-white"
                   onClick={() => setShowViewModal(false)}
                 ></button>
               </div>
               <div className="modal-body">
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Drug Name</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.name}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Drug Type</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         <span className="badge bg-info">{selectedDrug?.type}</span>
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Drug ID</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         <code>{selectedDrug?.drug_id}</code>
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Active Ingredients</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.active_ingredients}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Strength</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.strength}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Route of Administration</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.route_of_administration}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Packaging Type</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.packaging_type}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Shelf Life</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.shelf_life}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">GS1 GTIN</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         <code>{selectedDrug?.gs1_gtin}</code>
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Regulatory Approval Region</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.regulatory_approval_region}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Marketing Authorization Holder</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.marketing_authorization_holder}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Excipients</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.excipients || 'Not specified'}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Storage Conditions</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.storage_conditions || 'Not specified'}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">National Drug Code</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.national_drug_code || 'Not specified'}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Controlled Substance Schedule</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {getStatusBadge(selectedDrug?.controlled_substance_schedule || 'Non-controlled')}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-12">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Dosages</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.dosages && selectedDrug.dosages.length > 0 ? (
                           <ul className="list-unstyled mb-0">
                             {selectedDrug.dosages.map((dosage, index) => (
                               <li key={index} className="badge bg-secondary me-2 mb-1">{dosage}</li>
                             ))}
                           </ul>
                         ) : (
                           'No dosages specified'
                         )}
                       </div>
                     </div>
                   </div>
                   {selectedDrug?.specifications && (
                     <div className="col-md-12">
                       <div className="form-group mb-3">
                         <label className="form-label fw-bold text-muted">Specifications</label>
                         <div className="form-control-plaintext border rounded p-2 bg-light">
                           <div dangerouslySetInnerHTML={{ __html: selectedDrug.specifications }} />
                         </div>
                       </div>
                     </div>
                   )}
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Created At</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.created_at ? new Date(selectedDrug.created_at).toLocaleDateString() : 'Not available'}
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group mb-3">
                       <label className="form-label fw-bold text-muted">Last Updated</label>
                       <div className="form-control-plaintext border rounded p-2 bg-light">
                         {selectedDrug?.updated_at ? new Date(selectedDrug.updated_at).toLocaleDateString() : 'Not available'}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="modal-footer">
                 <button
                   type="button"
                   className="btn btn-secondary"
                   onClick={() => setShowViewModal(false)}
                 >
                   Close
                 </button>
                 <button
                   type="button"
                   className="btn btn-primary"
                   onClick={() => {
                     setShowViewModal(false);
                     handleEditClick(selectedDrug);
                   }}
                 >
                   <FeatherIcon icon="edit-2" className="me-2" />
                   Edit Drug
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}

       {/* Modal Backdrop */}
       {(showEditModal || showDeleteModal || showViewModal) && (
         <div className="modal-backdrop fade show"></div>
       )}
     </div>
   );
 };

export default ViewDrug;
