import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProgressBar from "../components/ProgressBar";

const Fundings = () => {
  const [fundings, setFundings] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/fundings");
      setFundings(res.data.fundings);
    })();
    // return () => {
    //   cleanup
    // }
  }, []);
  return (
    <main className="fundings-container">
      {fundings.map((funding) => {
        return (
          <div className="funding-card" key={funding.id.toString()}>
            <div>
              <Link to={`/fundings/${funding.id}`}>
                <img src={funding.image_url} alt="funding image" />
              </Link>
            </div>
            <div className="funding-card__content">
              <Link to={`/fundings/${funding.id}`}>
                <h2>{funding.title}</h2>
              </Link>
              <span className="muted">
                {" "}
                <strong>${funding.donated_amount}</strong>
              </span>
              <ProgressBar width={funding.progress} />
              <div className="funding-card__progress-goal">
                <span className="funding-card__progress-goal__left">
                  <strong>{funding.progress}% Donated</strong>
                </span>
                <span className="funding-card__progress-goal__right muted">
                  <strong>Goal: ${funding.total_amount}</strong>
                </span>
              </div>

              <p className="funding-card__description">
                {funding.short_description}
              </p>

              <Link to={`/fundings/${funding.id}/donate`}>
                <button className="funding-card__btn">Donate Now</button>{" "}
              </Link>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Fundings;
