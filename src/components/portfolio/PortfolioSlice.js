import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/htth.hook';


const portfolioAdapter = createEntityAdapter();


const initialState = portfolioAdapter.getInitialState({
    portfolioLoadingStatus: 'idle',
    activeFilter: 'all',
    showedItems: 6
});

export const fetchPortfolio = createAsyncThunk(
    'portfolio/fetchPortfolio',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3004/portfolio");
    }
)



const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,    
    reducers: {
        incrementShowedItems: (state, action) => {state.showedItems +=action.payload}
    },
    extraReducers: (builder) => {
        builder
                .addCase(fetchPortfolio.pending, state => {state.portfolioLoadingStatus = 'loading'})
                .addCase(fetchPortfolio.fulfilled, (state, action) => {
                    state.portfolioLoadingStatus = 'idle';
                    portfolioAdapter.setAll(state, action.payload);
                })
                .addCase(fetchPortfolio.rejected, state => {state.portfolioLoadingStatus = 'error'})
                .addDefaultCase(() => {})
    }
});


const {actions, reducer} = portfolioSlice;
export default reducer;
export const {selectAll} = portfolioAdapter.getSelectors(state => state.portfolio);

export const {
    portfolioFetching,
    portfolioFetched,
    portfolioFetchingError,
    incrementShowedItems
    
} = actions;