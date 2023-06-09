import { useTrail, animated } from '@react-spring/web'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { menuChecked, setCurrentPage } from '../../store/PanoramaSlice';

import './mainNav.scss';




const MainNav = () => {
  const menuItems = [
    { id: uuidv4(), label: 'о компании', pageName: 'about', icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 40 42" fill="none">
    <path d="M19.8793 0C13.0382 0 7.96781 1.365 4.74849 3.465C1.52917 5.565 0.402415 8.19 0 10.185L8.04829 10.8675C8.37022 9.555 9.01408 8.2425 10.5433 7.245C12.0724 6.2475 14.4869 5.25 19.8793 5.25C25.1911 5.25 28.0885 6.09 29.6982 7.035C31.3078 7.98 31.9517 9.135 31.9517 10.5C31.9517 14.8575 29.2153 16.065 25.1911 18.375C21.167 20.685 15.8551 24.045 15.8551 30.1875V31.5H23.9034V30.1875C23.9034 25.83 26.3984 24.6225 30.4225 22.3125C34.4467 20.0025 40 16.6425 40 10.5C40 7.98 38.6318 5.145 35.2515 3.0975C31.7907 1.05 26.6398 0 19.8793 0ZM15.8551 36.75V42H23.9034V36.75H15.8551Z" fill="white"/>
    </svg>, path: '/about'},
    { id: uuidv4(), label: 'услуги и цены', pageName: 'pricesAndServices', icon : <svg width="30" height="40" viewBox="33 33 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_36_77)">
    <path d="M45.2455 30V35.1186H39.5569C34.3992 35.1186 30.0758 38.0362 30.0758 41.5169V44.0762C30.0758 47.5568 33.4132 50.4232 38.3433 51.2934L57.7605 54.6717C58.8224 54.8764 60.3393 56.1561 60.3393 56.9238V59.4831C60.3393 60.1998 59.505 60.7628 58.4431 60.7628H39.481C38.5709 60.7628 37.8882 60.5581 37.5848 60.4557V55.6442H30V60.7628C30 62.5031 31.517 63.9875 33.3373 64.7553C35.0818 65.5743 37.2814 65.8814 39.481 65.8814H45.1697V71H52.7545V65.8814H58.4431C63.6766 65.8814 67.9241 63.015 67.9241 59.4831V56.9238C67.9241 53.4432 64.5868 50.5768 59.6567 49.7066L40.2395 46.3283C39.1776 46.1236 37.6607 44.8439 37.6607 44.0762V41.5169C37.6607 40.8002 38.495 40.2372 39.5569 40.2372H58.519C59.3533 40.2372 60.1118 40.4419 60.4152 40.5443V45.3558H68V40.2372C68 38.4969 66.483 37.0125 64.6627 36.2447C62.9182 35.4257 60.7186 35.1186 58.519 35.1186H52.8303V30L45.2455 30Z" fill="white" transform="scale(1.08)"/>
    </g>
    </svg>, path: '/pricesAndServices'},
    { id: uuidv4(), label: 'портфолио', pageName: 'portfolio', icon: <svg width="30" height="40" viewBox="30 30 45 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_36_83)">
    <path d="M45.407 30C42.5918 30 40.2884 32.3062 40.2884 35.125V40.25H30.5119C30.2047 40.25 30.0512 40.455 30.0512 40.7112V53.0625C30.0512 54.4975 31.1773 55.625 32.6105 55.625H68.4407C69.8739 55.625 71 54.4975 71 53.0625V40.7112C71 40.4037 70.7953 40.25 70.5393 40.25H60.7628V35.125C60.7628 32.3062 58.4594 30 55.6442 30H45.407ZM45.407 35.125H55.6442V40.25H45.407V35.125ZM30.0512 60.2887V70.5387C30.0512 70.795 30.2559 71 30.5119 71H70.4881C70.7441 71 70.9488 70.795 70.9488 70.5387V60.2887C70.1298 60.5962 69.3109 60.75 68.3895 60.75H32.5593C31.638 60.75 30.819 60.545 30 60.2887H30.0512Z" fill="white" transform="scale(1.08)"/>
    </g>
    </svg>, path: '/portfolio' },
    { id: uuidv4(), label: 'контакты', pageName: 'contacts', icon: <svg width="30" height="40" viewBox="36 20 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_36_80)">
    <path d="M30 30V56.4286L35.875 51.1429H41.75V35.2857H59.375V30H30ZM47.625 40.5714V61.7143H71.125L77 67V40.5714H47.625Z" fill="white"/>
    </g>
    </svg>, path: '/contacts'},
  ];

  const { activeMenu } = useSelector(state => state.panorama);

  const dispatch = useDispatch();

  const trail = useTrail(menuItems.length, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
  });

  return (

    <ul>         
      {trail.map((style, index) => (
        <animated.li 
                  key={menuItems[index].id} 
                  style={style} 
                  className='nav-list__item'
                  onClick={() => {
                          dispatch(menuChecked(!activeMenu));
                          dispatch(setCurrentPage(menuItems[index].pageName))
                          }} >
             <Link  
                    to={menuItems[index].path} 
                    className='nav-list__link'>
                      {menuItems[index].icon}
                      <span>{menuItems[index].label}</span>
            </Link>
        </animated.li>
      ))}
    </ul>
  );
};

export default MainNav;




