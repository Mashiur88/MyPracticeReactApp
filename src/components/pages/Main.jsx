import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaUserPlus, FaExchangeAlt } from 'react-icons/fa';

import TaskList from './task/TaskList';
import Noticeboard from './dashboard/Noticeboard';

const Main = () => {
    return (
        <div className="flex-1 p-4">
            <Routes>
                <Route path="/" element={<Noticeboard />} />
                <Route path="/tasks" element={<TaskList />} />
                {/* Add other dynamic components here */}
            </Routes>
        </div>
    );
};

export default Main;
