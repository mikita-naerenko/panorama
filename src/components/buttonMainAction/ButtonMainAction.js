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


  const ButtonInLink = ({props}) => {
        return (
          <Link to={props.to ? props.to : ''}>
              <animated.button onClick={props.onClick ? props.onClick : null}
                               onMouseEnter={() => setHovered(true)} 
                               onMouseLeave={() => setHovered(false)}
                               className='button-main-action' style={buttonAnimation}>
                            {props.title}
                        </animated.button>
          </Link>
        )
       }  
  const Button = () => {
    return (
      <animated.button onClick={props.onClick ? props.onClick : null}
                                         onMouseEnter={() => setHovered(true)} 
                                          onMouseLeave={() => setHovered(false)}
                        className='button-main-action' style={buttonAnimation}>
                            {props.title}
                        </animated.button>
    )
  }
 
    

        return (
          <>
          {props.to ? <ButtonInLink props={props}/> : <Button/>}
          </>
        )
}

export default ButtonMainAction;