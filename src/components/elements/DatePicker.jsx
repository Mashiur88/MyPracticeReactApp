// src/components/elements/DatePicker.jsx
import React from 'react';

const DatePicker = ({ label, value, onChange, className = '' }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            <input
                type="date"
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded p-2 w-full"
            />
        </div>
    );
};

export default DatePicker;
