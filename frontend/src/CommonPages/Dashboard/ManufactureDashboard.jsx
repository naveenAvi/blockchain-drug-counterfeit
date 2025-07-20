import React, { useEffect, useRef } from 'react';
import { Input, Select, Button, Table } from 'antd';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

import Header from '../Header';
import Sidebar from '../Sidebar';
import { getDashboardData } from '../../Shared/Services/manufacturerServices';

const { Search } = Input;
const { Option } = Select;

const ManufactureDashboard = () => {
    const [dashboardMetrics, setDashboardMetrics] = React.useState({
        totalOrders: 0,
        pendingOrders: 0,
        createdOrders: 0,
        rejectedOrders: 0,
    });

    const chartRef1 = useRef(null);
    const chartInstanceRef1 = useRef(null);

    const chartRef2 = useRef(null);
    const chartInstanceRef2 = useRef(null);

    useEffect(() => {
        // Cleanup previous instances
        if (chartInstanceRef1.current) {
            chartInstanceRef1.current.destroy();
        }
        if (chartInstanceRef2.current) {
            chartInstanceRef2.current.destroy();
        }

        // Chart 1: Order counts
        if (chartRef1.current) {
            chartInstanceRef1.current = new Chart(chartRef1.current, {
                type: 'doughnut',
                data: {
                    labels: ['Total Orders', 'Processing', 'Delivered', 'Cancelled'],
                    datasets: [{
                        data: [
                            dashboardMetrics.totalOrders,
                            dashboardMetrics.pendingOrders,
                            dashboardMetrics.createdOrders,
                            dashboardMetrics.rejectedOrders
                        ],
                        backgroundColor: [
                            '#a6c8ff',
                            '#83e1b8',
                            '#4a90e2',
                            '#50e3c2',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } }
                }
            });
        }

        if (chartRef2.current) {
            chartInstanceRef2.current = new Chart(chartRef2.current, {
                type: 'doughnut',
                data: {
                    labels: ['Total Amount', 'Processing Amount', 'Delivered Amount', 'Cancelled Amount'],
                    datasets: [{
                        data: [
                            dashboardMetrics.totalAmount,
                            dashboardMetrics.pendingAmount,
                            dashboardMetrics.createdAmount,
                            dashboardMetrics.rejectedAmount
                        ],
                        backgroundColor: [
                            '#ffd699',
                            '#ffad33',
                            '#ff944d',
                            '#ff6f61',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } }
                }
            });
        }

        return () => {
            if (chartInstanceRef1.current) {
                chartInstanceRef1.current.destroy();
            }
            if (chartInstanceRef2.current) {
                chartInstanceRef2.current.destroy();
            }
        };
    }, [dashboardMetrics]);


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
    const getDashboardDataAc = () => {
        getDashboardData({}).then(response => {
            setDashboardMetrics({
                totalOrders: response.data.allOrders.count,
                totalAmount: response.data.allOrders.sum,
                pendingOrders: response.data.pending.count,
                pendingAmount: response.data.pending.sum,
                createdOrders: response.data.created.count,
                createdAmount: response.data.created.sum,
                rejectedOrders: response.data.rejected.count,
                rejectedAmount: response.data.rejected.sum,
            });
        })
    }
    useEffect(() => {
        getDashboardDataAc()
    }, [])


    return (
        <>
            <Header />
            <Sidebar id="menu-item13" id1="menu-items13" activeClassName="dashboard" />

            <div className="page-wrapper">
                <div className="content">
                    <div className="col-12 mt-4">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h2 className="fw-bold mb-4">Manufacture Dashboard</h2>

                                    </div>
                                    
                                </div>

                                {/* Dashboard Cards */}
                                <div className="row mb-4">
                                    <div className="col-md-3">
                                        <div className="card mb-3" style={{ backgroundColor: '#e6f0ff' }}>
                                            <div className="card-body">
                                                <h5 className="card-title text-primary">Total Orders</h5>
                                                <p className="card-text fs-3 fw-bold text-primary">
                                                    {dashboardMetrics.totalOrders}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card mb-3" style={{ backgroundColor: '#fff9e6' }}>
                                            <div className="card-body">
                                                <h5 className="card-title text-warning">Processing</h5>
                                                <p className="card-text fs-3 fw-bold text-warning">
                                                    {dashboardMetrics.pendingOrders}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card mb-3" style={{ backgroundColor: '#e6ffe6' }}>
                                            <div className="card-body">
                                                <h5 className="card-title text-success">Delivered</h5>
                                                <p className="card-text fs-3 fw-bold text-success">
                                                    {dashboardMetrics.createdOrders}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card mb-3" style={{ backgroundColor: '#ffe6e6' }}>
                                            <div className="card-body">
                                                <h5 className="card-title text-danger">Cancelled</h5>
                                                <p className="card-text fs-3 fw-bold text-danger">
                                                    {dashboardMetrics.rejectedOrders}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center gx-3">
                                    <div className="col-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Order status</h5>
                                                <canvas ref={chartRef1}></canvas>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Order status</h5>
                                                <canvas ref={chartRef2}></canvas>
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
