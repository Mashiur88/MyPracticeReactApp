import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="bg-gray-200 p-4 w-64">
            <ul>
                <li>
                    <Link to="/" className="block p-2 hover:bg-gray-300">Dashboard</Link>
                </li>
                <li>
                    <Link to="/tasks" className="block p-2 hover:bg-gray-300">All Pending Tasks</Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
