import { useContext } from 'react';
import PropTypes from 'prop-types';
import useFormatDate from '../../hooks/useFormatDate';
import Notes from './Notes';

import ProfileContext from '../../context/profile/profileContext';

const Card = ({ data }) => {
  const profileContext = useContext(ProfileContext);
  const { language } = profileContext;

  const start = useFormatDate(data.start);
  const end = useFormatDate(data.end);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{data.title}</h3>
        {data.isCurrent && <span className="tag-flash">En cours</span>}
      </div>

      <div className="card-body">
        <span className="card-description">{data.description}</span>

        <div className="wrapper">
          {(start || end) && (
            <span className="card-date tag">
              {start && !end
                ? `${language === 'en' ? 'Since' : 'Depuis'} ${start}`
                : start && end
                ? start
                : ''}
              {end && start
                ? ` ${language === 'en' ? 'to' : 'à'} ${end}`
                : end && !start
                ? end
                : ''}
            </span>
          )}

          {data.info && <span className="card-info tag">{data.info}</span>}
        </div>

        <div className="container wrapper">
          {data.supplements &&
            data.supplements.map((supplement) => (
              <span key={supplement._id} className="card-info tag">
                {supplement.text}
              </span>
            ))}
        </div>

        {data.notes && <Notes notes={data.notes} />}
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Card;
