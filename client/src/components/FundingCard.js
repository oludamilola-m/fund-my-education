import React from "react";
import ProgressBar from "../components/ProgressBar";
import money from "../helpers/money";
import { Link } from "react-router-dom";

const FundingCard = ({ funding }) => {
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
          <strong>{money(funding.donated_amount)}</strong>
        </span>
        <ProgressBar width={funding.progress} />
        <div className="funding-card__progress-goal">
          <span className="funding-card__progress-goal__left">
            <strong>{funding.progress}% Donated</strong>
          </span>
          <span className="funding-card__progress-goal__right muted">
            <strong>Goal: {money(funding.total_amount)}</strong>
          </span>
        </div>

        <p className="funding-card__description">{funding.short_description}</p>

        <Link to={`/fundings/${funding.id}/donate`}>
          <button className="funding-card__btn">Donate Now</button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default FundingCard;
