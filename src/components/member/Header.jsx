import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/member/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { member } = useSelector(state => state.auth);

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
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
            {member ? (
              <Button variant="text" sx={{ color: "#fff" }} onClick={onLogOut}>
                <FaSignOutAlt /> Logout
              </Button>
            ) : (
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            )}
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
