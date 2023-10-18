import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
  }
  function uploadPhoto(ev) {
    const files = ev.target.files;
    // console.log(files);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        // console.log(response);
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
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
      )}
      {action === "new" && (
        <div>
          <form>
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

            <div className="flex gap-2">
              <input
                type="text"
                placeholder={"Add using a link .....jpg"}
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                onClick={addPhotoByLink}
                className="by-gray-200 px-4 rounded-2xl"
              >
                Add&nbsp; photo
              </button>
            </div>

            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="h-32 flex" key={link}>
                    <img
                      className="rounded-2xl w-full object-cover"
                      src={"http://localhost:4000/uploads/" + link}
                    />
                  </div>
                ))}
              <label className="h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl  text-2xl text-gray-600">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>
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

            <div className="grid gap-2 sm:grid-cols-3">
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
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
      my places
    </div>
  );
};

export default PlacesPage;
