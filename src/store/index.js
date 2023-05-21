
import panorama from './PanoramaSlice.js';
import {configureStore} from '@reduxjs/toolkit';
// import filters from '../components/filters/FiltersSlice.js';
// import portfolio from '../components/portfolio/PortfolioSlice.js'


const store = configureStore({
    reducer: { panorama },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    
})


export default store; 