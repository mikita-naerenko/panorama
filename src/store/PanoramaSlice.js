import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/htth.hook';



const initialState = {
    portfolioLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    cityLoadingStatus: 'idle',
    activeFilter: 'all',
    filters: [],
    portfolio: [],
    city: [],
    filteredPortfolio: [],
    chosenPortfolioItem: {},
    showedItems: 6,
    activeMenu: false,
    currentPage: 'main',
    showPersonalDataAgreement: false,
    formDidSubmit: false,
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

export const fetchCity = createAsyncThunk(
    'city/fetchCity',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3004/city");
    }
)

const panoramaSlice = createSlice({
    name: 'panorama',
    initialState,
    reducers: {
        filterChecked: (state, action) => {state.activeFilter = action.payload},
        menuChecked: (state, action) => {state.activeMenu = action.payload},
        incrementShowedItems: (state, action) => {state.showedItems +=action.payload},
        setCurrentPage: (state, action) => {state.currentPage = action.payload},
        filteredPortfolio: (state, action) => {state.filteredPortfolio = state.portfolio.filter(item => item.filter === action.payload)},
        setChosenPortfolioItem: (state, action) => {state.chosenPortfolioItem = action.payload},
        setIframeLink: (state, action) =>{state.iframeLink = action.payload},
        setPersonalDataAgreementDisplay: (state, action) => {state.showPersonalDataAgreement = action.payload},
        setFormDidSumit: (state, action) => {state.formDidSubmit = action.payload},
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

                
                .addCase(fetchCity.pending, state => {state.cityLoadingStatus = 'loading'})
                .addCase(fetchCity.fulfilled, (state, action) => {
                    state.cityLoadingStatus = 'idle';
                    state.city = action.payload
                })
                .addCase(fetchCity.rejected, state => {state.cityLoadingStatus = 'error'})
                .addDefaultCase(() => {})
    }
});

const { actions, reducer } = panoramaSlice;
export default reducer;
export const {
    menuChecked,
    filterChecked,
    incrementShowedItems,
    setCurrentPage,
    setChosenPortfolioItem,
    portfolioFetching,
    portfolioFetched,
    portfolioFetchingError,
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filteredPortfolio,
    setIframeLink,
    setPersonalDataAgreementDisplay,
    setFormDidSumit,


} = actions;