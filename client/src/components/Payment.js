import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const Payment = ({ setAmount, amount }) => {
  return (
    <div className="payment-container">
      <h3>Select Donation Amount</h3>
      <div className="amount-selector">
        <span
          className={`${amount == 10 ? "selected" : ""}`}
          onClick={() => setAmount(10)}
        >
          &#128;10
        </span>
        <span
          className={`${amount == 20 ? "selected" : ""}`}
          onClick={() => setAmount(20)}
        >
          &#128;20
        </span>
        <span
          className={`${amount == 30 ? "selected" : ""}`}
          onClick={() => setAmount(30)}
        >
          &#128;30
        </span>
        <span
          className={`${amount == 40 ? "selected" : ""}`}
          onClick={() => setAmount(40)}
        >
          &#128;40
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
      {/* <div className="payment-method-selector">
        <img src={paypalImage} alt="paypal selector" className="selected" />
        <img src={creditCardImage} alt="paypal selector" />
      </div> */}
      <PayPalButton
        amount={amount}
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          console.log(data);
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
