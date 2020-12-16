import { useEffect, useRef } from 'react';
import Skills from '../components/skills/Skills';

const SkillsPage = () => {
  const pageRef = useRef(null)

  useEffect(() => {
    if(pageRef.current.getBoundingClientRect().top <= 0) {
      pageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="page container-column" ref={pageRef}>
      <Skills />
    </div>
  );
}

export default SkillsPage;
