import { fetchPortfolio, incrementShowedItems, setCurrentPage, filterChecked, setChosenPortfolioItem } from '../../store/PanoramaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTrail, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';

import Filters from '../filters/Filters';
import CTA from '../cta/CTA';
import ButtonMainAction from '../buttonMainAction/ButtonMainAction';
import PopUpMenu from '../popUpMenu/PopUpMenu';

import './portfolioPage.scss';


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
    console.log('render');

    useEffect(() => {
        dispatch(fetchPortfolio());
        dispatch(setCurrentPage('portfolio'));
        dispatch(filterChecked('all'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const trails = useTrail(itemsToShow.length, {
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 100 }, 
        
      })

      
    return (
        <main className='portfolio'>
            <CTA/>
            <PopUpMenu/>
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
                                        onClick={() => dispatch(setChosenPortfolioItem(itemsToShow[i]))}>
                                        <Link to={`/portfolio/${itemsToShow[i].id}`}>
                                            <img src={process.env.PUBLIC_URL + itemsToShow[i].thumbnail}
                                                 alt={itemsToShow[i].description} />
                                            <h3 className='portfolio__title'>{itemsToShow[i].name}</h3>
                                        </Link>
                                    </animated.li>
                                ))}
                            </ul>
                        )}
                        {showList.length - showedItems > 0 ?
                            <ButtonMainAction title={'смотреть еще'} onClick={handleShowMore}/> : null
                            }
                    </div>
            
                <Filters/>
                </div> 
            </section>
        </main>
        
    )
}


export default PortfolioPage;