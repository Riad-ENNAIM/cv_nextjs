import { TOGGLE_LANGUAGE } from '../types';
import dictionaryList from '../../data/lang';

const languageReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        dictionary: dictionaryList[action.payload],
      };

    default:
      return state;
  }
};

export default languageReducer;
