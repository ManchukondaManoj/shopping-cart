import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
interface RatingProps {
  value: number;
  text?: string;
  color?: string;
}

const Rating: React.FC<RatingProps> = ({ value, text, color = "#f8e825" }) => {
  const renderStar = (star: number) => {
    if (value >= star) {
      return <FontAwesomeIcon style={{ color }} icon={faStar} />;
    } else if (value >= star - 0.5) {
      return <FontAwesomeIcon style={{ color }} icon={faStarHalfAlt} />;
    } else {
      return <FontAwesomeIcon style={{ color }} icon={faStarRegular} />;
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
