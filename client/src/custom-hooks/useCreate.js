import React, { useState } from "react";
import axios from "axios";

const useCreate = (path, values, fields, resource) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let localErrors = {};

    fields.forEach((property) => {
      if (values[property] === "" || !values[property]) {
        localErrors[property] = `please enter ${property.replace(/_/g, " ")}`;
      }
    });
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    var formData = new FormData();
    for (const property in values) {
      formData.append(property, values[property]);
    }

    try {
      //get token from local storage
      const token = localStorage.getItem("token");
      console.log("useCreateToken: ", token);
      // set token as"x-access-token" on the header when making axios post
      const res = await axios.post(path, formData, {
        headers: { "x-access-token": token },
      });
      window.location.replace(`/${resource}s/${res.data[resource].id}`);
    } catch (err) {
      console.log(err);
      setErrors({ api: true });
    }
  };
  return [errors, handleSubmit];
};

export default useCreate;
