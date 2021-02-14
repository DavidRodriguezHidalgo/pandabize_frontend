import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  const displayLink = () => {
    if (title) {
      return (
        <Link className="title-link" to="/">
          {title}
        </Link>
      );
    }
  };
  return (
    <nav>
      <div className="navbar-background">
        {displayLink()}
        <Link
          className=""
          style={{ marginLeft: "50px", color: "white", textDecoration: "none" }}
          to="/orders"
        >
          Orders
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
