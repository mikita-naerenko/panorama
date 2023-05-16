import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/htth.hook';


const filtersAdapter = createEntityAdapter();


const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',

});



export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3004/filters");
    }
)


const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChecked: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder 
                .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
                .addCase(fetchFilters.fulfilled, (state, action) => {
                    state.filtersLoadingStatus = 'idle';
                    filtersAdapter.setAll(state, action.payload);
                })
                .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
                .addDefaultCase(() => {})
    }
   
});

const {actions, reducer} = filterSlice;
export default reducer;
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filterChecked
} = actions;