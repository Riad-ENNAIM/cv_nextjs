import { useState, useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Rating from '../utils/Rating';
import letterColors from '../../data/letterColors';

import LanguageContext from '../../context/language/languageContext';
import ReviewContext from '../../context/review/reviewContext';

const ReviewForm = () => {
  const languageContext = useContext(LanguageContext);
  const reviewContext = useContext(ReviewContext);
  const { dictionary } = languageContext;
  const { errors, addReview, toggleForm } = reviewContext;

  const formRef = useRef(null);

  const [review, setReview] = useState({
    username: '',
    comment: '',
    link: '',
    rating: 0,
  });
  const [avatar, setAvatar] = useState({
    name: '',
    background: '#ffffff',
  });
  const [isTypingComment, setIsTypingComment] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const onChange = (e) => setReview({ ...review, [e.target.name]: e.target.value });

  const updateAvatar = () => {
    const name = review.username
      .replace(/[^A-Z a-z]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ');
    const firstLetter = name[0].slice(0, 1);
    const lastLetter = name.length > 1 ? name[1].slice(0, 1) : name[0].slice(name[0].length - 1);

    setAvatar({
      name: name.length > 1 ? (firstLetter + lastLetter).toUpperCase() : firstLetter.toUpperCase(),
      background: `#${letterColors[firstLetter.toLowerCase()]}${
        letterColors[lastLetter.toLowerCase()]
      }`,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (review.rating === 0 && !showAlert) {
      setShowAlert(true);
      return;
    }

    setIsSending(true);

    addReview({
      ...review,
      username: review.username.replace(/\s+/g, ' ').trim(), // Remove extrat white spaces
      comment: review.comment
        .replace(/\(y\)/g, 'faIconThumbsUp')
        .replace(/<3/g, 'faIconHeart')
        .replace(/:-1:/g, 'faIconThumbsDown')
        .replace(/\n\r?/g, '<br>'), // Add line breaks
      link: review.link.length > 0 ? review.link : 'http://www.riadennaim.com/',
    });
  };

  const closeForm = () => toggleForm();

  const toggleTypingSpinner = () => setIsTypingComment(!isTypingComment);

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <div className="review-form">
        <div className="remove" onClick={closeForm} role="button" tabIndex="0">
          <FontAwesomeIcon icon={faTimes} />
        </div>

        <div className="review-form-title">
          <span className="review-form-avatar" style={{ background: avatar.background }}>
            {avatar.name}
          </span>
          <input
            id="username"
            type="text"
            placeholder={dictionary.nameInputPlaceholder}
            name="username"
            value={review.username}
            onChange={onChange}
            onBlur={updateAvatar}
            title={dictionary.nameInputTitle}
            required
          />
        </div>

        <div className="review-form-content">
          {errors &&
            errors.map((error) => (
              <span key={error.param + error.value} className="review-error">
                {error.msg}
              </span>
            ))}

          <div className="container align-items-center">
            <div className={showAlert && review.rating === 0 ? 'rating-alert' : ''}>
              <Rating
                isActive
                onClickStar={(value) => setReview({ ...review, rating: value + 1 })}
                rating={review.rating}
              />
            </div>

            {showAlert && review.rating === 0 && (
              <span className="tag-alert">{dictionary.reviewAlert}</span>
            )}
          </div>

          <textarea
            id="comment"
            name="comment"
            value={review.comment}
            rows="7"
            onChange={onChange}
            onFocus={toggleTypingSpinner}
            onBlur={toggleTypingSpinner}
          />

          <input
            id="link"
            type="text"
            placeholder={dictionary.LinkInputPlaceholder}
            name="link"
            value={review.link}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="container justify-content-center align-items-center">
        <input
          type="submit"
          // value={`Commenter ${showAlert && review.rating === 0 ? 'avec une note 0/5' : ''}`}
          value={dictionary.submitReviewButton}
          className={`btn btn-center ${isSending && !errors ? 'btn-disabled' : 'btn-primary'}`}
          disabled={isSending && !errors}
        />
      </div>
    </form>
  );
};

export default ReviewForm;
