import { useDispatch, useSelector } from 'react-redux';

import { menuChecked } from '../../store/PanoramaSlice';
import './buttonCloseMenu.scss';

const ButtonClose = () => {

    const { activeMenu} = useSelector(state => state.panorama);
    const dispatch = useDispatch();

    return (<>
        {activeMenu ? <button 
            className='button-close'
            onClick={() => dispatch(menuChecked(!activeMenu))}></button> : null}
           </> 
    )
}

export default ButtonClose;