import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const mainAdapter = createEntityAdapter();


const initialState = mainAdapter.getInitialState({
    activeMenu: false,

});

const mainSlice = createSlice({
    name: 'mainMenu',
    initialState,
    reducers: {
        menuChecked: (state, action) => {state.activeMenu = action.payload}
    },
    // extraReducers: (builder) => {
    //     builder 
    //             .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
    //             .addCase(fetchFilters.fulfilled, (state, action) => {
    //                 state.filtersLoadingStatus = 'idle';
    //                 filtersAdapter.setAll(state, action.payload);
    //             })
    //             .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
    //             .addDefaultCase(() => {})
    // }
});

const {actions, reducer} = mainSlice;
export default reducer;


export const {
    menuChecked
} = actions;