import './portfolioPage.scss';
import Filters from '../filters/Filters';
import {selectAll, fetchPortfolio, incrementShowedItems} from './PortfolioSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTrail, animated } from '@react-spring/web';
import { createSelector } from '@reduxjs/toolkit'

const PortfolioPage = () => {
    const {portfolioLoadingStatus, showedItems} = useSelector(state => state.portfolio);
    const dispatch = useDispatch();
    const portfolio = useSelector(selectAll);
    const filteredPortfolioSelector = createSelector(
        (state) => state.filters.activeFilter,
        selectAll,
        (filter, portfolio) => {
            
            if (filter === 'all') {
                return portfolio
        } else {
                return portfolio.filter(item => item.filter === filter)
        }
        }
    )
    const filteredPortfolio = useSelector(filteredPortfolioSelector);
    const itemsToShow = filteredPortfolio.slice(0, showedItems);

    const handleShowMore = useCallback(() => {
        const remainingItems = filteredPortfolio.length - showedItems;
        const incrementCount = Math.min(remainingItems, 3);
        if (incrementCount > 0) {
            dispatch(incrementShowedItems(incrementCount));
          }
    }, [dispatch, filteredPortfolio.length, showedItems]);

    
    useEffect(() => {
        dispatch(fetchPortfolio())
    }, []);

    const trails = useTrail(itemsToShow.length, {
        from: { opacity: 0 },
        to: { opacity: 1 },
        
      })

      
    return (
        <main className='portfolio'>
            <section >
               <h2 className='current-page-name'>портфолио</h2> 
               <div className='portfolio__wrapper'>
                <div className='portfolio__section'>
                {portfolioLoadingStatus === 'loading' && <h3 style={{'color': 'white'}}>Loading</h3>}
                {portfolioLoadingStatus === 'error' && <h3 style={{'color': 'white'}}>Error</h3>}
                {portfolio.length > 0 && (
                            <ul className='portfolio__list'>
                                {trails.map((style, i) => (
                                    <animated.li 
                                        style={style}
                                        className='portfolio__item'
                                        key={uuidv4()}
                                    >
                                        <img src={process.env.PUBLIC_URL + itemsToShow[i].thumbnail} 
                                             alt={itemsToShow[i].description} />
                                        <h3 className='portfolio__title'>{itemsToShow[i].description}</h3>
                                    </animated.li>
                                ))}
                            </ul>
                        )}
                        {filteredPortfolio.length - showedItems > 0 ?
                         <button 
                        className='portfolio__show-more'
                        onClick={handleShowMore}
                         >смотреть еще</button> :
                         null}
                    
                </div>
            
            <Filters/>
            </div> 
            </section>
           
        </main>
        
    )
}


export default PortfolioPage;