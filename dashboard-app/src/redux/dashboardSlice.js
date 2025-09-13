import { createSlice } from '@reduxjs/toolkit';
import dashboardData from '../data/dashboard.json';

const initialState = {
    categories: dashboardData.categories,
    searchTerm: ''
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addWidget: (state, action) => {
            const { categoryId, widget } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets.push(widget);
            }
        },
        removeWidget: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets = category.widgets.filter(w => w.id !== widgetId);
            }
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
});

export const { addWidget, removeWidget, setSearchTerm } = dashboardSlice.actions;
export default dashboardSlice.reducer;