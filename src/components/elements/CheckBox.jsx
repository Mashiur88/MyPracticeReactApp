import React from 'react';

const CheckBox = ({ label, checked, onChange, className = '' }) => {
    return (
        <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={onChange} 
                className="form-checkbox w-5 h-5 accent-blue-500"
            />
            {label && <span>{label}</span>}
        </label>
    );
};

export default CheckBox;
