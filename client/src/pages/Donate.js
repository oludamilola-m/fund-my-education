import React, { useEffect, useState } from "react";
import axios from "axios";
import money from "../helpers/money";
import { useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import useStatefulFields from "../custom-hooks/useStatefulFields";
import Payment from "../components/Payment";

const Donate = () => {
  const [funding, setFunding] = useState();
  const [anonymous, setAnonymous] = useState(false);
  const [amount, setAmount] = useState(100);
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

  const submitDonation = async (orderID) => {
    try {
      await axios.post(`/api/fundings/${id}/donations`, {
        donor_first_name: donor.first_name,
        donor_last_name: donor.last_name,
        donor_phone_number: donor.phone,
        amount: amount,
        donor_email: donor.email,
        payment_reference: orderID,
      });

      const res = await axios.get(`/api/fundings/${id}`);

      setFunding(res.data.funding);
    } catch (err) {
      console.log(err);
    }
  };

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
              {money(funding.donated_amount)}
            </span>
            <ProgressBar width={funding.progress} />
            <div className="">
              <span className="funding-details__progress-goal__left donate-banner__donated">
                {funding.progress}% Donated
              </span>
              <span className="funding-details__progress-goal__right donate-banner__total">
                Goal: {money(funding.total_amount)}
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
          <Payment
            setAmount={setAmount}
            amount={amount}
            submitDonation={submitDonation}
          />
        </section>
      </main>
    </div>
  );
};

export default Donate;
