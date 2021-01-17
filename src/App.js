import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import "./CRApp.css";
import User from "./components/users/User";

import GithubState from "./context/github/GithubState";

const App = () => {
  const [alert, setAlert] = useState(null);

  // Get GitHub Users

  // Get single Github user

  // Get users repos

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

// CONCERNING TWO APPROACHES TO THE IMPLEMENTATION OF THE 'ROUTE' COMPONENT

// The first approach is neccessary when iteration between the two components
// is required i.e., when props need to be passed in (as in the first case)

export default App;

/**Notes
 *
 * When employing a conditional statement which has no else clause, you can replace
 * the ternary expression or the standard conditional statement with a double ampersand
 * instead.
 * (CONSULT ELOQUENT JAVASCRIPT FIRST CHAPTER FOR AN EXPLANATION OF WHY THIS IS POSSIBLE)
 */

// Functional/ non-class based component
// import React from "react";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello from Visual Studio Code!</h1>
//     </div>
//   );
// }

// export default App;

// class App extends Component {
//   nameGenerator = (name) => name.toUpperCase();

//   render() {
//     const nameOne = "John";
//     const loadingBoolean = false;
//     const showName = true;

//     return (
//       <div className="App">
//         <h1> Greetings!</h1>
//         {loadingBoolean ? (
//           <h2>Loading...(We're trying to find out your name!)</h2>
//         ) : (
//           <h1>
//             {showName && this.nameGenerator(nameOne)} from Visual Studio Code!
//           </h1>
//         )}
//       </div>
//     );
//   }
// }

// export default App;

// async componentDidMount() {
//   this.setState({ loading: true });

//   const res = await axios.get("https://api.github.com/users");

//   console.log(res.data);

//   let data = res.data;

//   let userNames = [];

//   for (const key in data) {
//     let value = data[key];
//     //console.log(value.login);
//     userNames.push(value.login);
//   }

//   this.setState({ userNames: userNames, loading: false });

//   console.log(this.state);
// }

/**
 * Pre Refactor
 *
 *import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import "./CRApp.css";
import axios from "axios";
import User from "./components/users/User";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };
  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );

    this.setState({ users: res.data, loading: false });

    console.log(this.state.loading);
  }

  // Get GitHub Users

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  // Get single Github user

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // Get users repos

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );
    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, user, repos } = this.state;
    const { clearUsers, searchUsers } = this;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

// CONCERNING TWO APPROACHES TO THE IMPLEMENTATION OF THE 'ROUTE' COMPONENT

// The first approach is neccessary when iteration between the two components
// is required i.e., when props need to be passed in (as in the first case)

export default App;
 */
