import { useEffect, useContext } from 'react';
import MilestonePeriod from '../milestones/MilestonePeriod';
import MilestoneAction from '../milestones/MilestoneAction';
import Loader from '../utils/Loader';

import ProfileContext from '../../context/profile/profileContext';

const ExperienceMilestones = () => {
  const profileContext = useContext(ProfileContext);
  const { profile, getProfile, isLoading, language } = profileContext;

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, [language]);

  if (profile === null || profile.experiences === null || isLoading) {
    return <Loader />;
  }

  return (
    <ul className="milestone">
      {profile.experiences.map((experience) => {
        const milestone = {
          type: 'EXPERIENCE',
          title: experience.company,
          info: experience.title,
          description: experience.location,
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

export default ExperienceMilestones;
