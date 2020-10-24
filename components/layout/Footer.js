import { useContext, useState } from 'react';
import Link from 'next/link';

import ProfileContext from '../../context/profile/profileContext';

export const Footer = () => {
  const profileContext = useContext(ProfileContext);
  const { language, toggleLanguage } = profileContext;

  const [newLanguage, setNewLanguage] = useState(false);

  return (
    <div id="main-footer">
      <a href="mailto:riad.ennaim@gmail.com">
        { language === 'en' ? 'Send me a mail for a new collaboration' : 'Envoyez-moi un mail pour une nouvelle collaboration' }
        &nbsp;&#x1F60E;
      </a>

      <p>
        { language === 'en' ? 'Sourced on' : 'Source sur' }
        &nbsp;
        <a href="https://github.com/Riad-ENNAIM/cv">GitHub</a>
      </p>

      <p className="footer-links">
        <a href="https://github.com/Riad-ENNAIM/" target="_blank" rel="noopener noreferrer" title="GitHub">
          <i aria-hidden className="fab fa-github-square"></i>
        </a>
        <a href="https://www.linkedin.com/in/riad-ennaim/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <i aria-hidden className="fab fa-linkedin"></i>
        </a>
        <a href="https://riad-ennaim.github.io/bio/" target="_blank" rel="noopener noreferrer" title="Bio">
          <i aria-hidden className="fas fa-address-card"></i>
        </a>
      </p>

      <p className="footer-copyright">
        &copy; 
        <Link href="/"><a> Riad ENNAIM </a></Link>
        {new Date().getFullYear()}
      </p>

      {
        newLanguage ?
          <span
            className="footer-lang"
            onClick={toggleLanguage}
            onMouseOut={() => setNewLanguage(!newLanguage)}
            title={ language === 'en' ? 'Passer au Français' : 'Switch to English' }
          >
            <i aria-hidden className="fas fa-globe-africa"></i>
            { language === 'en' ? ' Français' : ' English' }
          </span>
        :
          <span className="footer-lang" onMouseOver={() => setNewLanguage(!newLanguage)}>
            <i aria-hidden className="fas fa-globe-africa"></i>
            { language === 'en' ? ' English' : ' Français' }
          </span>
      }
    </div>
  );
}

export default Footer;
