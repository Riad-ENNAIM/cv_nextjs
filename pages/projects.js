import { useContext, useEffect, useRef } from 'react';
import Projects from '../components/projects/Projects';
import ProjectMilestones from '../components/projects/ProjectMilestones';

import ProfileContext from '../context/profile/profileContext';

const ProjectsPage = () => {
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
        <ProjectMilestones />
      </div>
    );
  }

  return (
    <div className="page container-column" ref={pageRef}>
      <Projects />
    </div>
  );
}

export default ProjectsPage;
