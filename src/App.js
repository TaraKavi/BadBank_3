import "./App.css";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { NavBar } from "./routes/navbar";
import { Home } from "./pages/home";
import { CreateAccount } from "./pages/createaccount";
import { Login } from "./pages/login";
import { AllData } from "./pages/alldata";
import { Transactions } from "./pages/transactions";

import "bootswatch/dist/flatly/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { ContextProvider } from "./state/AppState";
import { ToastContextProvider } from "./state/CustomToast";

function App() {
  return (
    <ContextProvider>
      <Router>
        <NavBar />
        <ToastContextProvider>
        <div className="container-fluid center">
            <Routes>
              <Route path="/" exact element={<Home />}></Route>
              <Route path="createaccount" element={<CreateAccount />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="alldata" element={<AllData />}></Route>
              <Route path="transactions" element={<Transactions />}></Route>
            </Routes>
        </div>
        </ToastContextProvider>
      </Router>
    </ContextProvider>
  );
}

export default App;
