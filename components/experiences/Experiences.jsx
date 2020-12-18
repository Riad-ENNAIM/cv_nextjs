import { useEffect, useContext } from 'react';
import Card from '../cards/Card';
import Loader from '../utils/Loader';

import ProfileContext from '../../context/profile/profileContext';

const Experiences = () => {
  const profileContext = useContext(ProfileContext);
  const { profile, getProfile, isLoading, language } = profileContext;

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, [language]);

  if (profile === null || profile.experiences === null || isLoading) {
    return <Loader />;
  }

  return profile.experiences.map((experience) => {
    const data = {
      type: 'EXPERIENCE',
      title: experience.title,
      description: experience.company,
      info: experience.location,
      start: experience.start,
      end: experience.end,
      isCurrent: experience.isCurrent,
      notes: experience.tasks,
      supplements: experience.technologies,
    };
    return <Card key={experience._id} data={data} />;
  });
};

export default Experiences;
