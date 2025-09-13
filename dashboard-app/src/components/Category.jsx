import React from 'react';
import Widget from './Widget';

const Category = ({ category, searchTerm }) => {
    // Filter widgets based on the search term
    const filteredWidgets = category.widgets.filter(widget =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (widget.text && widget.text.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-6">
            {/* Category Header */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{category.name}</h3>
            </div>

            {/* Widgets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWidgets.map(widget => (
                    <Widget key={widget.id} widget={widget} categoryId={category.id} />
                ))}
            </div>

            {/* Empty State */}
            {filteredWidgets.length === 0 && searchTerm.length > 0 && (
                <div className="text-center py-12">
                    <div className="text-slate-400 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.88-5.812-2.34" />
                        </svg>
                    </div>
                    <p className="text-slate-600">No widgets found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Category;