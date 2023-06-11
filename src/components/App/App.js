import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import { useSelector } from 'react-redux';


import Main from '../Main/Main';
import PortfolioPage from '../portfolio/PortfolioPage';
import MainPanoramaBg from '../photoSphere/PhotoSphere';
import Contacts from '../contacts/Contacts';
import SinglePortfolioPage from '../singlePortfolioPage/SinglePortfolioPage';
import About from '../about/About';

import './app.scss';





const App = () => {
  const location = useLocation();
  const {currentPage} = useSelector(state => state.panorama)
 

  const transitions = useTransition(location, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: {
      duration: 200,
      
    }
})

    return (
        <>
        <div className='app'>
          {currentPage === 'main' ? <MainPanoramaBg/> : null}
              
              {transitions((props, item) => (
          <animated.div style={props}>
            <Routes location={item}>
              <Route path='/' element={<Main />} />
              <Route path='/about' element={<About />} />
              <Route path='/portfolio' element={<PortfolioPage />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/portfolio/:id' element={<SinglePortfolioPage />} />
            </Routes>
          </animated.div>
        ))} 

        </div>
        </>
    )
}

export default App;