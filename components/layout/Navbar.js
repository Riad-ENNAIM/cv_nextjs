import { useEffect, useState, useContext, useRef } from 'react';
import ActiveLink from '../utils/ActiveLink';
import DropDownList from './DropDownList';

import ProfileContext from '../../context/profile/profileContext';

const Navbar = () => {
  const profileContext = useContext(ProfileContext);
  const { language } = profileContext;

  const [sticky, setSticky] = useState(false);

  const navRef = useRef(null);

  const handleScroll = () => {
    if (navRef.current) {
      setSticky(navRef.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <nav id="navbar" className={sticky ? 'navbar-sticky' : ''} ref={navRef}>
      <ul>
        <li>
          <DropDownList />
        </li>
        <li>
          <ActiveLink href="/" activeClassName="active">
            <a>{language === 'en' ? 'Experience' : 'Expérience'}</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/projects" activeClassName="active">
            <a>{language === 'en' ? 'Projects' : 'Projets'}</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/skills" activeClassName="active">
            <a>{language === 'en' ? 'Skills' : 'Compétence'}</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/training" activeClassName="active">
            <a>{language === 'en' ? 'Training' : 'Formation'}</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/reviews" activeClassName="active">
            <a>{language === 'en' ? 'Reviews' : 'Commentaires'}</a>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
