import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import LanguageContext from '../../context/language/languageContext';
import ProfileContext from '../../context/profile/profileContext';

const DropDownList = () => {
  const languageContext = useContext(LanguageContext);
  const profileContext = useContext(ProfileContext);

  const { language, dictionary, toggleLanguage } = languageContext;
  const { isTimeline, isDarkMode, toggleTimeline, toggleDarkMode } = profileContext;

  const changeLang = (newLanguage) => {
    if (language && newLanguage !== language) {
      toggleLanguage();
    }
  };

  return (
    <>
      <span className="drop-btn">
        <FontAwesomeIcon icon={faCog} />
      </span>

      <div className="dropdown-content">
        <div className="switcher">
          <div className="switcher-title">{dictionary.languageSwitcher}</div>
          <div className="switcher-body">
            <span
              className={`lang ${language !== 'en' && 'active'}`}
              onClick={() => changeLang('fr')}
              role="checkbox"
              aria-checked="false"
              tabIndex="0"
            >
              Fr
            </span>
            <span
              className={`lang ${language === 'en' && 'active'}`}
              onClick={() => changeLang('en')}
              role="checkbox"
              aria-checked="false"
              tabIndex="0"
            >
              Eng
            </span>
          </div>
        </div>

        <div className="switcher">
          <div className="switcher-title">{dictionary.timelineSwitcher}</div>
          <div className="switcher-body">
            <label className="switch" htmlFor="timelineCheckbox">
              <input
                type="checkbox"
                checked={isTimeline}
                onChange={toggleTimeline}
                id="timelineCheckbox"
              />
              <span className="slider" />
            </label>
          </div>
        </div>

        <div className="switcher">
          <div className="switcher-title">{dictionary.darkModeSwitcher}</div>
          <div className="switcher-body">
            <label className="switch" htmlFor="darkModeCheckbox">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                id="darkModeCheckbox"
              />
              <span className="slider" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDownList;
