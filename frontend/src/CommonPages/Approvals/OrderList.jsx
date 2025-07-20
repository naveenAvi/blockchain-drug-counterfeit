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
import QRModal from '../../components/QRModal';
import { getManuorderList } from '../../Shared/Services/manufacturerServices';
import { useUser } from '../../Shared/contexts/userContext';

const OrderList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [datasource, setdatasource] = useState([]);
  const { user } = useUser();


  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (user.role === "manufacturer") {
      getManuorderList().then((response) => {
        setdatasource(response.data.data);
      }).catch((error) => {
        console.error("Error fetching order list:", error);
      });
    } else if (user.role === "importer") {
      getorderList().then((response) => {
        setdatasource(response.data.data);
      })
    }
  }, [])


  const statusColors = {
    approved: '#28a745',
    Rejected: '#dc3545',
    pending: '#ffc107',
  };
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
      render: (text) => {
        const color = statusColors[text] || '#ffc107';

        return (
          <span
            className="badge"
            style={{
              backgroundColor: color,
              color: '#fff',
              padding: '0.25em 0.6em',
              fontWeight: '600',
              borderRadius: '0.25rem',
              textTransform: 'capitalize',
              display: 'inline-block',
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="text-end">
          <div className="dropdown dropdown-action">
            <Link
              to={`/order-list-view/5`}
              className="action-icon"
            >
              <i className="fas fa-eye" />
            </Link>
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


          {/* <QRModal /> */}
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

                  <div className="table-responsive p-4">
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
