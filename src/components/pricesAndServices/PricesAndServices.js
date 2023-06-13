import iconBrush from './assets/icon_brush_.png';
import iconCalendar from './assets/icon_calendar_.png';
import iconCamera from './assets/icon_cameraslr_.png';
import iconLink from './assets/icon_external_link_.png';
import iconImage from './assets/icon_image_.png';
import iconMarker from './assets/icon_map_marker_.png';
import iconMap from './assets/icon_map_.png';
import iconReload from './assets/icon_reload_.png';
import iconShare from './assets/icon_share_boxed_.png';
import iconVideo from './assets/icon_video_.png';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentPage } from '../../store/PanoramaSlice';
import { Link } from 'react-router-dom';

import PopUpMenu from '../popUpMenu/PopUpMenu';
import CTA from '../cta/CTA';
import ButtonMainAction from '../buttonMainAction/ButtonMainAction';

import './pricesAndServices.scss';



const PricesAndServices = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentPage('pricesAndServices'));
    },[])

    return (
        <main className='pricesAndServices'>
            <CTA/>
            <PopUpMenu/>
            <section>
            <h2 className='current-page-name'>услуги и цены</h2> 
            <ul className='pricesAndServices__list'>
                <li className='service__item'>
                    <h3 className='service__title'>Создание виртуального 3Д-тура для карт Яндекс и Google</h3>
                    <ul className='service__list'>
                        <li>съемка и размещение панорам на картах Google</li>
                        <li>съемка и размещение панорам на картах Яндекс</li>
                        <li>Съемка новых и обновление старых уличных панорам на картах Яндекс</li>
                    </ul>
                    <ButtonMainAction type='button' to='/contacts' title='от 1000 руб.'/>
                    
                </li>
                <li className='service__item'>
                    <h3 className='service__title'>Аэро фото и видеосъёмка</h3>
                    <ul className='service__list'>
                        <li>Видеосъемка с воздуха с помощью коптера</li>
                        <li>создание интерактивной карты</li>
                        <li>Художественная фотосъёмка</li>
                        <li>для презентации объектов недвижимости</li>
                    </ul>
                    <ButtonMainAction type='button' to='/contacts' title='от 1000 руб.'/>
                </li>
                <li className='service__item'>
                    <h3 className='service__title'>Предметная фотосъемка товаров в 360 градусов (3D)</h3>
                    <ul className='service__list'>
                        <li>Предметная видеосъёмка 360 любых товаров</li>
                        <li>Выездная съёмка на территории заказчика</li>
                        <li>Ретушь дефектов товара</li>
                        <li>Адаптация размера фото под маркетплейс</li>
                    </ul>
                    <ButtonMainAction type='button' to='/contacts' title='от 1000 руб.'/>
                </li>
            </ul>
            </section>
        </main>
    )

}

export default PricesAndServices;
