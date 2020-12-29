import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import "./CRApp.css";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
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

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`
    );

    console.log(res.data);

    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading } = this.state;
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
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

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
