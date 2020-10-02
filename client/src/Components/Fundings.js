import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="fundings-container">
      {fundings.map((funding) => {
        return (
          <div className="funding-card" key={funding.id.toString()}>
            <div>
              <img src={funding.image_url} alt="funding image" />
            </div>
            <div className="funding-card__content">
              <h2>{funding.title}</h2>
              <p>${funding.donated_amount}</p>
              <div>
                <span>${funding.progress}</span>
                <span>${funding.total_amount}</span>
              </div>
              <p className="funding-card__description">
                {funding.short_description}
              </p>
              <button className="funding-card__btn">Donate Now</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Fundings;
