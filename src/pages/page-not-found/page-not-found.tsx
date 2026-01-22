import { Link } from 'react-router-dom';
import './page-not-found.scss';
import img from '../../../public/img/page-not-found-404.svg';

function PageNotFound() {
  return (
    <section className="PageNotFound">
      <div className="container">
        <div className="PageNotFound__text">
          <div className="PageNotFound__num">
            <h1>404 - Страница не найдена</h1>
            <img
              src={img}
              width="671"
              height="259"
              alt="404 - Страница не найдена | Канон перемен"
              loading="lazy"
            />
          </div>
          <p className="PageNotFound__explain">
            К&nbsp;сожалению, страница не&nbsp;найдена
          </p>
          <p className="PageNotFound__desc">
            Возможно вы&nbsp;неправильно набрали URL&#8209;адрес или страница
            была&nbsp;удалена
          </p>
          <Link to="/" className="PageNotFound__button">
            <span>Перейти на главную</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
