import { useContext } from "react";
import { UsersContext } from "../state/AppState";
import { BankCard } from "../components/bankcard";

export function AllData() {
  const { usersState } = useContext(UsersContext);

  return (
    <div className="card-container allData">
      <BankCard
        header="All Data"
        txtcolor="black"
        width="50rem"
        body={
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col">Password</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              {usersState.users.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element.email}</td>
                    <td>{element.name}</td>
                    <td>{element.password}</td>
                    <td>{element.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
      ></BankCard>
    </div>
  );
}
