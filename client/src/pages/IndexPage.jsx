import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      console.log(data);
      setPlaces(data);
    });
  }, []);
  return (
    <div className="mt-8 grid  gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link key={place._id} to={'/place/'+place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.addedPhotos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={
                    "http://localhost:4000/uploads/" + place.addedPhotos?.[0]
                  }
                  alt=""
                />
              )}
            </div>
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm text-gray-500"> {place.title}</h2>
            <div className="mt-1">
              <span className="bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
