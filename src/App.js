import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// user defile component
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import SubNavbar from "./components/layout/SubNavbar";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Verification from "./pages/auth/Verification";
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/Reset";
import Footer from "./components/layout/Footer";

function App() {
  return (
      <Router>
          <div>
          <Header></Header>
          <Navbar></Navbar>
          <SubNavbar></SubNavbar>
          <Switch>
              <Route  path="/" exact component={Home} />
              <Route path="/register" exact component={Register} />
              <Route path="/verification" exact component={Verification} />
              <Route path="/login"  exact component={Login} />
              <Route path="/reset"  exact component={Reset} />
              {/*<Route path="/fqa"  exact component={Faq} />*/}
              <Route path="/reset"  exact component={Reset} />
          </Switch>
          <Footer></Footer>
        </div>
      </Router>
  );
}

export default App;

