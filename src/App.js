import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import ForgotPassword from "../src/pages/ForgotPassword";
import Offers from "../src/pages/Offers";
import SignUp from "../src/pages/SignUp";
import SignIn from "../src/pages/SignIn";
import Profile from "../src/pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sing-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
        <Navbar />
      </Router>
    </>
  );
}

export default App;
