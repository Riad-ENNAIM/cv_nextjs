import { useEffect, useContext } from 'react';
import Card from '../cards/Card';
import Loader from '../utils/Loader';

import LanguageContext from '../../context/language/languageContext';
import ProfileContext from '../../context/profile/profileContext';

const Projects = () => {
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

  return profile.projects.map((project) => {
    const data = {
      type: 'PROJECT',
      title: project.title,
      description: project.client,
      info: project.technology,
      start: project.start,
      end: project.end,
      isCurrent: project.isCurrent,
      notes: project.tasks,
    };
    return <Card key={project._id} data={data} />;
  });
};

export default Projects;
