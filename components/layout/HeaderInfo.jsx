import PropTypes from 'prop-types';

const HeaderInfo = ({ profile }) => (
  <div className="main-info">
    <div className="info-group">
      <i className="fas fa-quote-left" />
      <p className="description">{profile.description}</p>
    </div>

    <div className="info-group">
      <i className="fas fa-map-marker-alt" />
      <p>{profile.location}</p>
    </div>

    <div className="info-group">
      <i className="fas fa-envelope" />
      <p>{profile.email}</p>
    </div>

    <div className="info-group">
      <i className="fas fa-phone-alt" />
      <p>{profile.phone}</p>
    </div>
  </div>
);

HeaderInfo.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default HeaderInfo;
