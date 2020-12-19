import { useEffect, useContext } from 'react';
import MilestonePeriod from '../milestones/MilestonePeriod';
import MilestoneAction from '../milestones/MilestoneAction';
import Loader from '../utils/Loader';

import LanguageContext from '../../context/language/languageContext';
import ProfileContext from '../../context/profile/profileContext';

const ProjectMilestones = () => {
  const languageContext = useContext(LanguageContext);
  const profileContext = useContext(ProfileContext);

  const { language } = languageContext;
  const { profile, getProfile, isLoading } = profileContext;

  useEffect(() => {
    getProfile(language);
    // eslint-disable-next-line
  }, [language]);

  if (profile === null || profile.projects === null || isLoading) {
    return <Loader />;
  }

  return (
    <ul className="milestone">
      {profile.projects.map((experience) => {
        const milestone = {
          type: 'PROJECT',
          title: experience.client,
          info: experience.title,
          description: experience.technology,
          start: experience.start,
          isCurrent: experience.isCurrent,
        };

        if (experience.end) {
          milestone.end = experience.end;
          return <MilestonePeriod key={experience._id} milestone={milestone} />;
        }

        return <MilestoneAction key={experience._id} milestone={milestone} />;
      })}
    </ul>
  );
};

export default ProjectMilestones;
