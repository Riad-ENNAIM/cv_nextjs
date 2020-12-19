import { useEffect, useContext, useState } from 'react';
import Skill from './Skill';
import Loader from '../utils/Loader';

import LanguageContext from '../../context/language/languageContext';
import ProfileContext from '../../context/profile/profileContext';

const Skills = () => {
  const languageContext = useContext(LanguageContext);
  const profileContext = useContext(ProfileContext);

  const { language, dictionary } = languageContext;
  const { profile, getProfile, isLoading } = profileContext;

  const [skillLevels, setSkillLevels] = useState([]);

  useEffect(() => {
    getProfile(language);
    // eslint-disable-next-line
  }, [language]);

  const initializeSkills = () => {
    if (profile?.skills?.length > 0) {
      const maxLevel = profile.skills.reduce(
        (acc, skill) => (skill.level > acc ? skill.level : acc),
        0
      );

      const newSkillLeves = [];

      for (let i = 0; i < maxLevel; i++) {
        const newSkillLevel = {
          level: i + 1,
          skills: profile.skills.filter((skill) => skill.level === i + 1),
        };

        newSkillLeves.push(newSkillLevel);
      }

      setSkillLevels(newSkillLeves);
    }
  };

  useEffect(() => {
    initializeSkills();
    // eslint-disable-next-line
  }, [profile]);

  if (profile === null || profile.skills === null || isLoading) {
    return <Loader />;
  }

  return skillLevels.map((skillLevel) => (
    <div className="wrapper justify-skills" key={skillLevel.level}>
      <div className="skill-level">
        {dictionary.level}
        {skillLevel.level}
      </div>
      {skillLevel.skills.map((skill) => (
        <Skill key={skill._id} skill={skill} />
      ))}
    </div>
  ));
};

export default Skills;
