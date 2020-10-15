import React, { useState, useEffect } from "react";
import axios from "axios";

import FundingCard from "../components/FundingCard";
import Auth from "../Auth";

const Fundings = () => {
  const [fundings, setFundings] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/fundings", {
        params: {
          admin: Auth.isAdmin(),
        },
      });
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
          <FundingCard
            key={funding.id.toString()}
            funding={funding}
            setFundings={setFundings}
          />
        );
      })}
    </main>
  );
};

export default Fundings;
