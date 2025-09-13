import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Category from './Category';
import SearchBar from './SearchBar';
import AddWidgetPanel from './AddWidgetForm';

const Dashboard = () => {
    const categories = useSelector(state => state.dashboard.categories);
    const searchTerm = useSelector(state => state.dashboard.searchTerm);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    return (
        <div className="fixed inset-0 overflow-hidden bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
                <div className="flex justify-between items-center">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="font-medium text-slate-700 hover:text-indigo-600 cursor-pointer transition-colors">Home</span>
                        <span className="text-slate-400">&gt;</span>
                        <span className="text-slate-600">Dashboard V2</span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-8">
                        <SearchBar />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsPanelOpen(true)}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Widget
                        </button>
                        <select className="px-3 py-2 border text-gray-950  border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Last 2 days</option>
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">CNAPP Dashboard</h1>
                    
                    <div className="space-y-8">
                        {categories.map(category => (
                            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <Category category={category} searchTerm={searchTerm} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Overlay */}
            {isPanelOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => setIsPanelOpen(false)}
                />
            )}

            {/* Side Panel */}
            <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {isPanelOpen && <AddWidgetPanel closePanel={() => setIsPanelOpen(false)} />}
            </div>
        </div>
    );
};

export default Dashboard;
