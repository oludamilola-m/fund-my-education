import React, { useState, useEffect } from "react";
import axios from "axios";
import money from "../helpers/money";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { useParams, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "../components/ProgressBar";

const FundingDetails = () => {
  const [funding, setFunding] = useState();
  const { id } = useParams();
  const shareUrl = window.location.href;

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/fundings/${id}`);

      setFunding(res.data.funding);
    })();
  }, [id]);

  if (!funding) {
    return null;
  }

  return (
    <React.Fragment>
      <div style={{ borderTop: "1px solid rgb(241 239 239)" }}></div>

      <main className="funding-details">
        <div className="funding-details__left">
          <img src={funding.image_url} alt={funding.title} />
          <div className="funding-content">
            <h3>About</h3>
            <h2>{funding.title}</h2>
            <p>{funding.description}</p>
          </div>
        </div>
        <div className="funding-details__right">
          <h2>{funding.title}</h2>
          <p>{funding.short_description}</p>
          <ProgressBar width={funding.progress} />
          <div className="funding-details__progress-goal">
            <span className="funding-details__progress-goal__left">
              {funding.progress}% Donated
            </span>
            <span className="funding-details__progress-goal__right">
              Goal: {money(funding.total_amount)}
            </span>
          </div>

          <span>
            <strong>{money(funding.donated_amount)}</strong>
          </span>
          <div style={{ marginBottom: "40px" }}>
            <span>Donated</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <FacebookShareButton
              url={shareUrl}
              quote={funding.short_description}
            >
              <FontAwesomeIcon
                icon={["fab", "facebook-f"]}
                style={{ marginRight: "30px" }}
              />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={funding.title}>
              {" "}
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </TwitterShareButton>
          </div>
          <Link to={`/fundings/${funding.id}/donate`}>
            <button className="funding-card__btn">Donate Now</button>
          </Link>
        </div>
      </main>
    </React.Fragment>
  );
};

export default FundingDetails;
