import { useContext, useState } from 'react';
import Link from 'next/link';

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
          <i aria-hidden className="fab fa-github-square" />
        </a>
        <a
          href="https://www.linkedin.com/in/riad-ennaim/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <i aria-hidden className="fab fa-linkedin" />
        </a>
        <a
          href="https://riad-ennaim.github.io/bio/"
          target="_blank"
          rel="noopener noreferrer"
          title="Bio"
        >
          <i aria-hidden className="fas fa-address-card" />
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
          <i aria-hidden className="fas fa-globe-africa" />
          {language === 'en' ? ' Français' : ' English'}
        </span>
      ) : (
        <span
          className="footer-lang"
          onMouseOver={() => setNewLanguage(!newLanguage)}
          onFocus={() => setNewLanguage(!newLanguage)}
        >
          <i aria-hidden className="fas fa-globe-africa" />
          {language === 'en' ? ' English' : ' Français'}
        </span>
      )}
    </div>
  );
};

export default Footer;
