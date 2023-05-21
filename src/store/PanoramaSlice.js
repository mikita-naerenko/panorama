import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/htth.hook';



const initialState = {
    portfolioLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filters: [],
    portfolio: [],
    filteredPortfolio: [],
    showedItems: 6,
    activeMenu: false,
}

export const fetchPortfolio = createAsyncThunk(
    'portfolio/fetchPortfolio',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3004/portfolio");
    }
)

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3004/filters");
    }
)

const panoramaSlice = createSlice({
    name: 'panorama',
    initialState,
    reducers: {
        filterChecked: (state, action) => {state.activeFilter = action.payload},
        menuChecked: (state, action) => {state.activeMenu = action.payload},
        incrementShowedItems: (state, action) => {state.showedItems +=action.payload},
        // selectFilter: (state, action) => {state.activeFilter = action.payload},
        filteredPortfolio: (state, action) => {state.filteredPortfolio = state.portfolio.filter(item => item.filter === action.payload)}
    },
    extraReducers: (builder) => {
        builder 
                .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
                .addCase(fetchFilters.fulfilled, (state, action) => {
                    state.filtersLoadingStatus = 'idle';
                    state.filters = action.payload
                })
                .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
                .addCase(fetchPortfolio.pending, state => {state.portfolioLoadingStatus = 'loading'})
                .addCase(fetchPortfolio.fulfilled, (state, action) => {
                    state.portfolioLoadingStatus = 'idle';
                    state.portfolio = action.payload
                    
                })
                .addCase(fetchPortfolio.rejected, state => {state.portfolioLoadingStatus = 'error'})
                .addDefaultCase(() => {})
    }
});

const { actions, reducer } = panoramaSlice;
export default reducer;
export const {
    menuChecked,
    filterChecked,
    incrementShowedItems,
    // selectFilter,
    portfolioFetching,
    portfolioFetched,
    portfolioFetchingError,
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filteredPortfolio,


} = actions;