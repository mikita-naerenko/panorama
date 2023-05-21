import { fetchPortfolio, incrementShowedItems} from '../../store/PanoramaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTrail, animated } from '@react-spring/web';

import Filters from '../filters/Filters';

import './portfolioPage.scss';
// import PopUpMenu from '../popUpMenu/PopUpMenu';

const PortfolioPage = () => {
    const { portfolioLoadingStatus,
            showedItems,
            portfolio,
            activeFilter,
            filteredPortfolio} = useSelector(state => state.panorama);

    const dispatch = useDispatch();
 
    const showList =  activeFilter === 'all' ? portfolio : filteredPortfolio;
    const itemsToShow = showList.slice(0, showedItems);

    const handleShowMore = () => {
        const step = 3;
        const remainingItems = showList.length - showedItems;
        const incrementCount = Math.min(remainingItems, step);
        if (incrementCount > 0) {
            dispatch(incrementShowedItems(incrementCount));
          }
    };

    useEffect(() => {
        dispatch(fetchPortfolio())
    }, []);


    const trails = useTrail(itemsToShow.length, {
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }, 
        
      })

      
    return (
        <main className='portfolio'>
            {/* <PopUpMenu/> */}
            <section >
               <h2 className='current-page-name'>портфолио</h2> 
               <div className='portfolio__wrapper'>
                    <div className='portfolio__section'>
                        {portfolioLoadingStatus === 'loading' && <h3 style={{ 'color': 'white' }}>Loading</h3>}
                        {portfolioLoadingStatus === 'error' && <h3 style={{ 'color': 'white' }}>Error</h3>}
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
                        {showList.length - showedItems > 0 ?
                            <button
                                className='portfolio__show-more'
                                onClick={handleShowMore}
                            >смотреть еще</button> : null}
                    </div>
            
                <Filters/>
                </div> 
            </section>
        </main>
        
    )
}


export default PortfolioPage;