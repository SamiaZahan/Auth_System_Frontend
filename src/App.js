import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// user defile component
import Header from "./components/navbar/Header";
import Navbar from "./components/navbar/Navbar";
import SubNavbar from "./components/navbar/SubNavbar";
import Home from "./components/pages/home/Home";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Reset from "./components/pages/auth/Reset";
import Footer from "./components/navbar/Footer";

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

