import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Table } from 'antd';
import { getCorpUsers } from '../../Shared/Services/entityService';

const EntityUserList = () => {
  const { entityId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await getCorpUsers(entityId);
      setUsers(res.data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [entityId]);

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (_, record) => `${record.name}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="text-end">
          <Link to="#" className="btn btn-sm btn-outline-primary me-2">View</Link>
          <Link to="#" className="btn btn-sm btn-outline-secondary">Edit</Link>
        </div>
      )
    }
  ];

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar id="menu-item12" id1="menu-items12" activeClassName="user-list" />

      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <h4 className="page-title">Users for Entity ID: {entityId}</h4>
            <div className="text-end">
              <Link to={`/entities/${entityId}/users/create`} className="btn btn-primary">
                + Add User
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityUserList;
