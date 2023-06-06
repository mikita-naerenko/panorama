import * as Yup from 'yup';
import { Formik, Form, Field, useField} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';



import { useHttp } from '../../hooks/htth.hook';
import ButtonMainAction from '../buttonMainAction/ButtonMainAction';
import { setFormDidSumit, fetchCity } from '../../store/PanoramaSlice'

import './formCTA.scss';


const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='form__name' >
        <label htmlFor={props.name} className="form__name-label">{label}</label>
       <input {...field}{...props}/>
       {meta.touched && meta.error ? (
      <div className="form__error-notice">{meta.error}</div>
    ) : null}
    </div>
    )
}

const EmailInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='form__email' >
        <label htmlFor={props.name} className="form__email-label">{label}</label>
       <input className="form__email-input" {...field}{...props}/>
       {meta.touched && meta.error ? (
      <div className="form__error-notice">{meta.error}</div>
    ) : null}
    </div>
    )
}
const PhoneInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='form__phone'>
        <label htmlFor={props.name} className="form__phone-label">{label}</label>
       <input className='form__phone-input' {...field}{...props}/>
       {meta.touched && meta.error ? (
      <div className="form__error-notice">{meta.error}</div>
    ) : null}
    </div>
    )
}

// const DataCheckboxInput = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     // const { showPersonalDataAgreement } = useSelector(state => state.panorama);
//     // const dispatch = useDispatch();
//     return (
//         <div className='form__checbox'>
//         <label htmlFor={props.name} className='form__agree'>{label}
//        <input className='form__checbox' {...field}{...props}/>
//        {/* <a hreh="#" onClick={() => dispatch(setPersonalDataAgreementDisplay(!showPersonalDataAgreement))}>Согласие на обработку персональных данных</a>
//                     {showPersonalDataAgreement ? <PersonalDataAgreement/> : null} */}
//        </label>
//        {meta.touched && meta.error ? (
//       <div className="form__error-notice">{meta.error}</div>
//     ) : null}
//     </div>
//     )
// }

const FormCTA = () => {
    const { city, formDidSubmit } = useSelector(state => state.panorama);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchCity())
    },[])

    const renderCity = (arr) => {
        return arr.map(el => {
           return <option key={uuidv4()} value={el.name}>{el.name}</option>
        })
    }
  
    const cityItem = renderCity(city)

 
    return (
        <Formik
                initialValues={{
                    tour3DforMap: false,
                    tour3DforWebsite: false,
                    aeroPanorama: false,
                    interiorPhotography: false,
                    yandexFood: false,
                    aeroPhotoAndVideo: false,
                    createVideo: false,
                    subjectPhotography: false,
                    city: '',
                    name: '',
                    email: '',
                    phone: '',
                    text: '',
                }}
                validationSchema = {Yup.object({
                    name: Yup.string()
                             .min(2, 'Имя должно содержать не менее двух символов')
                             .required('Обязательное поле'),
                    text: Yup.string()
                             .min(5, 'Введите не менее 5 символов'),
                    email: Yup.string()
                             .email('Неверно введён электронный адрес.')
                             .required('Обязательное поле'),
                    phone: Yup.string()
                            .matches(/^\+?[1-9]\d{1,14}$/, 'Введён некорректный телефонный номер.')
                            .required('Укажите номер телефона.'),
                })}
                onSubmit = {(values, { resetForm }) =>{
                    
                    const newValue = {
                        id: uuidv4(),
                        name: values.name,
                        comments: values.comments,
                        phone: values.phone,
                        email: values.email,
                        city: values.city,
                        services: Object.entries(values).filter(el => el[1] === true)
                    };
                    request("http://localhost:3004/data", 'POST', JSON.stringify(newValue))
                    .then(res => console.log(res, 'Отправка успешна'))
                    .then(() => resetForm())
                    .then(() => values.comments = '')
                    .then(() => dispatch(setFormDidSumit(!formDidSubmit)))
                    .catch(err => console.error(err))
                }}>
            <Form className='form'>
                <div className='form__wrapper'>
                    <div className='form__city-field-wrapper'>
                    <Field as="select"
                           id="city"
                           name="city">
                            {cityItem}
                    </Field>
                </div>
                <TextInput
                    type="text" 
                    name="name" 
                    className="form__name-input" 
                    id="name" 
                    placeholder="Ваше имя*"
                    />
                <EmailInput
                        type="email"
                        name="email" 
                        id="email" 
                        placeholder="Электронная почта*"
                        />
                <PhoneInput
                        type="tel"
                        name="phone" 
                         
                        id="phone" 
                        placeholder="Номер телефона*"
                        />
                </div>
                
                
                <div className='form__checkbox-wrapper'>
                <label htmlFor="tour3DforMap">
                    <Field className='form__checbox' type="checkbox" id="tour3DforMap" name="tour3DforMap" />
                    - Создание виртуального 3Д-тура для карт Яндекс и Google
                </label> 
                <label htmlFor="tour3DforWebsite">
                    <Field className='form__checbox' type="checkbox" id="tour3DforWebsite" name="tour3DforWebsite" />
                    - Создание индивидуального виртуального 3Д-тура для сайта
                </label>
                <label htmlFor="aeroPanorama">
                    <Field className='form__checbox' type="checkbox" id="aeroPanorama" name="aeroPanorama" />
                    - Съёмка аэропанорам 
                </label>
                <label htmlFor="interiorPhotography">
                    <Field className='form__checbox' type="checkbox" id="interiorPhotography" name="interiorPhotography" />
                    - Интерьерная съёмка 
                </label>
                <label htmlFor="yandexFood">
                    <Field className='form__checbox' type="checkbox" id="yandexFood" name="yandexFood" />
                    - Фуд съёмка для Яндекс еды 
                </label>
                <label htmlFor="aeroPhotoAndVideo">
                    <Field className='form__checbox' type="checkbox" id="aeroPhotoAndVideo" name="aeroPhotoAndVideo" />
                    - Аэро фото и видеосъёмка 
                </label>
                <label htmlFor="createVideo">
                    <Field className='form__checbox' type="checkbox" id="createVideo" name="createVideo" />
                    - Съёмка и создание видеоролика 
                </label>
                <label htmlFor="subjectPhotography">
                    <Field className='form__checbox' type="checkbox" id="subjectPhotography" name="subjectPhotography" />
                    - Предметная фотосъемка товаров в 360 градусов (3D) 
                </label>
                </div>
                <div>
                <label htmlFor="comments" className="form__textarea"></label>
                    <Field as="textarea"
                           className="form__textarea-input"
                           id="comments"
                           name="comments"
                           placeholder=" Ваши комментарии">
                            
                    </Field>
                </div>
                <div className="form__button-wrapper">
                   <ButtonMainAction type="submit" title={"Отправить"}/> 
                   {formDidSubmit ? <span>Мы получили вашу заявку и скоро с вами свяжемся.</span> : null}
                </div>
            </Form>
        </Formik>
    )
}

export default FormCTA;