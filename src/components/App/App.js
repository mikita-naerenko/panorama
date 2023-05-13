import './app.scss';
import Main from '../Main/Main';
import MainPanoramaBg from '../photoSphere/PhotoSphere';



const App = () => {

    return (
        <div className='app'>
              {/* <iframe style={activeMenu ? {'touchAction' : 'manipulation', 'pointerEvents': 'none'} : null} className="main-bg" title={'1'} src="https://panoramakrasnodar.ru/tours/panoramaonline/" width="100%"  frameBorder="no" scrolling="no" allowFullScreen="allowfullscreen"></iframe> */}
              <MainPanoramaBg/>
            <Main />
        </div>
    )
}

export default App;