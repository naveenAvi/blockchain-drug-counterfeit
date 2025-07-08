import React, { useState, useEffect } from 'react';
import { Table, Spin, message, Tag } from "antd";
import { onShowSizeChange, itemRender } from '../Pagination';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { searchnormal, refreshicon } from '../imagepath';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getEntities } from '../../Shared/Services/entityService';

const ListConnectedParties = () => {
    const { entityType } = useParams();
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const fetchEntities = async () => {
        setLoading(true);
        try {
            const res = await getEntities();
            if (res.data.success) {
                setEntities(res.data.data);
            } else {
                message.error("Failed to load entities.");
            }
        } catch (error) {
            console.error(error);
            message.error("Error fetching data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntities();
    }, []);

    const columns = [
        { title: "Entity Type", dataIndex: "type", key: "type", render: type => <Tag color="blue">{type}</Tag> },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Contact", dataIndex: "contact", key: "contact" },
        { title: "Country", dataIndex: "country", key: "country" },
        { title: "License Type", dataIndex: "license_type", key: "license_type" },
        { title: "License Number", dataIndex: "license_number", key: "license_number" },
        { title: "Established", dataIndex: "established_year", key: "established_year" },
        {
            title: "Logo",
            dataIndex: "logo_path",
            key: "logo_path",
            render: path => path ? (
                <img src={`/${path}`} alt="Logo" style={{ width: 40, height: 40 }} />
            ) : "-"
        },
        {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            render: active => (
                <Tag color={active ? "green" : "red"}>
                    {active ? "Active" : "Inactive"}
                </Tag>
            )
        },
        {
            title: "Actions",
            render: (text, record) => (
                <div className="text-end">
                    <div className="dropdown dropdown-action">
                        <Link to="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fas fa-ellipsis-v" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to={`/entity-user-create/${record.entID}`}>
                                <i className="far fa-eye me-2" />
                                Create Users
                            </Link>
                            <Link className="dropdown-item" to={`/entity-user-list/${record.entID}`}>
                                <i className="far fa-eye me-2" />
                                Manage Users
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <>
            <Header />
            <Sidebar id="menu-item12" id1="menu-items12" activeClassName="connected-entities" />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">list party</Link></li>
                                    <li className="breadcrumb-item active">{entityType}</li>
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
                                                <h3>Connected {entityType}</h3>
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
                                                    <button onClick={fetchEntities} className="btn btn-primary">
                                                        <img src={refreshicon} alt="refresh" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        {loading ? (
                                            <div className="text-center py-5"><Spin size="large" /></div>
                                        ) : (
                                            <Table
                                                pagination={{
                                                    total: entities.length,
                                                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                    onShowSizeChange,
                                                    itemRender,
                                                }}
                                                rowKey="id"
                                                dataSource={entities}
                                                columns={columns}
                                                rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                                            />
                                        )}
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

export default ListConnectedParties;
