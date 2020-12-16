import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Rating from '../utils/Rating';
import CounterLoader from '../utils/CounterLoader';

import ProfileContext from '../../context/profile/profileContext';
import ReviewContext from '../../context/review/reviewContext';

const HeaderRating = () => {
  const profileContext = useContext(ProfileContext);
  const reviewContext = useContext(ReviewContext);
  const { language } = profileContext;
  const { reviews, getReviews } = reviewContext;
  const [globalRating, setGlobalRating] = useState(0);

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, []);

  const updateGlobalRating = () => {
    if (reviews?.length > 0) {
      const sum = reviews.reduce((acc, review) => (review.rating ? acc + review.rating : acc), 0);

      const note = sum / reviews.length <= 5 ? sum / reviews.length : 5;
      setGlobalRating(note);
    }
  };

  useEffect(() => {
    updateGlobalRating();
    // eslint-disable-next-line
  }, [reviewContext, reviews]);

  return (
    <div className="main-rating">
      {globalRating ? <h1>{globalRating.toFixed(1)}</h1> : <CounterLoader />}
      <Rating rating={globalRating} />
      <Link href="/reviews">
        <a href="/reviews">{language === 'en' ? 'Evaluation' : 'Évaluation'}</a>
      </Link>
    </div>
  );
};

export default HeaderRating;
