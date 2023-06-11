import yandexIcon from './yandex-icon.png';
import './reviews.scss';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const mockReviewList = [
    {
        name: 'Анна Кудряшова',
        date: '20 октября 2022',
        text: 'Очень довольна работой Сергея! Поставленную задачу сделал качественно и с душой) Однозначно буду рекомендовать друзьям и знакомым!',
        link: 'https://yandex.ru/web-maps/org/107287163042/reviews?reviews[publicId]=xn6a55vpnz0q87hr9474au3d60&utm_source=review'
    },
    {
        name: 'Ксюша К.',
        
        date: '3 декабря 2019',
        text: 'Огромная благодарность Сергею! Сделал качественную работу в нашем массажном салоне в г. Севастополь. Сергей сделал супер виртуальный тур для карт Яндекс и Гугл. Внимательно выслушал и учел все наши пожелания. Теперь, только Сергея ,рекомендуем всем знакомым у кого есть свой бизнес!',
        link: 'https://yandex.ru/web-maps/org/107287163042/reviews?reviews[publicId]=fjr2z4khuhu4dzzkxxwr8kc8xw&utm_source=review'
    },
    {
        name: 'Андрей К.',
        
        date: '4 февраля 2019',
        text: 'Большое спасибо PANORAMAKRASNODAR за отличную работу!!! А особенно Сергею, он не только профессионал своего дела, но и замечательный человек!!! Интернет сайт очень информативный и удобный!!! 3D тур был выполнен со всеми пожеланиями и просьбами!!! ПОЖИЗНЕННАЯ РЕКЛАМА за не большие деньги - это ЛУЧШЕЕ, что можно приобрести для своего бизнеса!!!',
        link: 'https://yandex.ru/web-maps/org/107287163042/reviews?reviews[publicId]=0ge3gywhvj1mv806fet1jv6ubg&utm_source=review'
    },
    {
        name: 'th0166',
        
        date: '6 января 2021',
        text: 'Заказывал в этой компании аэро съёмку своего строительного объекта . Оператор приехал оперативно в день обращения. Ребята в подарок бонусом сделали мне аэропанораму и разместили ее на моем объекте на картах Яндекс и Гугл. Спасибо вам большое! Обязательно вас порекомендую своим друзьям.',
        link: 'https://yandex.ru/web-maps/org/107287163042/reviews?reviews[publicId]=mhfzhd6m53e87htg88zuwpt1fr&utm_source=review'
    },
    {
        name: 'Николаева О.',
        
        date: '12 февраля 2020',
        text: 'Сергей, благодарим Вас за прекрасно выполненную работу! Созданный Вами виртуальный тур нашей студии, оправдал самые лучшие ожидания. Все фотографии отличного качества, помещения сняты в наиболее выигрышных ракурсах. Не смотря на сложные условия съёмки в виде множества глянцевых и зеркальных поверхностей, Сергей отлично справился с задачей — качество и детализация изображения получились на самом высоком уровне!Особо порадовали короткие сроки сдачи работы. Сотрудничество с Вами доставило нам море позитивных эмоций. Желаем Вам еще больше довольных клиентов!',
        link: 'https://yandex.ru/web-maps/org/107287163042/reviews?reviews[publicId]=h93fw40zfxmbptj1hmet5h6r3g&utm_source=review'
    },
    {
        name: 'Ольга М.',
        
        date: '27 марта 2022',
        text: 'Очень долго не могли выбрать фотографа для создания виртуального 3Д-тура нашей сети кондитерских Патрик&Мари. Либо слишком дорого, либо качество портфолио не соответствовало нашим требованиям. Одна знакомая посоветовала посмотреть портфолио в студии Panorama. Как итог — у нас просто восхитительный виртуальный 3Д-тур.',
        link: 'https://yandex.ru/web-maps/org/107287163042/reviews?reviews[publicId]=n3hhq6g2a2wnrq9te607g2m7pg&utm_source=review'
    }
]


const Reviews = () => {

    const sliderRef = useRef(null);
      
    const handleScroll = (scrollOffset) => {
        if (sliderRef.current) {
          sliderRef.current.scrollLeft += scrollOffset;
        }
      };

    const renderReview = (arr) => {
        return arr.map(el => {
            return <li className='review__item' key={el.name}>
                        <div className='review__header'>
                            {el.avatar ? <img src={el.avatar} alt="" width={50} /> : <div className='review__mock-avatar'>{el.name.at(0)}</div>}
                             <div className='review__title'>
                                <Link to={el.link}>
                                    <span className='review__author-name'>{el.name}</span>
                                    <time><p>{el.date}</p></time>
                                </Link>
                            </div>
                            <Link to={el.link}>
                            <img className='review__yandex-link' src={yandexIcon} width={30} alt="" />
                            </Link>
                        </div>
                        <p className='review__text'>{el.text}</p>
                    </li>
        })
    }

    

    const items = renderReview(mockReviewList);


    return (
        <section className='review'>
            <h2>Отзывы от наших клиентов:</h2>
            <ul className='review__list' ref={sliderRef}>
                {items}
            </ul>
            <div className='toggle-group'>
                <button className='toggle-group__button-left' onClick={() => handleScroll(-document.querySelector('.review__item').offsetWidth)}><div></div><div></div></button>
                <button className='toggle-group__button-right' onClick={() => handleScroll(document.querySelector('.review__item').offsetWidth)}><div></div><div></div></button>
            </div>
        </section>
    )
}

export default Reviews;