
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterChecked, selectAll, fetchFilters } from './FiltersSlice';
// import { setFilter } from '../portfolio/PortfolioSlice'

import './filters.scss';


const Filters = () => {

    const { filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = useSelector(selectAll);

    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(fetchFilters())
     },[]);

     const renderFiltersList = (arr) => {
        if (filtersLoadingStatus === 'loading') return <li>loading</li>;
        if (filtersLoadingStatus === 'error') return <li>error</li>;
        if (arr.length > 0) return arr.map((el) => {
            return <li 
                        className={activeFilter === el.filter ? 'filters__item filters__active-filter' : 'filters__item'} 
                        key={el.id}
                        onClick={() => {
                            dispatch(filterChecked(el.filter));
                            // dispatch(setFilter(el.filter))
                        }}
                        ><button>{el.textContent}</button></li>
        })
     }

     const filterElements = renderFiltersList(filters);

    return (
        <div className='filters'>
        <ul className='filters__list'>
            {filterElements}
        </ul>
    </div>
    )
}


export default Filters;