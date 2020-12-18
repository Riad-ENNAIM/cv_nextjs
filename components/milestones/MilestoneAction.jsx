import { useContext } from 'react';
import PropTypes from 'prop-types';
import useFormatDate from '../../hooks/useFormatDate';

import ProfileContext from '../../context/profile/profileContext';

const MilestoneAction = ({ milestone }) => {
  const profileContext = useContext(ProfileContext);
  const { language } = profileContext;

  const start = useFormatDate(milestone.start);

  return (
    <li className={`milestone-action ${milestone.isCurrent && 'current-milestone'}`}>
      <span className="point" />
      <div>
        <div className="title">{milestone.title}</div>
        <div className="info">{milestone.info}</div>
        <div className="description">{milestone.description}</div>
      </div>
      <span className="number">
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

MilestoneAction.propTypes = {
  milestone: PropTypes.object.isRequired,
};

export default MilestoneAction;
