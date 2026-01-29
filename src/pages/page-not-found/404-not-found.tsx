import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className="PageNotFound">
      <div className="PageNotFound__text">
        <div className="PageNotFound__num">
          <h1>404 - Страница не найдена | Канон перемен</h1>
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
    </section>
  );
}

export default PageNotFound;
