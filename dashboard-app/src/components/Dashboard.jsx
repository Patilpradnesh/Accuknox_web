import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Category from './Category';
import SearchBar from './SearchBar';
import AddWidgetPanel from './AddWidgetForm';

const Dashboard = () => {
    const categories = useSelector(state => state.dashboard.categories);
    const searchTerm = useSelector(state => state.dashboard.searchTerm);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        if (searchTerm) {
            setIsPanelOpen(false);
        }
    }, [searchTerm]);

    return (
            <div className="bg-light min-vh-100">
            {/* Header */}
            <header className="sticky-top bg-white border-bottom px-4 py-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Breadcrumb */}
                    <div className="small fw-medium text-secondary">
                        Home &gt; Dashboard V2
                    </div>

                    {/* Search Bar */}
                    <div className="flex-grow-1 mx-4" style={{ maxWidth: '400px' }}>
                        <SearchBar setIsPanelOpen={setIsPanelOpen} />
                    </div>

                    {/* Actions */}
                    <div className="d-flex align-items-center gap-3">
                        <button
                            onClick={() => setIsPanelOpen(true)}
                            className="btn btn-dark btn-lg d-inline-flex align-items-center w-100"
                            style={{ minWidth: '150px' }}
                        >
                            
                            Add Widget
                        </button>
                        <select className="form-select form-select-sm">
                            <option>Last 2 days</option>
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-4 py-4">
                <div className="container-xl">
                    <h1 className="display-6 fw-bold text-dark mb-4">CNAPP Dashboard</h1>
                    <div className="d-flex flex-column gap-4">
                        {categories.map(category => (
                            <div key={category.id} className="bg-white rounded-4 shadow-sm border overflow-hidden">
                                <Category category={category} searchTerm={searchTerm} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Overlay */}
            {isPanelOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 backdrop-blur z-40"
                    style={{ zIndex: 1040, backdropFilter: 'blur(2px)' }}
                    onClick={() => setIsPanelOpen(false)}
                />
            )}

            {/* Side Panel */}
            {isPanelOpen && (
                <div className="position-fixed top-0 end-0 h-100 bg-white shadow-lg transition-transform z-50" style={{ width: '24rem', zIndex: 1050, transform: 'translateX(0)', transition: 'transform 0.3s ease-in-out' }}>
                    <AddWidgetPanel closePanel={() => setIsPanelOpen(false)} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
