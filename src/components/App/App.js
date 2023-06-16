import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';


import MainPanoramaBg from '../photoSphere/PhotoSphere';

import './app.scss';

const Main = lazy(() => import('../Main/Main'));
const PortfolioPage = lazy(() => import('../portfolio/PortfolioPage'));
const Contacts = lazy(() => import('../contacts/Contacts'));
const SinglePortfolioPage = lazy(() => import('../singlePortfolioPage/SinglePortfolioPage'));
const About = lazy(() => import('../about/About'));
const PricesAndServices = lazy(() => import('../pricesAndServices/PricesAndServices'));




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
            <Suspense>
            <Routes location={item}>
              <Route path='/' element={<Main />} />
              <Route path='/about' element={<About />} />
              <Route path='/pricesAndServices' element={<PricesAndServices />} />
              <Route path='/portfolio' element={<PortfolioPage />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/portfolio/:id' element={<SinglePortfolioPage />} />
            </Routes>
            </Suspense>
          </animated.div>
        ))} 

        </div>
        </>
    )
}

export default App;