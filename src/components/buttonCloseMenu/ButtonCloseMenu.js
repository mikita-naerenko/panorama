import { useDispatch, useSelector } from 'react-redux';

import { menuChecked, setIframeLink } from '../../store/PanoramaSlice';
import './buttonCloseMenu.scss';

const ButtonClose = () => {

    const { activeMenu, iframeLink} = useSelector(state => state.panorama);
    const dispatch = useDispatch();

    return (<>
        {activeMenu || iframeLink ? <button 
            className='button-close'
            onClick={() => {
                                if (activeMenu) dispatch(menuChecked(!activeMenu))
                                if (iframeLink) dispatch(setIframeLink(''))
                            }
                    }></button> : null}
           </> 
    )
}

export default ButtonClose;