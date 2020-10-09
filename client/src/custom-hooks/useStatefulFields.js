import React, { useState } from "react";

const useStatefulFields = () => {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, handleChange];
};

export default useStatefulFields;
