import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";
// import PrivateRoute from "./components/PrivateRoutes";
import ForgotPassword from "../src/pages/ForgotPassword";
// import Offers from "../src/pages/Offers";
// import SignUp from "../src/pages/SignUp";
// import SignIn from "../src/pages/SignIn";
// import Profile from "../src/pages/Profile";
// import CreateListing from "../src/pages/CreateListing";
// import EditListing from "../src/pages/EditListing";
import Listing from "./pages/Listing";
// import Contact from "./pages/Contact";
import Home from "./pages/Home";
import React, { Suspense } from "react";
import Spinner from "./components/Spinner";

function App() {
  const Explore = React.lazy(() => import("./pages/Explore"));
  const Offers = React.lazy(() => import("./pages/Offers"));
  const Category = React.lazy(() => import("./pages/Category"));
  const PrivateRoute = React.lazy(() => import("./components/PrivateRoutes"));
  const Profile = React.lazy(() => import("./pages/Profile"));

  const SignIn = React.lazy(() => import("./pages/SignIn"));
  const SignUp = React.lazy(() => import("./pages/SignUp"));
  const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
  const CreateListing = React.lazy(() => import("./pages/CreateListing"));
  const EditListing = React.lazy(() => import("./pages/EditListing"));
  const Contact = React.lazy(() => import("./pages/Contact"));

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/explore"
            element={
              <Suspense fallback={<Spinner />}>
                <Explore />
              </Suspense>
            }
          />
          <Route
            path="/offers"
            element={
              <Suspense fallback={<Spinner />}>
                <Offers />
              </Suspense>
            }
          />
          // *PROFILE NESTED ROUTES
          <Route
            path="/category/:categoryName"
            element={
              <Suspense fallback={<Spinner />}>
                <Category />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Spinner />}>
                <PrivateRoute />
              </Suspense>
            }
          >
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Spinner />}>
                  <Profile />
                </Suspense>
              }
            />
          </Route>
          
          //* end of nestded profile route

          <Route
            path="/sign-in"
            element={
              <Suspense fallback={<Spinner />}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Suspense fallback={<Spinner />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/create-listing"
            element={
              <Suspense fallback={<Spinner />}>
                <CreateListing />
              </Suspense>
            }
          />
          <Route
            path="/edit-listing"
            element={
              <Suspense fallback={<Spinner />}>
                <EditListing />
              </Suspense>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Spinner />}>
                <ForgotPassword />
              </Suspense>
            }
          />

          <Route
            path="/contact/:landlordId"
            element={
              <Suspense fallback={<Spinner />}>
                <Contact />
              </Suspense>
            }
          />

          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
