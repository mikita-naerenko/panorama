import { useDispatch, useSelector } from 'react-redux';

import { menuChecked } from '../Main/MainSlice';
import './buttonCloseMenu.scss';

const ButtonClose = () => {

    const { activeMenu} = useSelector(state => state.mainMenu);
    const dispatch = useDispatch();

    return (<>
        {activeMenu ? <button 
            className='button-close'
            onClick={() => dispatch(menuChecked(!activeMenu))}></button> : null}
           </> 
    )
}

export default ButtonClose;