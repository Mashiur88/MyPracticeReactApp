import React from 'react';

const Button = ({ onClick, label, icon: Icon, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`items-center gap-2 px-1 py-1 rounded ${className}`}
        >
            {Icon && <Icon className="w-5 h-5" />} {/* Renders the icon if provided */}
            <span>{label}</span>
        </button>
    );
};

export default Button;

