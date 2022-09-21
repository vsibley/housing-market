import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoutes";
import ForgotPassword from "../src/pages/ForgotPassword";
import Offers from "../src/pages/Offers";
import SignUp from "../src/pages/SignUp";
import SignIn from "../src/pages/SignIn";
import Profile from "../src/pages/Profile";
import Category from "../src/pages/Category";
import CreateListing from "../src/pages/CreateListing";
import EditListing from "../src/pages/EditListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/edit-listing/:listing" element={<EditListing />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="/contact/:landlordId" element={<Contact />} />
        </Routes>
        
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
