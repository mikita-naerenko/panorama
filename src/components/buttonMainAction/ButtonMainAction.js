import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import React from 'react';

import './buttonMainAction.scss';



const ButtonMainAction = (props) => {
    const [hovered, setHovered] = React.useState(false);

  const buttonAnimation = useSpring({
    borderColor: hovered ? '#E7D322' : '#ffffff',
    color: hovered ? '#E7D322' : '#ffffff',
    reverse: hovered,
    duration: 500
  });
    

        return (
            <Link to={props.to ? props.to : ''} 
                      onClick={props.onClick ? props.onClick : null}
                      onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}>
                        <animated.button className='button-main-action' style={buttonAnimation}>
                            {props.title}
                        </animated.button></Link>
        )
}

export default ButtonMainAction;