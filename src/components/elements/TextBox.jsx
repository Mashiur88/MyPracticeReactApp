import React from 'react';

const TextBox = ({ label, value, onChange, placeholder, className = '' }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded p-2 w-full"
            />
        </div>
    );
};

export default TextBox;

