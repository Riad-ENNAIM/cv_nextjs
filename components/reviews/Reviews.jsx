import { useEffect, useContext } from 'react';
import Review from './Review';
import ReviewForm from './ReviewForm';
import Loader from '../utils/Loader';

import LanguageContext from '../../context/language/languageContext';
import ReviewContext from '../../context/review/reviewContext';

const Reviews = () => {
  const languageContext = useContext(LanguageContext);
  const reviewContext = useContext(ReviewContext);
  const { dictionary } = languageContext;
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
          {dictionary.submitReviewButton}
        </button>
      )}
    </>
  );
};

export default Reviews;
