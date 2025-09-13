import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget } from "../redux/dashboardSlice";
import availableWidgetsData from "../data/availableWidgets.json";

const AddWidgetPanel = ({ closePanel }) => {
  const dispatch = useDispatch();
  const dashboardCategories = useSelector(
    (state) => state.dashboard.categories
  );
  const [activeTab, setActiveTab] = useState(
    availableWidgetsData.widgetOptions[0].category
  );
  const [selectedWidgets, setSelectedWidgets] = useState({});

  const TAB_TO_CATEGORY_ID = {
    CSPM: "cat-cspm",
    CWPP: "cat-cwpp",
    Image: "cat-registry",
  };

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
    Object.values(selectedWidgets).forEach((widget) => {
      const targetCategoryId = TAB_TO_CATEGORY_ID[widget.category];
      if (targetCategoryId) {
        dispatch(
          addWidget({
            categoryId: targetCategoryId,
            widget: { ...widget, id: `${widget.id}-${Date.now()}` },
          })
        );
      }
    });
    closePanel();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">Add Widget</h2>
          <button onClick={closePanel} className=" text-xl p-1">
            ×
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {availableWidgetsData.widgetOptions.map((option) => (
          <button
            key={option.category}
            onClick={() => setActiveTab(option.category)}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === option.category
                ? "text-black bg-white border-b-2 border-black"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            {option.category}
          </button>
        ))}
      </div>

      {/* Widget List */}
      <div className="flex-1 overflow-y-auto p-6">
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
                  className="h-4 w-4 text-black border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-black">{widget.name}</span>
              </label>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-end space-x-3">
          <button
            onClick={closePanel}
            className="px-4 py-2 text-sm font-medium text-white bg-white border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-200 border border-gray-300 rounded hover:bg-gray-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetPanel;
