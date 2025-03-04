import React from "react";

interface RatingProps {
  value: number;
  text?: string;
  color?: string;
}

const Rating: React.FC<RatingProps> = ({ value, text, color = "#f8e825" }) => {
  const renderStar = (star: number) => {
    if (value >= star) {
      return <i style={{ color }} className="fas fa-star" />;
    } else if (value >= star - 0.5) {
      return <i style={{ color }} className="fas fa-star-half-alt" />;
    } else {
      return <i style={{ color }} className="far fa-star" />;
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <span>{renderStar(1)}</span>
      <span>{renderStar(2)}</span>
      <span>{renderStar(3)}</span>
      <span>{renderStar(4)}</span>
      <span>{renderStar(5)}</span>
      {text && <span className="ml-2">{text}</span>}
    </div>
  );
};

export default Rating;
