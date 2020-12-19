import { useEffect, useState, useContext, useRef } from 'react';
import ActiveLink from '../utils/ActiveLink';
import DropDownList from './DropDownList';

import LanguageContext from '../../context/language/languageContext';

const Navbar = () => {
  const languageContext = useContext(LanguageContext);
  const { dictionary } = languageContext;

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
            <a href="/">{dictionary.experience}</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/projects" activeClassName="active">
            <a href="/projects">{dictionary.projects}</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/skills" activeClassName="active">
            <a href="/skills">{dictionary.skills}</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/training" activeClassName="active">
            <a href="/training">{dictionary.training}</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/reviews" activeClassName="active">
            <a href="/reviews">{dictionary.reviews}</a>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
