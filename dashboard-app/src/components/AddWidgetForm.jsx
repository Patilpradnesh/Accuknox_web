import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget } from "../redux/dashboardSlice";
import availableWidgetsData from "../data/availableWidgets.json";
import {toast} from 'react-toastify';

const AddWidgetPanel = ({ closePanel }) => {
  const dispatch = useDispatch();
  const dashboardCategories = useSelector(
    (state) => state.dashboard.categories
  );
  const [activeTab, setActiveTab] = useState(
    availableWidgetsData.widgetOptions[0].category
  );
  const [selectedWidgets, setSelectedWidgets] = useState({});

  // Dynamically create a mapping for category names to IDs
  const TAB_TO_CATEGORY_ID = dashboardCategories.reduce((acc, cat) => {
    acc[cat.name.split(' ')[0]] = cat.id;
    return acc;
  }, {});

  const handleCheckboxChange = (widget) => {
    setSelectedWidgets((prev) => {
      const newSelection = { ...prev };
      if (newSelection[widget.id]) {
        delete newSelection[widget.id];
      } else {
        newSelection[widget.id] = widget;
      }
      return newSelection;
    });
  };

  const handleConfirm = () => {
    let addedCount = 0;
    Object.values(selectedWidgets).forEach((widget) => {
      const targetCategoryId = TAB_TO_CATEGORY_ID[widget.category];
      if (targetCategoryId) {
        dispatch(
          addWidget({
            categoryId: targetCategoryId,
            widget: { ...widget, id: `${widget.id}-${Date.now()}` },
          })
        );
        addedCount++;
      }
    });
    if (addedCount > 0) {
      toast.success(`${addedCount} widgets added successfully!`);
    }
    closePanel();
  };

  return (
    <div className="d-flex flex-column h-100 bg-white text-dark">
      {/* Header */}
      <div className="px-4 py-3 border-bottom bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h6 fw-semibold mb-0">Add Widget</h2>
          <button onClick={closePanel} className="btn btn-close" aria-label="Close" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {availableWidgetsData.widgetOptions.map((option) => (
          <button
            key={option.category}
            onClick={() => setActiveTab(option.category)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === option.category
                ? "text-gray-900 bg-white border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {option.category}
          </button>
        ))}
      </div>

      {/* Widget List */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="space-y-2">
          {availableWidgetsData.widgetOptions
            .find((option) => option.category === activeTab)
            .widgets.map((widget) => (
              <label
                key={widget.id}
                className="flex items-center p-3 rounded cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  id={widget.id}
                  checked={!!selectedWidgets[widget.id]}
                  onChange={() =>
                    handleCheckboxChange({ ...widget, category: activeTab })
                  }
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-3 text-sm text-gray-900">{widget.name}</span>
              </label>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-end space-x-3">
          <button
            onClick={closePanel}
            className="px-4 py-2 m- text-sm font-medium text-white bg-black border border-gray-300 rounded hover:bg-gray-900 transition-colors duration-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={Object.keys(selectedWidgets).length === 0}
            className={`px-4 py-2 m-1 text-sm font-medium rounded transition-colors duration-2 ${
              Object.keys(selectedWidgets).length === 0
                ? 'bg-indigo-300 text-b cursor-not-allowed text-black'
                : 'bg-black text-white hover:bg-indigo-700'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetPanel;