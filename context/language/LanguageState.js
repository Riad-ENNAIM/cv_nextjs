import { useReducer } from 'react';
import PropTypes from 'prop-types';
import languageContext from './languageContext';
import languageReducer from './languageReducer';
import { TOGGLE_LANGUAGE } from '../types';
import dictionaryLanguages from '../../data/lang';

const LanguageState = ({ children }) => {
  const initialState = {
    language: 'en',
    dictionary: dictionaryLanguages.en,
  };

  const [state, dispatch] = useReducer(languageReducer, initialState);

  // Toggle Language
  const toggleLanguage = () => {
    const lang = state.language === 'en' ? 'fr' : 'en';
    // localStorage.setItem('language', JSON.stringify(lang));

    dispatch({
      type: TOGGLE_LANGUAGE,
      payload: lang,
    });
  };

  return (
    <languageContext.Provider
      value={{
        language: state.language,
        dictionary: state.dictionary,
        toggleLanguage,
      }}
    >
      {children}
    </languageContext.Provider>
  );
};

LanguageState.propTypes = {
  children: PropTypes.object.isRequired,
};

export default LanguageState;
