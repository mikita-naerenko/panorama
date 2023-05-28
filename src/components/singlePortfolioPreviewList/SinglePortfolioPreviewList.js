import './singlePortfolioPreviewList.scss';
import playIcon from '../../assets/play-icon.png';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setIframeLink } from '../../store/PanoramaSlice';
import ButtonCloseMenu from '../buttonCloseMenu/ButtonCloseMenu'

const SinglePortfolioPreviewList = () => {
    const { chosenPortfolioItem, iframeLink } = useSelector(state => state.panorama);
    const dispatch = useDispatch();
    const renderFullScreenIframe = (link) => {
        return <div className='single-portfolio-preview-list__iframe-wrapper'>
                <ButtonCloseMenu/>
                    <iframe  title="This is a unique title" src={link} width="100%" height="80%"  ></iframe>
                </div>
    }
    const renderPreviewListItems = (arr) => {
        return arr.linkOnIframe.map(el => {
            return <li className='single-portfolio-preview-list__item'
                        key={uuidv4()}
                        onClick={() => dispatch(setIframeLink(el.iframeLink))}>
                        <img 
                            className='single-portfolio-preview-list__image'
                            src={process.env.PUBLIC_URL + el.thumbnail} 
                            width='400' 
                            height='250' 
                            alt={el.title} />
                        <img className='single-portfolio-preview-list__play-button' 
                             src={playIcon} 
                             alt={el.title} 
                             width={30} 
                             height={30}/>
                        <h3 className='single-portfolio-preview-list__title'>{el.title}</h3>
            
                    </li>
        })
    }
    const previewListItems = renderPreviewListItems(chosenPortfolioItem)
    return (
        <ul className='single-portfolio-preview-list'>
            {previewListItems}
            {iframeLink ? renderFullScreenIframe(iframeLink) : null}
        </ul>
        
    )
}

export default SinglePortfolioPreviewList;