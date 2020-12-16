import PropTypes from 'prop-types';
import useFormatDate from '../../hooks/useFormatDate';
import MilestoneAction from './MilestoneAction';

const MilestonePeriod = ({ milestone }) => {
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
        <div className="type">{milestone.type}</div>
      </div>
      <span className="number">
        <span>{end}</span>
        <span>{start}</span>
      </span>

      {milestone.isCurrent && <div className="tag-flash">En cours</div>}
    </li>
  );
};

MilestonePeriod.propTypes = {
  milestone: PropTypes.object.isRequired,
};

export default MilestonePeriod;
