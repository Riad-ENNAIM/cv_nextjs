import { GET_PROFILE, TOGGLE_TIMELINE, TOGGLE_DARK_MODE } from '../types';

const profileReducer = (state, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };

    case TOGGLE_TIMELINE:
      return {
        ...state,
        isTimeline: !state.isTimeline,
      };

    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };

    default:
      return state;
  }
};

export default profileReducer;
