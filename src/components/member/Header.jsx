import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <ul>
        {" "}
        <div className="logo">
          <Link to="/"> Horizon Library </Link>
        </div>
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/categories">categories</Link>
          </li>
        </>
      </ul>

      <ul>
        <>
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <FaUser /> Register
            </Link>
          </li>
        </>
      </ul>
    </header>
  );
}

export default Header;
