import React from 'react';
import { Input, Select, Button, Table } from 'antd';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // ✅ Added this import

import Header from '../Header';
import Sidebar from '../Sidebar';

const { Search } = Input;
const { Option } = Select;

const ManufactureDashboard = () => {
    const datasource = [
        {
            order_number: 'ORD123',
            pharmacy: 'HealthPlus Pharmacy',
            status: 'Processing',
            date: '2025-07-15',
        },
        {
            order_number: 'ORD124',
            pharmacy: 'MediCare Pharmacy',
            status: 'Shipped',
            date: '2025-07-14',
        },
    ];

    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'order_number',
            key: 'order_number',
        },
        {
            title: 'Pharmacy',
            dataIndex: 'pharmacy',
            key: 'pharmacy',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const badgeClass = {
                    Processing: 'bg-warning text-dark',
                    Shipped: 'bg-info text-white',
                    Delivered: 'bg-success text-white',
                    Cancelled: 'bg-danger text-white',
                }[status] || 'bg-secondary text-white';

                return <span className={`badge ${badgeClass}`}>{status}</span>;
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('Selected:', selectedRows);
        },
    };

    const onShowSizeChange = (current, size) => {
        console.log('Page Size Changed:', size);
    };

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    return (
        <>
            <Header />
            <Sidebar id="menu-item13" id1="menu-items13" activeClassName="dashboard" />

            <div className="page-wrapper">
                <div className="content">
                    {/* Breadcrumb */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="#">Dashboard</Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Header */}
                    <div className="col-12 mt-4">


                        
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h2 className="fw-bold mb-4">Importer Dashboard</h2>
                                       
                                    </div>
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        className="ms-2 btn-primary"
                                        style={{ borderRadius: '8px' }}
                                    >
                                        New Order
                                    </Button>
                                </div>

                                {/* Dashboard Cards */}
                                <div className="row mb-4">
                                    <div className="col-md-3">
                                        <div className="card text-white bg-primary mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">Total Orders</h5>
                                                <p className="card-text fs-3 fw-bold">120</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card text-white bg-warning mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">Processing</h5>
                                                <p className="card-text fs-3 fw-bold">35</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card text-white bg-success mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">Delivered</h5>
                                                <p className="card-text fs-3 fw-bold">70</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card text-white bg-danger mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">Cancelled</h5>
                                                <p className="card-text fs-3 fw-bold">15</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                               
                                <div className="row g-3 align-items-center mb-3">
                                    <div className="col-md-4">
                                        <Search
                                            placeholder="Search orders..."
                                            allowClear
                                            className="w-100"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Select
                                            placeholder="Filter by status"
                                            className="w-100"
                                            allowClear
                                            style={{ borderRadius: '8px' }}
                                        >
                                            <Option value="Processing">Processing</Option>
                                            <Option value="Shipped">Shipped</Option>
                                            <Option value="Delivered">Delivered</Option>
                                            <Option value="Cancelled">Cancelled</Option>
                                        </Select>
                                    </div>
                                    <div className="col-md-2">
                                        <Button
                                            icon={<ReloadOutlined />}
                                            className="w-100"
                                            style={{ borderRadius: '8px' }}
                                        >
                                            Refresh
                                        </Button>
                                    </div>
                                </div>

                             
                                <div className="table-responsive">
                                    <Table
                                        rowSelection={rowSelection}
                                        pagination={{
                                            total: datasource.length,
                                            showTotal: (total, range) => (
                                                <span className="text-muted">
                                                    Showing {range[0]} to {range[1]} of {total} entries
                                                </span>
                                            ),
                                            onShowSizeChange: onShowSizeChange,
                                            itemRender: itemRender,
                                            showSizeChanger: true
                                        }}
                                        columns={columns}
                                        dataSource={datasource}
                                        rowKey={(record) => record.order_number}
                                        className="custom-table"
                                        scroll={{ x: 1200 }}
                                        style={{
                                            borderRadius: '8px',
                                            overflow: 'hidden'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManufactureDashboard;
