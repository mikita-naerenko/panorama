import { useDispatch, useSelector } from 'react-redux';

import { menuChecked } from '../../store/PanoramaSlice';
import ButtonCloseMenu from '../buttonCloseMenu/ButtonCloseMenu';
import MainNav from '../mainNav/MainNav';

import logo from '../../assets/logo.svg';
import mockButton from "../../assets/button-menu.svg"

import './main.scss';


const Main = () => {

    const { activeMenu } = useSelector(state => state.panorama);

    const dispatch = useDispatch();
    
    return (
        <main >    
            <div className={activeMenu ? 'mainActive' : 'main'}>
            <ButtonCloseMenu/>                  
                <img 
                    onClick={() => dispatch(menuChecked(!activeMenu))} 
                    className='main__logo'
                    src={logo}
                    width='300'
                    height='80' 
                    alt="My logo" />
                <h2 className='main__slogan' style={activeMenu ? {'display': 'none'} : {'display': 'block'}}>ваш бизнес в трех измерениях</h2>
                <nav>
                    <button 
                        onClick={() => dispatch(menuChecked(!activeMenu))} 
                        style={activeMenu? {'display': 'none'} : null}
                        className='main__mock-button'>
                            <img 
                                width='80'
                                 height="80"
                                 src={mockButton} 
                                 alt="" />
                    </button>
                    {activeMenu ? <MainNav/> : null}
                </nav>
            </div>
        </main>
        
    )
}

export default Main;
