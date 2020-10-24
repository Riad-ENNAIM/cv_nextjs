import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Rating from '../utils/Rating';
import letterColors from '../../data/letterColors';

import ProfileContext from '../../context/profile/profileContext';
import ReviewContext from '../../context/review/reviewContext';

const Review = ({ review }) => {
  const { _id, username, comment, rating, date, isDeletable, link } = review;

  const profileContext = useContext(ProfileContext);
  const reviewContext = useContext(ReviewContext);
  const { language } = profileContext;
  const { deleteReview } = reviewContext;

  useEffect(() => {
    setAvatarFromUsername();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDiffDateFromDate();
  });

  const [avatar, setAvatar] = useState({
    name: '',
    background: ''
  });

  const [diffDate, setDiffDate] = useState();

  const setAvatarFromUsername = () => {
    const name = username
                .replace(/[^A-Z a-z]/g, '')
                .replace(/\s+/g, " ")
                .trim()
                .split(' ');
    const firstLetter = name[0].slice(0,1);
    const lastLetter = name.length > 1 ? name[1].slice(0,1) : name[0].slice(name[0].length - 1);

    setAvatar({
      name: name.length > 1 ? (firstLetter + lastLetter).toUpperCase() : firstLetter.toUpperCase(),
      background: '#'+ letterColors[firstLetter.toLowerCase()] + letterColors[lastLetter.toLowerCase()]
    });
  }

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
    } else {
      if (diffTime < 1000 * 60 * 60 * 24 * 30) {
        if (diffTime < 1000 * 60 * 60 * 24 * 7) {
          if (diffTime < 1000 * 60 * 60 * 24) {
            if (diffTime < 1000 * 60 * 60) {
              if(diffTime < 1000 * 60) {
                setDiffDate(`${language === 'en' ? 'Now' : 'Maintenant'}`);
              } else {
                // Minutes
                const numberOfUnits = Math.round(diffTime / (1000 * 60));
                setDiffDate(`${numberOfUnits} minute${numberOfUnits > 1 ? 's' : ''}`);
              }
            } else {
              // Hours
              const numberOfUnits = Math.round(diffTime / (1000 * 60 * 60));
              setDiffDate(`${numberOfUnits} ${language === 'en' ? 'hour' : 'heure'}${numberOfUnits > 1 ? 's' : ''}`);
            }
          } else {
            // Days
            const numberOfUnits = Math.round(diffTime / (1000 * 60 * 60 * 24));
            setDiffDate(`${numberOfUnits} ${language === 'en' ? 'day' : 'jour'}${numberOfUnits > 1 ? 's' : ''}`);
          }
        } else {
          // Weeks
          const numberOfUnits = Math.round(diffTime / (1000 * 60 * 60 * 24 * 7));
          setDiffDate(`${numberOfUnits} ${language === 'en' ? 'week' : 'semaine'}${numberOfUnits > 1 ? 's' : ''}`);
        }
      } else {
        // Months
        const numberOfUnits = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30));
        setDiffDate(`${numberOfUnits} ${language === 'en' ? 'month' : 'mois'}`);
      }
    }
  }

  const goToLink = () => {
    if(link){
      window.open(link, "_blank")
    }
  }

  return (
    <div className="review">
      <div className="review-title">
        <span className="review-avatar" style={{background: avatar.background}}>{avatar.name}</span>
        <div>
          <span className="review-date">{diffDate}</span>
          <span className="review-username" onClick={goToLink}>{username}</span>
          {/* <a href={link} target="_blank" rel="noopener noreferrer" title={link} className="review-username">
            {username}
          </a> */}
        </div>
      </div>

      <div className="review-content">
        <div className="container justify-content-space-between align-items-center">
          <Rating rating={rating} />

          {
            isDeletable &&
            <div className="remove" onClick={() => deleteReview(_id)}>
              <i className="fas fa-times"></i>
            </div>
          }
        </div>
        <p dangerouslySetInnerHTML={{__html: comment}} />
      </div>
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.object.isRequired
};

export default Review;
