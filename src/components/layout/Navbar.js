import { React } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ icon, title, about, home }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link exact to="/">
            {home}
          </Link>
        </li>
        <li>
          <Link exact to="/about">
            {about}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// I wasn't too far off the mark!!! The principle reason we use React's Link is because it maintains the
// state between redirects. If I were to used mere anchor tags then each time we changed pages
// the state would be reset resulting, in this case, in losing whatever search related data we had

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
  about: "About",
  home: "Home",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  home: PropTypes.string.isRequired,
};

export default Navbar;

/**My own attempt;
const Navbar = ({ icon, title, about }) => {
  const history = useHistory();
  const redirectAbout = () => {
    let path = "/about";
    history.push(path);

    console.log("redirection!?");
  };

  const redirectHome = () => {
    //let path = "/";
    history.push("/");

    console.log("homed in?!");
  };

  return (
    <nav className="navbar bg-primary">
      <Link>
        <h1 onClick={redirectHome}>
          <i className={icon} />
          &nbsp;
          {title}
        </h1>
      </Link>
      <Link onClick={redirectAbout}>{about}</Link>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
  about: "About",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

export default Navbar;





 */
