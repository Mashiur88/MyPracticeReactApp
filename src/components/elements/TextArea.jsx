import React from 'react';

const TextArea = ({ label, value, onChange, placeholder, className = '', rows = 4 }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="border border-gray-300 rounded p-2 w-full resize-none"
            />
        </div>
    );
};

export default TextArea;

