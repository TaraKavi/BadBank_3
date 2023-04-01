import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import { useToastContext } from "../state/CustomToast";
import { BankCard } from "../components/bankcard";
import BankForm from "../components/bankform";
import * as yup from "yup";

export const Transactions = () => {
  const { usersState, actions } = useContext(UsersContext);
  const [show, setShow] = useState(true);
  const addToast = useToastContext();

  const user = usersState.users.find(
    (elem) => elem.email === usersState.currentUser
  );

  let formFields = [
    { id: "Amount", placeholder: "Enter amount", type: "input" },
  ];

  let initialValues = {
    Amount: "",
  };


  const handleWithdrawSubmit = (data) => {
    const { result, errorMessage } = actions.withDraw(Number(data.Amount));

    if (result) {
      setShow(false);
      addToast({ text: "Successful withdrawal", type: "success" });
    } else {
      addToast({ text: errorMessage, type: "error" });
    }

    return { result, errorMessage: "" };
  };

  const handleDepositSubmit = (data) => {
    const { result, errorMessage } = actions.deposit(Number(data.Amount));

    if (result) {
      setShow(false);
      addToast({ text: "Successful deposit", type: "success" });
    } else {
      addToast({ text: errorMessage, type: "error" });
    }

    return { result, errorMessage: "" };
  };
 

  const schema = yup.object().shape({
    Amount: yup
      .number()
      .test("is-decimal", "Amount must be a currency", (value) =>
        value.toString().match(/^-?\d+(\.\d{1,2})?$/g)
      )
      .typeError("Amount must be a valid number")
      .min(0.01, "Amount must be a positive number")
      .required(),
  });

  const clearForm = () => {
    setShow(true);
  };

  const renderNewOperation = () => {
    return (
      <div>
        <div className="mb-3">Your balance has been updated</div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" onClick={() => clearForm()}>
            New operation
          </button>
        </div>
      </div>
    );
  };

  const renderWithDrawForm = () => {
    return (
      <BankForm
        buttonSubmit="Withdraw"
        handle={handleWithdrawSubmit}
        fields={formFields}
        initialData={initialValues}
        schema={schema}
      />
    );
  };
  const renderDepositForm = () => {
    return (
      <BankForm
        buttonSubmit="Deposit"
        handle={handleDepositSubmit}
        fields={formFields}
        initialData={initialValues}
        schema={schema}
      />
    );
  };

  return (
    <div className="card-container withdraw">
      <BankCard
        txtcolor="black"
        header="Transactions"
        body={
          usersState.currentUser ? (
            <div>
              <h3 className="col text-center mb-3" id="total">
                Balance ${user.balance}
              </h3>
              {show ? renderWithDrawForm() : renderNewOperation()}
              {show ? renderDepositForm() : renderNewOperation()}
            </div>
          ) : (
            <div>You must be logged in to use this function</div>
          )
        }
      />
    </div>
  );
};
