import './singlePortfolioPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setChosenPortfolioItem, setCurrentPage } from '../../store/PanoramaSlice';
import { useEffect } from 'react';
import PopUpMenu from '../popUpMenu/PopUpMenu';
import CTA from '../cta/CTA';
import SinglePortfolioPreviewList from '../singlePortfolioPreviewList/SinglePortfolioPreviewList';
import ButtonMainAction from '../buttonMainAction/ButtonMainAction';
import { v4 as uuidv4 } from 'uuid';

const SinglePortfolioPage = () => {
    const { chosenPortfolioItem, iframeLink } = useSelector(state => state.panorama);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPage('portfolio'));
        dispatch(setChosenPortfolioItem(Object.keys(chosenPortfolioItem).length > 0 ? chosenPortfolioItem : JSON.parse(localStorage.getItem('currentPageToLoad'))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // In the next line I am declaring a variable which contain the state from PanoramaSlice or retrive the value from localeStorage 
    const currentPageToLoad = Object.keys(chosenPortfolioItem).length > 0 ? chosenPortfolioItem : JSON.parse(localStorage.getItem('currentPageToLoad'));
    const renderListOfTechItem = (arr) => {
        return arr.listTech.map(el => {
            return <li 
                      className='single-portfolio__item'
                      key={uuidv4()}>
                            {el}
                  </li>
        })
    }
    const listOfTechItem = renderListOfTechItem(currentPageToLoad);
    
    return  (
        <main className='single-portfolio' style={{'backgroundImage' : `url(${currentPageToLoad.thumbnail})`}}>
            <PopUpMenu/>
            {!iframeLink ? <CTA/> : null}
            <section>
            <h2 className='current-page-name'>{currentPageToLoad.name}</h2> 
            <div className='single-portfolio__description-wrapper'>

                <p className='single-portfolio__description'>
                    {currentPageToLoad.description}
                </p>
                <ul className='single-portfolio__list-of-tech'>
                    <h2 className='single-portfolio__list-of-tech-title'>В данном проекте были реализованы такие технологии как:</h2>
                    {listOfTechItem}
                </ul>
                
            </div>
            <SinglePortfolioPreviewList/>

            <div className='single-portfolio__button-wrapper'>
                <ButtonMainAction title={'назад'} to={'/portfolio'}/>
               
            </div>
            
            </section>
        </main>
    )
}

export default SinglePortfolioPage;