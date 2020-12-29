import { React } from "react";
//import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";

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
      <h1 onClick={redirectHome}>
        <i className={icon} />
        &nbsp;
        {title}
      </h1>
      <Link onClick={redirectAbout}>{about}</Link>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
  about: "About",
};

// Navbar.propTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.string.isRequired,
//   about: PropTypes.string.isRequired,
// };

export default Navbar;
