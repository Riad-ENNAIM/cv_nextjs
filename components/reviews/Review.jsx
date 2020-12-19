import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Rating from '../utils/Rating';
import letterColors from '../../data/letterColors';

import LanguageContext from '../../context/language/languageContext';
import ReviewContext from '../../context/review/reviewContext';

const Review = ({ review }) => {
  const { _id, username, comment, rating, date, isDeletable, link } = review;

  const languageContext = useContext(LanguageContext);
  const reviewContext = useContext(ReviewContext);
  const { dictionary } = languageContext;
  const { deleteReview } = reviewContext;

  const [avatar, setAvatar] = useState({
    name: '',
    background: '',
  });
  const [diffDate, setDiffDate] = useState();

  const setAvatarFromUsername = () => {
    const name = username
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

  const setDiffDateFromDate = () => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffTime = now.getTime() - reviewDate.getTime();

    if (diffTime >= 1000 * 60 * 60 * 24 * 365) {
      if (diffTime >= 1000 * 60 * 60 * 24 * 365 * 2.5) {
        setDiffDate('3 ans');
      } else if (diffTime >= 1000 * 60 * 60 * 24 * 365 * 1.5) {
        setDiffDate('2 ans');
      } else {
        setDiffDate('1 an');
      }
    } else if (diffTime < 1000 * 60 * 60 * 24 * 30) {
      if (diffTime < 1000 * 60 * 60 * 24 * 7) {
        if (diffTime < 1000 * 60 * 60 * 24) {
          if (diffTime < 1000 * 60 * 60) {
            if (diffTime < 1000 * 60) {
              setDiffDate(`${dictionary.now}`);
            } else {
              // Minutes
              const numberOfUnits = Math.round(diffTime / (1000 * 60));
              setDiffDate(`${numberOfUnits} minute${numberOfUnits > 1 ? 's' : ''}`);
            }
          } else {
            // Hours
            const numberOfUnits = Math.round(diffTime / (1000 * 60 * 60));
            setDiffDate(`${numberOfUnits} ${dictionary.hour}${numberOfUnits > 1 ? 's' : ''}`);
          }
        } else {
          // Days
          const numberOfUnits = Math.round(diffTime / (1000 * 60 * 60 * 24));
          setDiffDate(`${numberOfUnits} ${dictionary.day}${numberOfUnits > 1 ? 's' : ''}`);
        }
      } else {
        // Weeks
        const numberOfUnits = Math.round(diffTime / (1000 * 60 * 60 * 24 * 7));
        setDiffDate(`${numberOfUnits} ${dictionary.week}${numberOfUnits > 1 ? 's' : ''}`);
      }
    } else {
      // Months
      const numberOfUnits = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30));
      setDiffDate(`${numberOfUnits} ${numberOfUnits > 1 ? dictionary.months : dictionary.month}`);
    }
  };

  useEffect(() => {
    setAvatarFromUsername();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDiffDateFromDate();
  });

  const goToLink = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="review">
      <div className="review-title">
        <span className="review-avatar" style={{ background: avatar.background }}>
          {avatar.name}
        </span>
        <div>
          <span className="review-date">{diffDate}</span>
          <span className="review-username" onClick={goToLink} role="link" tabIndex="0">
            {username}
          </span>
          {/* <a href={link} target="_blank" rel="noopener noreferrer" title={link} className="review-username">
            {username}
          </a> */}
        </div>
      </div>

      <div className="review-content">
        <div className="container justify-content-space-between align-items-center">
          <Rating rating={rating} />

          {isDeletable && (
            <div className="remove" onClick={() => deleteReview(_id)} role="button" tabIndex="0">
              <i className="fas fa-times" />
            </div>
          )}
        </div>
        <p dangerouslySetInnerHTML={{ __html: comment }} />
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Review;
