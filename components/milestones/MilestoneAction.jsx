import { useContext } from 'react';
import PropTypes from 'prop-types';
import useFormatDate from '../../hooks/useFormatDate';

import LanguageContext from '../../context/language/languageContext';

const MilestoneAction = ({ milestone }) => {
  const languageContext = useContext(LanguageContext);
  const { dictionary } = languageContext;

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
          {milestone.type === 'TRAINING' ? dictionary.inProgress : dictionary.current}
        </div>
      )}
    </li>
  );
};

MilestoneAction.propTypes = {
  milestone: PropTypes.object.isRequired,
};

export default MilestoneAction;
