import './singlePortfolioPage.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PopUpMenu from '../popUpMenu/PopUpMenu';
import CTA from '../cta/CTA';
import SinglePortfolioPreviewList from '../singlePortfolioPreviewList/SinglePortfolioPreviewList';
import ButtonMainAction from '../buttonMainAction/ButtonMainAction';
import { v4 as uuidv4 } from 'uuid';

const SinglePortfolioPage = () => {
    const { chosenPortfolioItem, iframeLink } = useSelector(state => state.panorama);
    const renderListOfTechItem = (arr) => {
        return arr.listTech.map(el => {
            return <li 
                      className='single-portfolio__item'
                      key={uuidv4()}>
                            {el}
                  </li>
        })
    }

    const listOfTechItem = renderListOfTechItem(chosenPortfolioItem);
    
    return  (
        <main className='single-portfolio' style={{'backgroundImage' : `url(${chosenPortfolioItem.thumbnail})`}}>
            <PopUpMenu/>
            {!iframeLink ? <CTA/> : null}
            <section>
            <h2 className='current-page-name'>{chosenPortfolioItem.name}</h2> 
            <div className='single-portfolio__description-wrapper'>
                <ul className='single-portfolio__list-of-tech'>
                    {listOfTechItem}
                </ul>
                <p className='single-portfolio__description'>
                    {chosenPortfolioItem.description}
                </p>
            </div>
            <SinglePortfolioPreviewList/>

            <div className='single-portfolio__button-wrapper'>
                {/* <li><Link to={'/portfolio'} className='portfolio__show-more'>назад</Link></li> */}
                <ButtonMainAction title={'назад'} to={'/portfolio'}/>
               
            </div>
            
            </section>
        </main>
    )
}

export default SinglePortfolioPage;