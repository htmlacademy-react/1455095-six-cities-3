import { ReviewsType } from '../../types/reviews';
import { getRatingWidth } from '../../utils/utils';
import { DateFormat } from '../../const/const';
import { humanizeDate } from '../../utils/utils-dayjs';
import FormComment from '../form-comment/form-comment';

type ReviewsListProps = {
  reviews: ReviewsType;
};

function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews ·<span className="reviews__amount">{reviews && reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((item) => (
          <li key={item.id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={item.user.avatarUrl || ''} width={54} height={54} alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">{item.user.name || null}</span> {item.user.isPro && <span className="offer__user-status">{item.user.isPro && 'Pro'}</span>}
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width: getRatingWidth(item.rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{item.comment}</p>
              <time className="reviews__time" dateTime={item.date}>
                {humanizeDate({
                  date: item.date,
                  format: DateFormat.DATE_REVIEW,
                })}
              </time>
            </div>
          </li>
        ))}
      </ul>
      <FormComment />
    </section>
  );
}
export default ReviewsList;
