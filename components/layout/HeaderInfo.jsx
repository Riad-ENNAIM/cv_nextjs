import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuoteLeft,
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';

const HeaderInfo = ({ profile }) => (
  <div className="main-info">
    <div className="info-group">
      <FontAwesomeIcon icon={faQuoteLeft} />
      <p className="description">{profile.description}</p>
    </div>

    <div className="info-group">
      <FontAwesomeIcon icon={faMapMarkerAlt} />
      <p>{profile.location}</p>
    </div>

    <div className="info-group">
      <FontAwesomeIcon icon={faEnvelope} />
      <p>{profile.email}</p>
    </div>

    <div className="info-group">
      <FontAwesomeIcon icon={faPhoneAlt} />
      <p>{profile.phone}</p>
    </div>
  </div>
);

HeaderInfo.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default HeaderInfo;
