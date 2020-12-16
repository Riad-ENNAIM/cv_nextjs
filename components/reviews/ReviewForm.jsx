import { useState, useContext, useEffect, useRef } from 'react';
import Rating from '../utils/Rating';
import letterColors from '../../data/letterColors';

import ProfileContext from '../../context/profile/profileContext';
import ReviewContext from '../../context/review/reviewContext';

const ReviewForm = () => {
  const profileContext = useContext(ProfileContext);
  const reviewContext = useContext(ReviewContext);
  const { language } = profileContext;
  const { errors, addReview, toggleForm } = reviewContext;

  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

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
        .replace(/\(y\)/g, '<i class="like fas fa-thumbs-up" title="(y) = Like"></i>')
        .replace(/<3/g, '<i class="heart fas fa-heart" title="<3 = Heart"></i>')
        .replace(/:-1:/g, '<i class="dislike fas fa-thumbs-down" title="<3 = Dislike"></i>')
        .replace(/\n\r?/g, '<br />'), // Add line breaks
      link: review.link.length > 0 ? review.link : 'http://www.riadennaim.com/',
    });
  };

  const closeForm = () => toggleForm();

  const toggleTypingSpinner = () => setIsTypingComment(!isTypingComment);

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <div className="review-form">
        <div className="remove" onClick={closeForm} role="button" tabIndex="0">
          <i className="fas fa-times" />
        </div>

        <div className="review-form-title">
          <span className="review-form-avatar" style={{ background: avatar.background }}>
            {avatar.name}
          </span>
          <input
            id="username"
            type="text"
            placeholder={language === 'en' ? 'Enter your name' : 'Entrer votre nom'}
            name="username"
            value={review.username}
            onChange={onChange}
            onBlur={updateAvatar}
            title={
              language === 'en'
                ? 'Enter a valid name, just letters!'
                : 'Entrer un nom valide, juste des lettres !'
            }
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
              <span className="tag-alert">
                {language === 'en' ? 'You can add a note!' : 'Vous pouvez ajouter une note !'}
              </span>
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
            placeholder={
              language === 'en'
                ? 'Enter a link: Linkedin, GitHub, Blog, ...'
                : 'Entrer un lien: Linkedin, GitHub, Blog, ...'
            }
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
          value={language === 'en' ? 'Add Review' : 'Commenter'}
          className={`btn btn-center ${isSending && !errors ? 'btn-disabled' : 'btn-primary'}`}
          disabled={isSending && !errors}
        />
      </div>
    </form>
  );
};

export default ReviewForm;
