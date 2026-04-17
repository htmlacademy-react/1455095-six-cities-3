import { useState, ChangeEvent, FormEvent, Fragment, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../store/api-action';
import { getReviewPostingStatus } from '../../store/current-offer-data/current-offer-data.selectors';
import { toast } from 'react-toastify';

const RATINGS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector(getReviewPostingStatus);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const isCommentValid = comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && rating > 0;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isCommentValid) {
      return;
    }

    dispatch(
      postCommentAction({
        offerId,
        comment: comment.trim(),
        rating,
      })
    )
      .unwrap()
      .then(() => {
        setRating(0);
        setComment('');
        toast.success('Review submitted successfully!');
      })
      .catch(() => {
        toast.error('Failed to submit review. Please try again.');
      });
  };
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={handleRatingChange}
              disabled={isPosting}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isPosting}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b>{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isCommentValid || isPosting}>
          {isPosting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

const MemoizedReviewForm = memo(ReviewForm);
export default MemoizedReviewForm;
