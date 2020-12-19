import { TOGGLE_LANGUAGE } from '../types';
import dictionaryLanguages from '../../data/lang';

const languageReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        dictionary: dictionaryLanguages[action.payload],
      };

    default:
      return state;
  }
};

export default languageReducer;
