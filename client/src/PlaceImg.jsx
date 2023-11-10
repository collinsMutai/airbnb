import React from "react";

const PlaceImg = ({ place, index = 0, className }) => {
  console.log(place);
  if (!place.addedphotos?.length ) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads/" + place.addedPhotos[0]}
      alt=""
    />
  );
};

export default PlaceImg;
