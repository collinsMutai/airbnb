import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../Perks";

import PhotosUploader from "../PhotosUploader";

import { UserContext } from "../UserContext";

const PlacesPage = () => {
  const { action } = useParams();
  // console.log(action);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const [photoLink, setPhotoLink] = useState("");

  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  const [redirect, setRedirect] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  useEffect(() => {
    if (action === "new" || action === undefined) {
      return;
    }
    axios.get("/places/" + action).then((res) => {
      const { data } = res;
      // console.log(res);
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.addedPhotos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [action]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  const { user, setUser } = useContext(UserContext);
  // console.log(user, 'places page');
  async function savePlace(ev) {
    ev.preventDefault();

 if(action === "new"){
      const { data } = await axios.post("/places", {
        owner: user["_id"],
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      setRedirect("/account/places");
    } else if  (action !== "new" || action !== undefined) {
      const { data } = await axios.put("/places/" + action, {
        owner: user["_id"],
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      setRedirect("/account/places");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white";
    } else {
      classes += "bg-gray-200";
    }
    return classes;
  }
  return (
    <div>
      {action == undefined && (
        <>
          <div className="text-center">
            list of all added places
            <br />
            <Link
              className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
              to={"/account/places/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new place
            </Link>
          </div>
          <div className="mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  className="flex gap-4 cursor-pointer bg-gray-100 p-4 mb-4 rounded-2xl"
                >
                  <div className="flex bg-gray-300 w-32 h-32 grow-0 shrink-0">
                    {place.addedPhotos.length > 0 && (
                      <img
                        className="object-cover"
                        src={
                          "http://localhost:4000/uploads/" +
                          place.addedPhotos[0]
                        }
                        alt=""
                      />
                    )}
                  </div>
                  <div className="grow shrink-0">
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
      {(action === "new" || action !== undefined) && (
        <>
          <nav className="w-full flex justify-center mt-8 gap-2 mb-12">
            <Link className={linkClasses("profile")} to={"/account"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              My profile
            </Link>
            <Link className={linkClasses("bookings")} to={"/account/bookings"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              My booking
            </Link>
            <Link className={linkClasses("places")} to={"/account/places"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                />
              </svg>
              My accomodations
            </Link>
          </nav>
          <div>
            <form onSubmit={savePlace}>
              {preInput(
                "Title",
                "title for your place. should be short and catchy"
              )}
              <input
                type="text"
                placeholder="title, for exmple: My lovely apt"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
              {preInput("Address", "Address")}
              <input
                type="text"
                placeholder="address"
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
              />
              {preInput("Photos", "more = better")}

              <PhotosUploader
                setAddedPhotos={setAddedPhotos}
                setPhotoLink={setPhotoLink}
                photoLink={photoLink}
                addedPhotos={addedPhotos}
              />
              {preInput("Description", "Description of the place")}
              <textarea
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
              {preInput("Perks", "Selct all the perks of your place")}
              <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks selected={perks} onChange={setPerks} />
              </div>
              {preInput("Extra info", "house rules, etc")}
              <textarea
                value={extraInfo}
                onChange={(ev) => setExtraInfo(ev.target.value)}
              />
              {preInput(
                "Check in & out times",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam!"
              )}
              <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                <div>
                  <h3 className="mt-2 -mb-1">Check in time</h3>
                  <input
                    type="text"
                    placeholder="14"
                    value={checkIn}
                    onChange={(ev) => setCheckIn(ev.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Check out time</h3>
                  <input
                    type="text"
                    placeholder="11"
                    value={checkOut}
                    onChange={(ev) => setCheckOut(ev.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Max number of guest</h3>
                  <input
                    type="text"
                    value={maxGuests}
                    onChange={(ev) => setMaxGuests(ev.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Prices per night</h3>
                  <input
                    type="text"
                    value={price}
                    onChange={(ev) => setPrice(ev.target.value)}
                  />
                </div>
              </div>
              <button className="primary my-4">Save</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default PlacesPage;
