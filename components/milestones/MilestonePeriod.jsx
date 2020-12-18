import { useContext } from 'react';
import PropTypes from 'prop-types';
import useFormatDate from '../../hooks/useFormatDate';
import MilestoneAction from './MilestoneAction';

import ProfileContext from '../../context/profile/profileContext';

const MilestonePeriod = ({ milestone }) => {
  const profileContext = useContext(ProfileContext);
  const { language } = profileContext;

  const start = useFormatDate(milestone.start);
  const end = useFormatDate(milestone.end);

  if (!end) {
    return <MilestoneAction milestone={milestone} />;
  }

  return (
    <li className={`milestone-period ${milestone.isCurrent && 'current-milestone'}`}>
      <span />
      <div>
        <div className="title">{milestone.title}</div>
        <div className="info">{milestone.info}</div>
        <div className="description">{milestone.description}</div>
      </div>
      <span className="number">
        <span>{end}</span>
        <span>{start}</span>
      </span>

      {milestone.isCurrent && (
        <div className="tag-flash">
          {language === 'en'
            ? milestone.type === 'TRAINING'
              ? 'In progress'
              : 'Current'
            : 'En cours'}
        </div>
      )}
    </li>
  );
};

MilestonePeriod.propTypes = {
  milestone: PropTypes.object.isRequired,
};

export default MilestonePeriod;
