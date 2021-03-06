import React, { useState } from "react";
import axios from "axios";
import Auth from "../Auth";

const useAuthSubmit = (path, user, fields, afterPath) => {
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let localErrors = {};

    fields.forEach((property) => {
      if (user[property] === "" || !user[property]) {
        localErrors[property] = `please enter ${property.replace(/_/g, " ")}`;
      }
    });
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }
    try {
      const res = await axios.post(path, user);

      // call function to store token in localStorage as token
      Auth.login(res.data.token, res.data.admin);
      //redirect to newFunding
      window.location.replace(afterPath);
    } catch (err) {
      if (err.response.data && err.response.data.error) {
        setApiError(err.response.data.error);
      } else {
        setApiError("Something went wrong");
      }
    }
  };
  return [errors, apiError, handleSubmit];
};

export default useAuthSubmit;
