import { useContext } from "react";
import { UsersContext } from "../state/AppState";
import { Navigate, NavLink } from "react-router-dom";
import { CustomTooltip } from "../components/customtooltip";

export function NavBar() {
  const { usersState, actions } = useContext(UsersContext);

  const isUserLoggedIn = usersState.currentUser ? "" : "disabled";
  const currentUserData = usersState.users.find(elem => elem.email === usersState.currentUser)

  return (
  <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between" >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          BadBank
        </NavLink>
        <button
          className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" 
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="container">
          <ul className="navbar-nav d-flex">
          <li className="nav-item">
              <CustomTooltip text="Home" tooltipId="home">
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </CustomTooltip>
            </li>
            <li className="nav-item">
              <CustomTooltip text="Create new account" tooltipId="createAccount">
                <NavLink className="nav-link" to="/CreateAccount/">
                  Create Account
                </NavLink>
              </CustomTooltip>
            </li>

              <li className="nav-item">
                <CustomTooltip text="transactions" tooltipId="transactions">
                  <NavLink className={`nav-link ${isUserLoggedIn}`} to="/transactions">
                    Transactions
                  </NavLink>
                </CustomTooltip>
              </li>

            <li className="nav-item">
              <CustomTooltip text="All data" tooltipId="allData">
                <NavLink className="nav-link" to="/allData">
                  All Data
                </NavLink>
              </CustomTooltip>
            </li>
            <li className="nav-item">
            {!usersState.currentUser ? (
                <CustomTooltip text="Log in" tooltipId="login">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </CustomTooltip>
            ) : ( 
              <CustomTooltip text="Log out" tooltipId="logout">
              <NavLink className="nav-link" to="/login" end onClick={(e) => {actions.logout(); Navigate({to:'/'})}}>
                Logout
              </NavLink>
              </CustomTooltip>
            )}
            </li>       
          </ul>
          </div>
          <div className="container">
            <ul className="navbar-nav d-flex flex-row-reverse">
            <li class="navbar-nav">
            {
              usersState.currentUser ? (
                <span class="navbar-text">
                {currentUserData.name} is logged in
              </span>
              ) : (
                  <span/>
                )
              }
            </li>     
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
