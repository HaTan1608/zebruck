import React, { useEffect, useState } from "react";
import { BsFillStarFill, BsStar } from "react-icons/bs";
const Rating = ({ sendRateChild }) => {
  const sendRate = () => {
    sendRateChild(rateReviews);
  };
  const [rateReviews, setRateReviews] = useState(0);
  const rating1 = (number) => {
    let container = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= number) {
        container.push(
          <div onMouseOver={() => setRateReviews(i)} key={i}>
            <BsFillStarFill
              size={20}
              color="#df2189"
              className="reviews__body__contents__info__rating__icon"
            />
          </div>
        );
      } else {
        container.push(
          <div onMouseOver={() => setRateReviews(i)} key={i}>
            <BsStar
              size={20}
              color="#df2189"
              className="reviews__body__contents__info__rating__icon"
            />
          </div>
        );
      }
    }
    return container;
  };
  useEffect(() => {
    sendRate();
  }, [rateReviews]);
  return <>{rating1(rateReviews)}</>;
};
export default Rating;
