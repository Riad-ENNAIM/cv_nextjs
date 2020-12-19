import { useEffect, useContext } from 'react';
import HeaderTitle from './HeaderTitle';
import HeaderInfo from './HeaderInfo';
import HeaderRating from './HeaderRating';
import Navbar from './Navbar';
import Loader from '../utils/Loader';

import LanguageContext from '../../context/language/languageContext';
import ProfileContext from '../../context/profile/profileContext';

const Header = () => {
  const languageContext = useContext(LanguageContext);
  const profileContext = useContext(ProfileContext);

  const { language } = languageContext;
  const { profile, isDarkMode, isLoading, getProfile } = profileContext;

  useEffect(() => {
    getProfile(language);

    if (isDarkMode) {
      document.documentElement.style.setProperty('--background-color', '#1B2631');
      document.documentElement.style.setProperty('--primary-color', '#D6DBDF');
      document.documentElement.style.setProperty('--dark-color', '#FFFFFF');
      document.documentElement.style.setProperty('--light-color-degree1', '#17202A');
      document.documentElement.style.setProperty('--light-color-degree2', '#5D6D7E');
      document.documentElement.style.setProperty('--light-color-degree3', '#777777');
      document.documentElement.style.setProperty('--btn-primary-background', '#34495E');
      document.documentElement.style.setProperty('--btn-primary-color', '#D6DBDF');
      document.documentElement.style.setProperty('--btn-disabled-background', '#D6DBDF');
      document.documentElement.style.setProperty('--btn-disabled-color', '#AEB6BF');
      document.documentElement.style.setProperty('--checked-color', '#17202A');
      document.documentElement.style.setProperty('--unchecked-color', '#AEB6BF');
    } else {
      document.documentElement.removeAttribute('style');
    }

    // eslint-disable-next-line
  }, [isDarkMode, language]);

  if (profile === null || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div id="main-header">
        <HeaderTitle profile={profile} />
        <HeaderInfo profile={profile} />
        <HeaderRating />

        <div className="show-more">
          <i className="fas fa-chevron-down" />
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Header;
