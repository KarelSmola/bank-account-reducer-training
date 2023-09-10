import React from "react";

const Statistics = ({ balance, loan }) => {
  return (
    <div>
      <h2>Balance: {balance}</h2>
      <h2>Loan: {loan}</h2>
    </div>
  );
};

export default Statistics;
