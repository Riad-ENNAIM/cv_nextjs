import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Rating from '../utils/Rating';

import ProfileContext from '../../context/profile/profileContext';
import ReviewContext from '../../context/review/reviewContext';

const HeaderRating = () => {
  const profileContext = useContext(ProfileContext);
  const reviewContext = useContext(ReviewContext);
  const { language } = profileContext;
  const { reviews, getReviews } = reviewContext;

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateGlobalRating();
    // eslint-disable-next-line
  }, [reviewContext, reviews]);

  const [globalRating, setGlobalRating] = useState(0);

  const updateGlobalRating = () => {
    if(reviews?.length > 0) {
      const sum = reviews.reduce((acc, review) => {
        return review.rating ? acc + review.rating : acc;
      }, 0);
      
      const note = sum / reviews.length <= 5 ? sum / reviews.length : 5;
      setGlobalRating(note);
    }
  }

  return (
    <div className="main-rating">
      <h1>{globalRating.toFixed(1)}</h1>
      <Rating rating={globalRating} />
      <Link href="/reviews"><a>{language === 'en' ? 'Evaluation' : 'Évaluation'}</a></Link>
    </div>
  );
}

export default HeaderRating;