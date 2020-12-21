import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Skill = ({ skill }) => (
  <div className="skill">
    <div className="skill-header container justify-content-space-between">
      <h3 className="skill-title">{skill.title}</h3>
      <FontAwesomeIcon icon={faBars} />
    </div>

    <div className="skill-content">
      {skill.subSkills.map((subSkill) => (
        <div className="skill-item" key={subSkill._id}>
          <FontAwesomeIcon icon={faCaretRight} />
          <p>{subSkill.title}</p>
        </div>
      ))}
    </div>
  </div>
);

Skill.propTypes = {
  skill: PropTypes.object.isRequired,
};

export default Skill;
