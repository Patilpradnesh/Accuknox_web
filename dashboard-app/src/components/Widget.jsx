
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../redux/dashboardSlice';
import { toast } from 'react-toastify';

const Widget = ({ widget, categoryId }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeWidget({ categoryId, widgetId: widget.id }));
        toast.dismiss(); // Remove any existing toasts
        toast.info('Widget removed!');
    };

    return (
        <div className="bg-white border rounded-3 p-4 shadow-sm widget-container position-relative h-100 d-flex flex-column justify-content-between">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-3">
                <h4 className="h5 fw-semibold text-dark mb-0">{widget.name}</h4>
                <button
                    onClick={handleRemove}
                    className="btn btn-link p-0 text-danger"
                    aria-label="Remove widget"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="d-flex align-items-center justify-content-center bg-light rounded-3" style={{ height: '8rem' }}>
                <p className="text-secondary text-center mb-0">{widget.text || "No Graph data available!"}</p>
            </div>
        </div>
    );
};

export default Widget;