import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { authURL } from '../Consts/ENV';
import axios from 'axios';

const LoggedInUserLayout = ({ userRole }) => {
    const { user } = useUser();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to={authURL} replace />;
    }

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    navigate(authURL, { replace: true });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate]);

    return <Outlet />;
};

export default LoggedInUserLayout;
