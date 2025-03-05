import React from 'react';
import { useState, useEffect, useRef } from "react";

const Modal = ({ isOpen, title, onClose, children, className = '', style = {} }) => {
    
    const modalRef = useRef(null);
    const [position, setPosition] = useState({ x: 300, y: 40 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handleClickOutside(event) {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // Close modal when clicking outside
          }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
          modalRef.current.querySelector("input")?.focus();
        }
    }, [isOpen]);
      
    
    if (!isOpen) return null;

    const handleMouseDown = (e) => {
        setDragging(true);
        const modal = modalRef.current.getBoundingClientRect();
        setOffset({
            x: e.clientX - modal.left,
            y: e.clientY - modal.top,
        });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
         onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div ref={modalRef} className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
                style={{
                    ...style,
                    position: "absolute",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: dragging ? "grabbing" : "default"
                }} onMouseDown={handleMouseDown}>
                {/* <div className="cursor-move bg-gray-200 p-2 rounded-t flex justify-between items-center"
                 >
                </div> */}
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
