import React from "react";
import ProgressBar from "./ProgressBar";
import money from "../helpers/money";
import { Link } from "react-router-dom";
import Auth from "../Auth";
import axios from "axios";

const FundingCard = ({ funding, setFundings }) => {
  //send accept token header
  const handleApproval = async (action) => {
    try {
      const res = await axios.put(
        `/api/fundings/${funding.id}/${action}`,
        {},
        {
          headers: { "x-access-token": Auth.token },
        }
      );

      // go through all fundings in state and update the funding with funding from res
      setFundings((prevState) => {
        return prevState.map((f) => {
          if (f.id == funding.id) {
            return { ...f, ...res.data.funding };
          }
          return f;
        });
      });
    } catch (err) {
      console.log("err: ", err);
    }
  };
  return (
    <div className="funding-card" key={funding.id.toString()}>
      <div>
        <Link to={`/fundings/${funding.id}`}>
          <img src={funding.image_url} alt="funding-avatar" />
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

        {Auth.isAdmin() && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {!funding.approved_at && (
              <button
                className="funding-card__btn"
                onClick={() => handleApproval("approve")}
              >
                Approve
              </button>
            )}
            {!funding.declined_at && (
              <button
                onClick={() => handleApproval("decline")}
                className="funding-card__btn"
                style={{ backgroundColor: "#f36969" }}
              >
                Decline
              </button>
            )}
          </div>
        )}

        {!Auth.isAdmin() && (
          <Link to={`/fundings/${funding.id}/donate`}>
            <button className="funding-card__btn">Donate Now</button>{" "}
          </Link>
        )}
      </div>
    </div>
  );
};

export default FundingCard;
