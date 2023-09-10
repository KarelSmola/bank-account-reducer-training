import React, { useReducer } from "react";
import Header from "./components/Header";
import Statistics from "./components/Statistics";

const initialState = {
  activeAccount: false,
  balance: 0,
  loan: 0,
  activeLoan: false,
};

const reducer = (state, action) => {
  if (action.type === "OPEN_ACCOUNT") {
    return { ...state, activeAccount: true, balance: 50 };
  }

  if (action.type === "DEPOSIT") {
    return { ...state, balance: state.balance + 150 };
  }

  if (action.type === "WITHDRAW") {
    return { ...state, balance: state.balance === 0 ? 0 : state.balance - 50 };
  }

  if (action.type === "ACTIVATE_LOAN") {
    if (!state.activeLoan) {
      return {
        ...state,
        activeLoan: true,
        balance: state.balance + 5000,
        loan: 5000,
      };
    } else {
      return {
        ...state,
      };
    }
  }

  if (action.type === "PAY_LOAN") {
    if (state.activeLoan) {
      return {
        ...state,
        balance: state.balance - 5000,
        loan: 0,
        activeLoan: false,
      };
    } else {
      return {
        ...state,
      };
    }
  }

  if (action.type === "CLOSE_ACCOUNT") {
    if (state.balance === 0 && state.loan === 0) {
      return { ...state, activeAccount: false };
    } else {
      return { ...state };
    }
  }

  return state;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { activeAccount, balance, loan } = state;

  return (
    <div className="main">
      <Header />
      {!activeAccount && <h2>Click to open account</h2>}
      {activeAccount && (
        <div>
          <h2>Your account is active</h2>
          {balance === 0 && (
            <h2>
              You can't withdraw another money. You have deposit some money or
              you can close account.
            </h2>
          )}
        </div>
      )}
      <Statistics balance={balance} loan={loan} />
      <button
        onClick={() => {
          dispatch({ type: "OPEN_ACCOUNT" });
        }}
      >
        Open acount
      </button>
      <button
        onClick={() => {
          dispatch({ type: "DEPOSIT" });
        }}
        disabled={!activeAccount}
      >
        Deposit 150
      </button>
      <button
        onClick={() => {
          dispatch({ type: "WITHDRAW" });
        }}
        disabled={!activeAccount}
      >
        Withdraw 50
      </button>
      <button
        onClick={() => {
          dispatch({ type: "ACTIVATE_LOAN" });
        }}
        disabled={!activeAccount}
      >
        Loan 5000
      </button>
      <button
        onClick={() => {
          dispatch({ type: "PAY_LOAN" });
        }}
        disabled={!activeAccount}
      >
        Pay loan
      </button>
      <button
        onClick={() => {
          dispatch({ type: "CLOSE_ACCOUNT" });
        }}
        disabled={!activeAccount || balance > 0}
      >
        Close account
      </button>
    </div>
  );
};

export default App;
