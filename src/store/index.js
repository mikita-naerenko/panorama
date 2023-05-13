
import mainMenu from '../components/Main/MainSlice.js';
import {configureStore} from '@reduxjs/toolkit';



const store = configureStore({
    reducer: {mainMenu},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    
})


export default store; 