// import styles from '../styles/Home.module.css'
import { useContext, useEffect, useRef } from 'react';
import Experiences from '../components/experiences/Experiences';
import ExperienceMilestones from '../components/experiences/ExperienceMilestones';

import ProfileContext from '../context/profile/profileContext';

const Index = () => {
  const profileContext = useContext(ProfileContext);

  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current.getBoundingClientRect().top <= 0) {
      pageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (profileContext.isTimeline) {
    return (
      <div className="page container justify-content-center" ref={pageRef}>
        <ExperienceMilestones />
      </div>
    );
  }

  return (
    <div className="page container-column" ref={pageRef}>
      <Experiences />
    </div>
  );
};

export default Index;
