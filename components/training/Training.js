import { useEffect, useContext } from 'react';
import Card from '../cards/Card';
import Loader from '../utils/Loader';

import ProfileContext from '../../context/profile/profileContext';

const Training = () => {
  const profileContext = useContext(ProfileContext);
  const { profile, getProfile, isLoading, language } = profileContext;

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, [language]);

  if(profile === null || profile.trainings === null || isLoading) {
    return <Loader />;
  }

  return profile.trainings.map(training => {
    const data = {
      title: training.title,
      description: training.school,
      info: training.location,
      start: training.start,
      end: training.end,
      isCurrent: training.isCurrent
    };
    return <Card key={training._id} data={data} />
  });
}

export default Training;