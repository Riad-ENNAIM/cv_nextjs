import { ADD_REVIEW, GET_REVIEWS, DELETE_REVIEW, REVIEW_ERROR, TOGGLE_FORM } from '../types';

const reviewReducer = (state, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        showForm: action.payload.length === 0,
        isLoading: false,
        errors: null,
      };

    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        isDeletable: true,
        showForm: false,
        isLoading: false,
        errors: null,
      };

    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review._id !== action.payload),
        showForm: false,
        isLoading: false,
        errors: null,
      };

    case TOGGLE_FORM:
      return {
        ...state,
        showForm: !state.showForm,
        isLoading: false,
        errors: null,
      };

    case REVIEW_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default reviewReducer;
