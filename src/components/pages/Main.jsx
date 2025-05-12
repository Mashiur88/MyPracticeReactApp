import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import { FaPlus, FaEdit, FaTrash, FaUserPlus, FaExchangeAlt } from 'react-icons/fa';

import TaskList from './task/TaskList';
import Noticeboard from './dashboard/Noticeboard';
import LoginPage from './LoginPage';
import PrivateRoute from '../common/PrivateRoute';

const Main = () => {
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <div className="flex-1 p-4">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/" element={isAuthenticated ? <Noticeboard /> : <Navigate to="/login" replace />} /> */}
                <Route path="/" element={
                    <PrivateRoute>
                        <Noticeboard /> 
                    </PrivateRoute>
                } />
                <Route path="/tasks" element={
                    <PrivateRoute>
                        <TaskList/>
                    </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />}/>
                {/* Add other dynamic components here */}
            </Routes>
        </div>
    );
};

export default Main;
