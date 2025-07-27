import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import { onShowSizeChange, itemRender } from '../Pagination';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { searchnormal, refreshicon } from '../imagepath';
import { Link } from 'react-router-dom';
import { transactionHistory } from '../../Shared/Services/TransactionServices';
import { useUser } from '../../Shared/contexts/userContext';

const TransactionsList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [datasource, setdatasource] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        setLoading(true);
        transactionHistory()
            .then((res) => {
                const entID = user.entID;
                const formattedData = res.data.map((item) => {
                    const isCredit = item.toEntID === entID;
                    const direction = isCredit ? 'credit' : 'debit';

                    return {
                        transactionID: item.transactionID,
                        drug_name: item.drug?.name || 'N/A',
                        drug_type: item.drug?.dosage_form || 'N/A',
                        importer_name: item.from?.name || 'N/A',
                        manufacturer_name: item.to?.name || 'N/A',
                        invoiceNumber: `TX-${item.transactionID}`,
                        amount: item.amount,
                        direction,
                        amountWithSymbol: `${isCredit ? '+' : '-'}${item.amount}`,
                        status: item.status,
                        raw: item,
                        assetsID: item.assetsID,
                        batchID: item.batchID,
                    };
                });

                setdatasource(formattedData);
            })
            .catch((error) => {
                console.error(error);
                setdatasource([]);
            })
            .finally(() => setLoading(false));
    }, [user]);

    const statusColors = {
        approved: '#28a745',
        rejected: '#dc3545',
        pending: '#ffc107',
        created: '#17a2b8',
    };

    const columns = [
        {
            title: "Drug Name",
            dataIndex: "drug_name",
            sorter: (a, b) => a.drug_name.localeCompare(b.drug_name),
        },
        {
            title: "Type",
            dataIndex: "drug_type",
            sorter: (a, b) => a.drug_type.localeCompare(b.drug_type),
        },
        {
            title: "Importer",
            dataIndex: "importer_name",
            sorter: (a, b) => a.importer_name.localeCompare(b.importer_name),
        },
        {
            title: "Manufacturer",
            dataIndex: "manufacturer_name",
            sorter: (a, b) => a.manufacturer_name.localeCompare(b.manufacturer_name),
        },
        {
            title: "Asset ID",
            dataIndex: "assetsID",
        },
        {
            title: "batch ID",
            dataIndex: "batchID",
        },
        // {
        //     title: "Direction",
        //     dataIndex: "direction",
        //     render: (text) => (
        //         <span className={`badge bg-${text === 'credit' ? 'success' : 'danger'}`}>
        //             {text === 'credit' ? 'To Me' : 'From Me'}
        //         </span>
        //     ),
        // },
        {
            title: "Amount",
            dataIndex: "amountWithSymbol",
            render: (text, record) => (
                <span style={{ color: record.direction === 'credit' ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                    {text}
                </span>
            ),
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text) => {
                const color = statusColors[text?.toLowerCase()] || '#6c757d';
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
                <div className="text-end" style={{ opacity: record.assetsID ? 1 : 0 }}>
                    <div className="dropdown dropdown-action">
                        <Link
                            to={`/transaction-history/${record.assetsID}`}
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
                                    <li className="breadcrumb-item"><Link to="#">Transactions</Link></li>
                                    <li className="breadcrumb-item active">Transaction List</li>
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
                                                <h3>Transaction History</h3>
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
                                            rowKey={(record) => record.transactionID}
                                            loading={loading}
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

export default TransactionsList;
