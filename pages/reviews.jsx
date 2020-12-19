import { useEffect, useRef } from 'react';
import Reviews from '../components/reviews/Reviews';

const ReviewsPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current.getBoundingClientRect().top <= 0) {
      pageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="page container-column" ref={pageRef}>
      <Reviews />
    </div>
  );
};

export default ReviewsPage;
