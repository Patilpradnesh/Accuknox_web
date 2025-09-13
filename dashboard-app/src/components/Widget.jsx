import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../redux/dashboardSlice';

const Widget = ({ widget, categoryId }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeWidget({ categoryId, widgetId: widget.id }));
    };

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 group">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-slate-900">{widget.name}</h4>
                <button
                    onClick={handleRemove}
                    className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Remove widget"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="flex items-center justify-center h-32 bg-slate-50 rounded-lg">
                <p className="text-slate-600 text-center">{widget.text || "No Graph data available!"}</p>
            </div>
        </div>
    );
};

export default Widget;