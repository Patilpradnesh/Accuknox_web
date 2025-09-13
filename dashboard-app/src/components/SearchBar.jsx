import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../redux/dashboardSlice';

const SearchBar = ({ setIsPanelOpen }) => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.dashboard.searchTerm);

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
        if (e.target.value) {
            setIsPanelOpen(false);
        }
    };

    return (
        <div className="position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y ps-3 d-flex align-items-center" style={{ pointerEvents: 'none' }}>
                <svg width="20" height="20" className="text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Search anything..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control ps-5"
                style={{ color: '#000' }}
            />
        </div>
    );
};

export default SearchBar;