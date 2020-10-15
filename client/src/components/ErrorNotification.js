import React from "react";

const ErrorNotification = ({ message }) => {
  const show = message.length > 0;
  return (
    <div className={`error-notification${show ? " show" : ""}`}>{message}</div>
  );
};

// ErrorNotification.defaultProps = {
//   message: "An Error Occured.",
//   show: false,
// };

export default ErrorNotification;
