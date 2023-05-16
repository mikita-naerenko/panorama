import './app.scss';
import Main from '../Main/Main';
import PortfoloiPage from '../portfolio/PortfolioPage';
import MainPanoramaBg from '../photoSphere/PhotoSphere';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';



const App = () => {

    return (
        <Router>
        <div className='app'>
              {/* <iframe style={activeMenu ? {'touchAction' : 'manipulation', 'pointerEvents': 'none'} : null} className="main-bg" title={'1'} src="https://panoramakrasnodar.ru/tours/panoramaonline/" width="100%"  frameBorder="no" scrolling="no" allowFullScreen="allowfullscreen"></iframe> */}
              <MainPanoramaBg/>
              <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/portfolio' element={<PortfoloiPage/>}/>
                
             </Routes>
        </div>
        </Router>
    )
}

export default App;