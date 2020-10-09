import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import useStatefulFields from "../custom-hooks/useStatefulFields";
import Payment from "../components/Payment";

const Donate = () => {
  const [funding, setFunding] = useState();
  const [anonymous, setAnonymous] = useState(false);
  const [amount, setAmount] = useState(10);
  const [donor, handleChange] = useStatefulFields();

  const { id } = useParams();

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
    <div>
      <div className="donate-banner">
        <div className="donate-banner__left">
          <img src={funding.image_url} alt="hhhh" />
        </div>
        <div className="donate-banner__right">
          <div className="inner">
            <p>YOU ARE DONATING TO:</p>
            <h2>{funding.title}</h2>
            <span className="donate-banner__total">
              ${funding.donated_amount}
            </span>
            <ProgressBar width={funding.progress} />
            <div className="">
              <span className="funding-details__progress-goal__left donate-banner__donated">
                {funding.progress}% Donated
              </span>
              <span className="funding-details__progress-goal__right donate-banner__total">
                Goal: ${funding.total_amount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <main className="donor-details">
        <section className="left">
          <label>
            <input
              name="anonymous"
              type="checkbox"
              checked={anonymous}
              onChange={(e) => {
                setAnonymous(e.target.checked);
              }}
            />
            Donate anonymously
          </label>
          {!anonymous && (
            <form action="">
              <h3>Personal Details</h3>
              <div className="flex">
                <input
                  onChange={handleChange}
                  type="text"
                  name="first_name"
                  placeholder="First name*"
                />
                <input
                  onChange={handleChange}
                  type="text"
                  name="last_name"
                  placeholder="Last name*"
                />
              </div>
              <div className="flex">
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Email*"
                />
                <input
                  onChange={handleChange}
                  type="telephone"
                  name="phone"
                  placeholder="Phone*"
                />
              </div>
            </form>
          )}
        </section>
        <section className="right">
          <h2>{amount}</h2>
          <Payment setAmount={setAmount} amount={amount} />
        </section>
      </main>
    </div>
  );
};

export default Donate;
