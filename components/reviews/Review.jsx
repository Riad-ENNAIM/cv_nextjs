import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faThumbsUp, faThumbsDown, faHeart } from '@fortawesome/free-solid-svg-icons';

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

  const [formatedComment, setFormatedComment] = useState();
  const [avatar, setAvatar] = useState({
    name: '',
    background: '',
  });
  const [diffDate, setDiffDate] = useState();

  const getAvatarFromUsername = () => {
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

  const defineRegExp = (words) => {
    const regexMetachars = /[(){[*+?.\\^$|]/g;
    const rules = words;

    for (let i = 0; i < rules.length; i++) {
      rules[i] = rules[i].replace(regexMetachars, '\\$&');
    }

    return new RegExp(`\\b(?:${rules.join('|')})\\b`, 'gi');
  };

  const alternateMerge = (arr1, arr2) => {
    let i = 0;
    let j = 0;
    let k = 0;
    const result = [];

    // Traverse both array
    while (i < arr1.length && j < arr2.length) {
      result[k++] = arr1[i++];
      result[k++] = arr2[j++];
    }

    // Store remaining elements of first array
    while (i < arr1.length) result[k++] = arr1[i++];

    // Store remaining elements of second array
    while (j < arr2.length) result[k++] = arr2[j++];

    return result;
  };

  const formatComment = () => {
    const regex = defineRegExp(['faIconThumbsUp', 'faIconHeart', 'faIconThumbsDown']);

    const textsArray = comment.split(regex) || [];
    if (textsArray[0] === '') textsArray.shift();
    if (textsArray[textsArray.length - 1] === '') textsArray.pop();

    const iconTypesArray = comment.match(regex) || [];

    const iconsArray = iconTypesArray.map((iconType, index) => {
      if (iconType === 'faIconThumbsUp')
        return (
          <FontAwesomeIcon key={index} icon={faThumbsUp} className="like" title="(y) = Like" />
        );
      if (iconType === 'faIconHeart')
        return <FontAwesomeIcon key={index} icon={faHeart} className="heart" title="<3 = Heart" />;
      if (iconType === 'faIconThumbsDown')
        return (
          <FontAwesomeIcon
            key={index}
            icon={faThumbsDown}
            className="dislike"
            title=":-1: = Dislike"
          />
        );
      return null;
    });

    const commentToArray = comment.startsWith('faIcon')
      ? alternateMerge(iconsArray, textsArray)
      : alternateMerge(textsArray, iconsArray);

    setFormatedComment(commentToArray);
  };

  useEffect(() => {
    getAvatarFromUsername();
    formatComment();
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
              <FontAwesomeIcon icon={faTimes} />
            </div>
          )}
        </div>
        <p>{formatedComment}</p>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Review;
