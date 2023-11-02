import React, { useState } from "react";
import axios from "axios";
const PhotosUploader = (props) => {


  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: props.photoLink,
    });

    props.setAddedPhotos((prev) => {
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
        props.setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={"Add using a link .....jpg"}
          value={props.photoLink}
          onChange={(ev) => props.setPhotoLink(ev.target.value)}
        />
        <button
          onClick={addPhotoByLink}
          className="by-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp; photo
        </button>
      </div>

      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {props.addedPhotos.length > 0 &&
          props.addedPhotos.map((link) => (
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
    </>
  );
};

export default PhotosUploader;
