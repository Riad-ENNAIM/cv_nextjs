import { useReducer } from 'react';
import axios from 'axios';
import ReviewContext from './reviewContext';
import reviewReducer from './reviewReducer';
import {
  ADD_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  REVIEW_ERROR,
  TOGGLE_FORM
} from '../types';

const ReviewState = props => {
  const initialState = {
    reviews: null,
    showForm: false,
    isLoading: true,
    errors: null
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);

  // Get Reviews
  const getReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      dispatch({
        type: GET_REVIEWS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.msg
      });
    }
  };


  // Add Review
  const addReview = async review => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/reviews', review, config);

      const newReview = res.data;
      newReview.isDeletable = true;

      dispatch({
        type: ADD_REVIEW,
        payload: newReview
      });

      setTimeout(() => {
        getReviews();
      }, 4000);
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.errors
      });
    }
  };

  // Delete Review
  const deleteReview = async id => {
    try {
      await axios.delete(`/api/reviews/${id}`);

      dispatch({
        type: DELETE_REVIEW,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Toggle Review Form
  const toggleForm = () => dispatch({ type: TOGGLE_FORM });
  
  return (
    <ReviewContext.Provider
      value={{
        reviews: state.reviews,
        showForm: state.showForm,
        isLoading: state.isLoading,
        errors: state.errors,
        getReviews,
        addReview,
        deleteReview,
        toggleForm
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;