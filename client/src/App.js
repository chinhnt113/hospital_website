import "./components/homepage/index.css";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./views/Homepage";
import Auth from "./views/Auth";
import Account from "./views/Account";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Obstetrics from "./views/content/Obstetrics";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/login" element={<Auth authRoute="login" />} />
          <Route exact path="/register" element={<Auth authRoute="register" />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route exact path="/san-phu-khoa-va-ho-tro-sinh-san" element={<Obstetrics />}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
