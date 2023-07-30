import "../css/rating.css"
const Rating = ({ value, max }) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < max; i++) {
        const starClass = i < value ? 'star filled' : 'star empty';
        stars.push(<span key={i} className={starClass}> &#9733;</span>);
      }
      return stars;
    };
  
    return <div className="rating">{renderStars()}</div>;
  };
  export default Rating