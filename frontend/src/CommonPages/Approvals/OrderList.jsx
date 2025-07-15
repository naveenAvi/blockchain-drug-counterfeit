/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import { onShowSizeChange, itemRender } from '../Pagination';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { plusicon, refreshicon, searchnormal, pdficon, pdficon3, pdficon4, imagesend } from '../imagepath';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { getorderList } from '../../Shared/Services/ImporterServices';

const OrderList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [datasource, setdatasource] = useState([]);
  

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    getorderList().then((response) => {
      setdatasource(response.data.data);
    })
  }, [])
  
  

 const columns = [
    {
      title: "Drug Name",
      dataIndex: "drug_name",
      sorter: (a, b) => a.drugName.localeCompare(b.drugName),
    },
    {
      title: "Type",
      dataIndex: "drug_type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Importer",
      dataIndex: "importer_name",
      sorter: (a, b) => a.dosage.localeCompare(b.dosage),
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer_name",
      sorter: (a, b) => a.manufacturer.localeCompare(b.manufacturer),
    },
    {
      title: "Invoice No.",
      dataIndex: "invoiceNumber",
      sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={`badge bg-${
            text === "Approved"
              ? "success"
              : text === "Rejected"
              ? "danger"
              : "warning"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="text-end">
          <div className="dropdown dropdown-action">
            <Link
              to="#"
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-ellipsis-v" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to={`/order-list-view/5`}>
                <i className="far fa-eye me-2" />
                View
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="far fa-check-circle me-2" />
                Approve
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="far fa-times-circle me-2" />
                Reject
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Sidebar id="menu-item2" id1="menu-items2" activeClassName="order-list" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="#">Orders</Link></li>
                  <li className="breadcrumb-item active">Order List</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body">
                  <div className="page-table-header mb-2">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3>Placed Orders</h3>
                      </div>
                      <div className="col-auto text-end">
                        <div className="top-nav-search">
                          <form>
                            <input type="text" className="form-control" placeholder="Search..." />
                            <button type="submit" className="btn">
                              <img src={searchnormal} alt="search" />
                            </button>
                          </form>
                        </div>
                        <div className="add-group ms-2">
                          <Link to="#" className="btn btn-primary">
                            <img src={refreshicon} alt="refresh" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: datasource.length,
                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      columns={columns}
                      dataSource={datasource}
                      rowKey={(record) => record.order_number}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
