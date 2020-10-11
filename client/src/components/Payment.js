import React from "react";
import money from "../helpers/money";
import { PayPalButton } from "react-paypal-button-v2";

const Payment = ({ setAmount, amount, submitDonation }) => {
  return (
    <div className="payment-container">
      <h3>Select Donation Amount</h3>
      <div className="amount-selector">
        <span
          className={`${amount == 100 ? "selected" : ""}`}
          onClick={() => setAmount(100)}
        >
          {money(100)}
        </span>
        <span
          className={`${amount == 200 ? "selected" : ""}`}
          onClick={() => setAmount(200)}
        >
          {money(200)}
        </span>
        <span
          className={`${amount == 300 ? "selected" : ""}`}
          onClick={() => setAmount(300)}
        >
          {money(300)}
        </span>
        <span
          className={`${amount == 500 ? "selected" : ""}`}
          onClick={() => setAmount(500)}
        >
          {money(500)}
        </span>
      </div>
      <div>
        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          name="amount"
          value={amount}
          placeholder="Other Amount (EUR)"
          className="flat"
        />
      </div>
      <h4 style={{ color: "#BCBCBC", margin: "30px 0px" }}>Payment Method</h4>

      <PayPalButton
        amount={amount}
        onSuccess={(details, data) => {
          submitDonation(data.orderID);
          // send to backend
        }}
        options={{
          clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
          currency: "EUR",
          disableFunding: "sepa,sofort,giropay",
          commit: true,
        }}
      />
    </div>
  );
};

export default Payment;
