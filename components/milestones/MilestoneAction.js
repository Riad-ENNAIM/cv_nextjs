import PropTypes from 'prop-types';
import useFormatDate from '../../hooks/useFormatDate';

const MilestoneAction = ({ milestone }) => {
  const start = useFormatDate(milestone.start);

  return (
    <li className={`milestone-action ${milestone.isCurrent && 'current-milestone'}`}>
      <span className="point" />
      <div>
        <div className="title">{milestone.title}</div>
        <div className="info">{milestone.info}</div>
        <div className="type">{milestone.type}</div>
      </div>
      <span className="number">
        <span>{start}</span>
      </span>

      {
        milestone.isCurrent &&
        <div className="tag-flash">En cours</div>
      }
    </li>
  );
}

MilestoneAction.propTypes = {
  milestone: PropTypes.object.isRequired
};

export default MilestoneAction;
