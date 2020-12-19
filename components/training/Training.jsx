import { useEffect, useContext } from 'react';
import Card from '../cards/Card';
import Loader from '../utils/Loader';

import LanguageContext from '../../context/language/languageContext';
import ProfileContext from '../../context/profile/profileContext';

const Training = () => {
  const languageContext = useContext(LanguageContext);
  const profileContext = useContext(ProfileContext);

  const { language } = languageContext;
  const { profile, getProfile, isLoading } = profileContext;

  useEffect(() => {
    getProfile(language);
    // eslint-disable-next-line
  }, [language]);

  if (profile === null || profile.trainings === null || isLoading) {
    return <Loader />;
  }

  return profile.trainings.map((training) => {
    const data = {
      type: 'TRAINING',
      title: training.title,
      description: training.school,
      info: training.location,
      start: training.start,
      end: training.end,
      isCurrent: training.isCurrent,
    };
    return <Card key={training._id} data={data} />;
  });
};

export default Training;
