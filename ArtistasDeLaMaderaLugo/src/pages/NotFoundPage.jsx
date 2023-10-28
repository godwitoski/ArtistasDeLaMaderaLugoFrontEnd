import { Link } from 'react-router-dom';
import NotFoundImage from '../resources/NotFoundImage.jpg';

export const NotFoundPage = () => {
  return (
    <section className="not-found-container">
      <div className='not-found-content'>
        <h1 className="not-found-title">Vaya...</h1>
        <p className="not-found-message">
          La página que buscas está más escondida que Wally en una foto.</p>
        <p className='not-found-message'>Pero podemos llevarte de vuelta a la diversión.
        </p>
        <Link to={'/'} className='main-button'>
          Ir a la Página de Inicio
        </Link>
      </div>
      <img src={NotFoundImage} alt="Not Found Image" className='not-found-image' />
    </section>
  );
};
