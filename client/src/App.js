import "./components/homepage/index.scss";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./views/Homepage";
import Auth from "./views/Auth";
import Account from "./views/Account";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Majority from "./views/content/Majority";
import PostDetail from "./views/PostDetail";

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
          <Route exact path="/majority/:majority" element={<Majority />} />
          <Route path="/post/:majority/:title" element={<PostDetail />}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
