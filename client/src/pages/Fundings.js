import React, { useState, useEffect } from "react";
import axios from "axios";

import FundingCard from "../components/FundingCard";

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
        return <FundingCard key={funding.id.toString()} funding={funding} />;
      })}
    </main>
  );
};

export default Fundings;
