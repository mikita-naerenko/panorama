

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentPage, fetchServices } from '../../store/PanoramaSlice';
import { v4 as uuidv4 } from 'uuid';

import PopUpMenu from '../popUpMenu/PopUpMenu';
import CTA from '../cta/CTA';
import ButtonMainAction from '../buttonMainAction/ButtonMainAction';

import './pricesAndServices.scss';

const ServiceListItem = styled.li`
        &::before {
            // content: url(${(props) => props.iconPath});
            content: '';
            background-image: url(${(props) => props.iconPath});
            background-size: contain;
            background-repeat: no-repeat;
            width: 20px;
            height: 20px;
            position: absolute;
            top: 0;
            left: 0;
            
            @media (min-width: 1200px) {
                width: 25px;
                height: 25px;
              }
        }
        `;

const PricesAndServices = () => {

    const dispatch = useDispatch();
    const { services } = useSelector(state => state.panorama);
   

    useEffect(() => {
        dispatch(setCurrentPage('pricesAndServices'));
        dispatch(fetchServices());

    },[])


    const renderServices  = (arr) => {
        if (arr.length > 0 ) return arr.map((el) => {
           return <li className='service__item' key={uuidv4()}>
                    <h3 className='service__title'>{el.name}</h3>

                    <ul className='service__list'>
                        {el.service.map(el => {
                           return <ServiceListItem className={'service__list-item'} iconPath={el.iconPath} key={uuidv4()}>
                           {el.name}
                         </ServiceListItem>
                        //    <li className='service__list-item' key={uuidv4()}>{el.name}</li>
                        })}
                    </ul>
                    <div className='service__button-container'><ButtonMainAction type='button' to='/contacts' title={`от ${el.cost} руб.`}/></div>
                    
                </li>
        })
    }

    const servicesList = renderServices(services);

    return (
        <main className='pricesAndServices'>
            <CTA/>
            <PopUpMenu/>
            <section>
            <h2 className='current-page-name'>услуги и цены</h2> 
            <ul className='pricesAndServices__list'>
                {servicesList}
            </ul>
            </section>
        </main>
    )

}

export default PricesAndServices;
