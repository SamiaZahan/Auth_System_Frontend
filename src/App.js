import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// user defile component
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Register from "./pages/auth/Register";
import Verification from "./pages/auth/Verification";
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/Reset";
import Footer from "./components/layout/Footer";
import Profile from "./pages/auth/Profile";
import EditProfile from "./pages/auth/EditProfile";
import VerifyAndEditEmail from "./pages/auth/VerifyAndEditEmail"

function App() {
  return (
      <Router>
          <div>
          <Header/>
          <Navbar/>
         {/* <SubNavbar></SubNavbar>*/}
          <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/verification" exact component={Verification} />
              <Route path="/verify-and-update-email" exact component={VerifyAndEditEmail}/>
              <Route path="/login"  exact component={Login} />
              <Route path="/reset"  exact component={Reset} />
              <Route path="/profile"  exact component={Profile} />
              <Route path="/editProfile"  exact component={EditProfile} />
              {/*<Route path="/fqa"  exact component={Faq} />*/}
              {/* <Route path="/reset"  exact component={Reset} /> */}
          </Switch>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;

