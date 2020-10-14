import React, { useState } from "react";
import axios from "axios";

const useAuthSubmit = (path, user, fields, afterPath) => {
  const [errors, setErrors] = useState({});

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

      // get token from  API endpoint response data
      const storeToken = res.data.token;
      // store token in localStorage as token
      localStorage.setItem("token", storeToken);
      //redirect to newFunding
      window.location.replace(afterPath);
    } catch (err) {
      console.log("err: ", err);
      setErrors({ api: true });
    }
  };
  return [errors, handleSubmit];
};

export default useAuthSubmit;
