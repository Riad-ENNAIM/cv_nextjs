import { useReducer } from 'react';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import {
  GET_PROFILE,
  TOGGLE_TIMELINE,
  TOGGLE_DARK_MODE,
  TOGGLE_LANGUAGE
} from '../types';
import { frProfile, engProfile } from '../../data/profile';

const ProfileState = props => {
  const initialState = {
    profile: null,
    serchResult: null,
    isTimeline: false,
    isDarkMode: false,
    language:  'en',
    isLoading: true
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);

  // Get Profile
  const getProfile = async () => {
    const profile = state.language === 'en' ? engProfile : frProfile;

    dispatch({
      type: GET_PROFILE,
      payload: profile
    });
  }

  // Toggle Timeline
  const toggleTimeline = () => {
    localStorage.setItem('isTimeline', JSON.stringify(!state.isTimeline));

    dispatch({ type: TOGGLE_TIMELINE });
  }

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    localStorage.setItem('isDarkMode', JSON.stringify(!state.isDarkMode));

    dispatch({ type: TOGGLE_DARK_MODE });
  }

  // Toggle Language
  const toggleLanguage = () => {
    const lang = state.language === 'en' ? 'fr' : 'en';
    localStorage.setItem('language', JSON.stringify(lang));

    dispatch({ 
      type: TOGGLE_LANGUAGE,
      payload: lang
    });
  }
  
  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        serchResult: state.serchResult,
        isTimeline: state.isTimeline,
        isDarkMode: state.isDarkMode,
        language: state.language,
        getProfile,
        toggleTimeline,
        toggleDarkMode,
        toggleLanguage
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
