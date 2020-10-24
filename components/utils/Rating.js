import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Rating = ({ rating, isActive, onClickStar }) => {
  useEffect(() => {
    getStars();
    // eslint-disable-next-line
  }, [rating])

  const [stars, setStars] = useState(null);

  const getStars = () => {
    const starsArray = [];

    if( isActive && rating === 0) {
      // Simple Stars for active rating
      for(let i = 0; i < 5; i++) {
        starsArray.push(<i key={i} className="far fa-star" onMouseOver={() => hoverOnStar(i)} onClick={() => onClick(i)}></i>);
      }
    } else {
      const trunc = Math.trunc(rating) <= 5 ? Math.trunc(rating) : 5;
  
      // Filled stars
      for(let i = 0; i < trunc; i++) {
        starsArray.push(<i key={i} className="fas fa-star"></i>);
      }
  
      if(rating < 5 ){
        // Half star
        if(rating > trunc) {
          starsArray.push(<i key={trunc} className="fas fa-star-half-alt"></i>);
        }
    
        // Simple Stars
        if(Math.ceil(rating) < 5) {
          for(let i = Math.ceil(rating); i < 5; i++) {
            starsArray.push(<i key={i} className="far fa-star"></i>);
          }
        }
      }
    }

    setStars(starsArray);
  }

  const hoverOnStar = index => {
    if(isActive) {
      const starsArray = [];

      // Filled stars
      for(let i = 0; i < index + 1; i++) {
        starsArray.push(<i key={i} className="fas fa-star" onMouseOver={() => hoverOnStar(i)} onClick={() => onClick(i)}></i>);
      }
      // Simple Stars
      for(let i = index + 1; i < 5; i++) {
        starsArray.push(<i key={i} className="far fa-star" onMouseOver={() => hoverOnStar(i)} onClick={() => onClick(i)}></i>);
      }

      setStars(starsArray);
    }
  }

  const onMouseOut = () => {
    if(isActive) {
      const starsArray = [];

      if(rating === 0) {
        // Simple Stars
        for(let i = 0; i < 5; i++) {
          starsArray.push(<i key={i} className="far fa-star" onMouseOver={() => hoverOnStar(i)} onClick={() => onClick(i)}></i>);
        }
      } else {
        // Filled stars
        for(let i = 0; i < rating; i++) {
          starsArray.push(<i key={i} className="fas fa-star" onMouseOver={() => hoverOnStar(i)} onClick={() => onClick(i)}></i>);
        }
  
        // Simple Stars
        for(let i = rating; i < 5; i++) {
          starsArray.push(<i key={i} className="far fa-star" onMouseOver={() => hoverOnStar(i)} onClick={() => onClick(i)}></i>);
        }
      }

      setStars(starsArray);
    }
  }

  const onClick = index => onClickStar(index);

  return (
    <div className={`rating ${isActive && 'active'}`} onMouseOut={onMouseOut}>
      {
        stars
      }
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClickStar: PropTypes.func
};

Rating.defaultProps = {
  rating: 0,
  isActive: false
};

export default Rating;
