import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Main from '../Main/Main';
import PortfoloiPage from '../portfolio/PortfolioPage';
import MainPanoramaBg from '../photoSphere/PhotoSphere';
import Contacts from '../contacts/Contacts';
import SinglePortfolioPage from '../singlePortfolioPage/SinglePortfolioPage';

import './app.scss';





const App = () => {

    return (
        <Router>
        <div className='app'>
              <MainPanoramaBg/>
              <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/portfolio' element={<PortfoloiPage/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/portfolio/:id' element={<SinglePortfolioPage/>}/>
              </Routes>
        </div>
        </Router>
    )
}

export default App;