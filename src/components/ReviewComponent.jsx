import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import FilterShows from "./FilterShows";
import DisplayCard from "./DisplayCard";
import { Col } from "react-bootstrap";
import SearchComponent from './SearchComponent';

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  // const [genres, setGenres] = useState([]);
  // const [dates, setDates] = useState([]);

  useEffect(() => {
    // Here we retrieve reviews from local storage
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(storedReviews);
      // Extract all unique genres and dates from the reviews
      // const uniqueGenres = Array.from(new Set(storedReviews.map(review => review.genre)));
      // const uniqueDates = Array.from(new Set(storedReviews.map(review => review.dateReleased)));
      
      // setGenres(uniqueGenres);
      // setDates(uniqueDates);
  }, []);

  const handleDeleteReview = (index) => {
    // This emoves the selected review from the reviews array in te local storage
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);

    // Update local storage with the updated reviews array
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  // Function to render star icons based on overall rating
  const renderStarIcons = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <FaStar key={i} style={{ display: "inline-block" }} />
      );
    }
    return <div>{stars}</div>;
  };

  return (
    <div>
         <SearchComponent reviews={reviews} handleDeleteReview={handleDeleteReview} renderStarIcons={renderStarIcons} />
      {reviews.length > 0 && <FilterShows shows={reviews} onFilter={(genre, date) => console.log(genre, date)} />}


      <ul className="row flex-nowrap overflow-auto">
        {reviews.map((review, index) => (

          <Col as="li" key={index} xs={12} md={6} lg={4} xl={3} className="mb-3">
            <p className="rating-txt"> Your rating: &nbsp; {renderStarIcons(review.overallRating)} </p> 
            <DisplayCard 
            name={review.name}
            image={{original: review.image}}
            review={review}
            id={review.id}
            buttonName= {"✐ Edit"}
            action={() => <button onClick={() => handleDeleteReview(index)} className="remove-btn">✘ Remove</button>}
            />
          </Col>
        ))}
      </ul>
    </div>
  );
};

export default ReviewComponent;
