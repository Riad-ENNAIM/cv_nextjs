import { useContext } from 'react';
import PropTypes from 'prop-types';

import ProfileContext from '../../context/profile/profileContext';

const HeaderTitle = ({ profile }) => {
  const profileContext = useContext(ProfileContext);
  const { language } = profileContext;

  return (
    <div className="main-title">
      <img src="/images/riad.jpg" alt="Riad ENNAIM" />
      <h1>{profile.name}</h1>
      <h2>{profile.title}</h2>

      <div className="links container justify-content-center">
        <a
          href={profile.links[0].path}
          target="_blank"
          rel="noopener noreferrer"
          title={profile.links[0].name}
        >
          <i className="fab fa-github-square" />
        </a>
        <a
          href={profile.links[1].path}
          target="_blank"
          rel="noopener noreferrer"
          title={profile.links[1].name}
        >
          <i className="fab fa-linkedin" />
        </a>
        <a
          href={profile.links[2].path}
          target="_blank"
          rel="noopener noreferrer"
          title={profile.links[2].name}
        >
          <i className="fas fa-address-card" />
        </a>
        <a
          href="/pdf/Riad-ENNAIM.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title={language === 'en' ? 'Download PDF' : 'Télécharger PDF'}
        >
          <i className="fas fa-cloud-download-alt" />
        </a>
      </div>
    </div>
  );
};

HeaderTitle.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default HeaderTitle;
