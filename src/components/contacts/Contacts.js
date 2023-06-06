import './contacts.scss';
import PopUpMenu from '../popUpMenu/PopUpMenu';
import FormCTA from '../form/FormCTA';
import { Link } from 'react-router-dom';
import { setCurrentPage } from '../../store/PanoramaSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Contacts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentPage('contacts'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <main className='contacts'>
            <PopUpMenu/>
            <section>
            <h2 className='current-page-name'>Контакты</h2> 
            <address className='contacts__list'>
                <div className='contacts__container-static'>
                    <span>Digital агенство "Студия Панорама"</span>
                    <span>Г.Краснодар, ул.Ленина 92/2 , оф.4 </span>
                    <span>График пн-вс 9:00 - 19:00 </span>
                </div>
                <div className='contacts__container-link'>
                    <span>Тел.1: <Link to={`tel:${88612428182}`}>8 (861) 242 - 81 - 82</Link></span>
                    <span>Тел.2: <Link to={`tel:${89882428182}`}>8 (988) 242 - 81 - 82 (WhatsApp, Viber, Telegram)</Link></span>
                    <span>Email: <Link to={`mailto:${'panoramakrasnodar360@gmail.com'}`}>panoramakrasnodar360@gmail.com</Link></span>
                </div>
            </address>
            <div className='contacts__title-wrapper'>
                <h3 className='contacts__title'>Хотите обсудить проект?</h3>
                <p className='contacts__text'>Заполните поля для заказа услуги или индивидуальной консультации</p>
            </div>
            <div className='contacts__form-wrapper'>
                <FormCTA/>
            </div>
                
                
            </section>
        </main>
    )
}

export default Contacts;