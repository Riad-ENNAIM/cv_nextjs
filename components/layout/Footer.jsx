import { useContext, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';

import LanguageContext from '../../context/language/languageContext';

const Footer = () => {
  const languageContext = useContext(LanguageContext);
  const { language, dictionary, toggleLanguage } = languageContext;

  const [newLanguage, setNewLanguage] = useState(false);

  return (
    <div id="main-footer">
      <a href="mailto:riad.ennaim@gmail.com">
        {dictionary.emailMe}
        &nbsp;&#x1F60E;
      </a>

      <p>
        {dictionary.sourcedOn}
        &nbsp;
        <a href="https://github.com/Riad-ENNAIM/cv">GitHub</a>
      </p>

      <p className="footer-links">
        <a
          href="https://github.com/Riad-ENNAIM/"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <FontAwesomeIcon icon={['fab', 'github']} />
        </a>
        <a
          href="https://www.linkedin.com/in/riad-ennaim/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FontAwesomeIcon icon={['fab', 'linkedin']} />
        </a>
        <a
          href="https://riad-ennaim.github.io/bio/"
          target="_blank"
          rel="noopener noreferrer"
          title="Bio"
        >
          <FontAwesomeIcon icon={faAddressCard} />
        </a>
      </p>

      <p className="footer-copyright">
        &copy;
        <Link href="/">
          <a href="/"> Riad ENNAIM </a>
        </Link>
        {new Date().getFullYear()}
      </p>

      {newLanguage ? (
        <span
          className="footer-lang"
          onClick={toggleLanguage}
          onMouseOut={() => setNewLanguage(!newLanguage)}
          onBlur={() => setNewLanguage(!newLanguage)}
          title={dictionary.switchToOtherLanguage}
          role="checkbox"
          aria-checked="false"
          tabIndex="0"
        >
          <FontAwesomeIcon icon={faGlobeAfrica} />
          {language === 'en' ? ' Français' : ' English'}
        </span>
      ) : (
        <span
          className="footer-lang"
          onMouseOver={() => setNewLanguage(!newLanguage)}
          onFocus={() => setNewLanguage(!newLanguage)}
        >
          <FontAwesomeIcon icon={faGlobeAfrica} />
          {language === 'en' ? ' English' : ' Français'}
        </span>
      )}
    </div>
  );
};

export default Footer;
