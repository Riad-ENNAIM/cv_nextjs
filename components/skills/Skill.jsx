import PropTypes from 'prop-types';

const Skill = ({ skill }) => (
  <div className="skill">
    <div className="skill-header container justify-content-space-between">
      <h3 className="skill-title">{skill.title}</h3>

      <i className="fas fa-bars" />
    </div>

    <div className="skill-content">
      {skill.subSkills.map((subSkill) => (
        <div className="skill-item" key={subSkill._id}>
          <i className="fas fa-caret-right" />
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
