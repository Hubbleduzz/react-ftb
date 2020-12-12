import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import "./CRApp.css";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get("https://api.github.com/users");

    console.log(res.data);

    let data = res.data;

    let userNames = [];

    for (const key in data) {
      let value = data[key];
      //console.log(value.login);
      userNames.push(value.login);
    }

    this.setState({ userNames: userNames, loading: false });

    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users />
        </div>
      </div>
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
