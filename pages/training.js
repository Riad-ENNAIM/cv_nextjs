import {useContext, useEffect, useRef } from 'react';
import Training from '../components/training/Training';
import TrainingMilestones from '../components/training/TrainingMilestones';

import ProfileContext from '../context/profile/profileContext';

const TrainingPage = () => {
  const profileContext = useContext(ProfileContext);

  const pageRef = useRef(null)

  useEffect(() => {
    if(pageRef.current.getBoundingClientRect().top <= 0) {
      pageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if(profileContext.isTimeline) {
    return (
      <div className="page container justify-content-center" ref={pageRef}>
        <TrainingMilestones />
      </div>
    );
  }

  return (
    <div className="page container-column" ref={pageRef}>
      <Training />
    </div>
  );
}

export default TrainingPage;