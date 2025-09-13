import React from 'react';
import Widget from './Widget';

const Category = ({ category, searchTerm }) => {
    // Filter widgets based on the search term
    const filteredWidgets = category.widgets.filter(widget =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (widget.text && widget.text.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-4">
            {/* Category Header */}
            <div className="mb-4">
                <h3 className="h4 fw-bold text-dark">{category.name}</h3>
            </div>

            {/* Widgets Grid */}
            <div className="row g-4">
                {filteredWidgets.map(widget => (
                    <div className="col-12 col-md-6 col-lg-4" key={widget.id}>
                        <Widget widget={widget} categoryId={category.id} />
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredWidgets.length === 0 && searchTerm.length > 0 && (
                <div className="text-center py-5">
                    <div className="text-muted mb-2">
                        <svg width="48" height="48" className="mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.88-5.812-2.34" />
                        </svg>
                    </div>
                    <p className="text-secondary">No widgets found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Category;