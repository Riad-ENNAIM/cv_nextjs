import { useContext } from 'react';

import ProfileContext from '../../context/profile/profileContext';

const DropDownList = () => {
  const profileContext = useContext(ProfileContext);
  const { isTimeline, isDarkMode, language, toggleTimeline, toggleDarkMode, toggleLanguage } = profileContext;

  const changeLang = lang => {
    if(language && lang !== language) {
      toggleLanguage();
    }
  }

  return (
    <>
      <span className="drop-btn">
        <i className="fas fa-cog"></i>
      </span>

      <div className="dropdown-content">
        <div className="switcher">
          <div className="switcher-title">{language === 'en' ? 'Language' : 'Langue'}</div>
            <div className="switcher-body">
              <span
                className={`lang ${language !== 'en' && 'active' }`}
                onClick={() => changeLang('fr')}
              >
                Fr
              </span>
              <span
                className={`lang ${language === 'en' && 'active' }`}
                onClick={() => changeLang('en')}
              >
                Eng
              </span>
            </div>
        </div>

        <div className="switcher">
          <div className="switcher-title">{language === 'en' ? 'Timeline' : 'Chronologie'}</div>
          <div className="switcher-body">
            <label className="switch">
              <input type="checkbox" checked={isTimeline} onChange={toggleTimeline}/>
              <span className="slider" />
            </label>
          </div>
        </div>

        <div className="switcher">
          <div className="switcher-title">{language === 'en' ? 'Dark mode' : 'Mode sombre'}</div>
          <div className="switcher-body">
            <label className="switch">
              <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode}/>
              <span className="slider" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default DropDownList;
