import React, { useState } from "react";
import useCreate from "../custom-hooks/useCreate";
import useStatefulFields from "../custom-hooks/useStatefulFields";

const NewFunding = () => {
  const fields = ["title", "amount", "description"];
  const [funding, handleChange] = useStatefulFields();
  const [file, setFile] = useState();
  const [uploadLabelText, setUploadLabelText] = useState("Upload Image");

  const [errors, handleSubmit] = useCreate(
    "/api/fundings",
    { ...funding, file: file },
    fields,
    "funding"
  );

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <div className="create-funding-banner">
        <h1>Create a new funding</h1>
      </div>
      <form className="new-funding-form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title*"
        />
        <input
          onChange={handleChange}
          type="number"
          name="amount"
          placeholder="Amount*"
        />
        <textarea
          onChange={handleChange}
          name="description"
          rows="12"
          placeholder="Description*"
        ></textarea>

        <label>
          <input
            id="file"
            type="file"
            name="file"
            accept="image/*"
            className="inputfile"
            onChange={handleImage}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="17"
            viewBox="0 0 20 17"
          >
            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
          </svg>
          <span>{uploadLabelText}</span>
        </label>
        <div>
          <input type="submit" className="funding-card__btn" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default NewFunding;
