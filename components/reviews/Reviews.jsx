import { useEffect, useContext } from 'react';
import Review from './Review';
import ReviewForm from './ReviewForm';
import Loader from '../utils/Loader';

import ProfileContext from '../../context/profile/profileContext';
import ReviewContext from '../../context/review/reviewContext';

const Reviews = () => {
  const profileContext = useContext(ProfileContext);
  const reviewContext = useContext(ReviewContext);
  const { language } = profileContext;
  const { reviews, showForm, getReviews, toggleForm, isLoading } = reviewContext;

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, []);

  if (reviews === null || isLoading) {
    return <Loader />;
  }

  return (
    <>
      {reviews.map((review) => (
        <Review key={review._id} review={review} />
      ))}

      {showForm ? (
        <ReviewForm />
      ) : (
        <button className="btn btn-primary btn-center" type="button" onClick={toggleForm}>
          {language === 'en' ? 'Add Review' : 'Commenter'}
        </button>
      )}
    </>
  );
};

export default Reviews;
