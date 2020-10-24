import PropTypes from 'prop-types';

const HeaderInfo = ({ profile }) => {
  return (
    <div className="main-info">
      <div className="info-group">
        <i className="fas fa-quote-left"></i>
        <p className="description">
          {profile.description}
        </p>
      </div>

      <div className="info-group">
        <i className="fas fa-map-marker-alt"></i>
        <p>
          {profile.location} 
        </p>
      </div>

      <div className="info-group">
        <i className="fas fa-envelope"></i>
        <p>
          {profile.email} 
        </p>
      </div>

      <div className="info-group">
        <i className="fas fa-phone-alt"></i>
        <p>
          {profile.phone} 
        </p>
      </div>
    </div>
  );
}

HeaderInfo.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default HeaderInfo;
