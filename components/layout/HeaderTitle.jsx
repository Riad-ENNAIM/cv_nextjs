import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

import LanguageContext from '../../context/language/languageContext';

const HeaderTitle = ({ profile }) => {
  const languageContext = useContext(LanguageContext);
  const { dictionary } = languageContext;

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
          <FontAwesomeIcon icon={['fab', 'github-square']} />
        </a>
        <a
          href={profile.links[1].path}
          target="_blank"
          rel="noopener noreferrer"
          title={profile.links[1].name}
        >
          <FontAwesomeIcon icon={['fab', 'linkedin']} />
        </a>
        <a
          href={profile.links[2].path}
          target="_blank"
          rel="noopener noreferrer"
          title={profile.links[2].name}
        >
          <FontAwesomeIcon icon={faAddressCard} />
        </a>
        <a
          href="/pdf/Riad-ENNAIM.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title={dictionary.downloadPdfLinkTitle}
        >
          <FontAwesomeIcon icon={faCloudDownloadAlt} />
        </a>
      </div>
    </div>
  );
};

HeaderTitle.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default HeaderTitle;
