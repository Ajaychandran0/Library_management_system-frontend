import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../../features/member/auth/authSlice";
import { style } from "./styles";

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
    <Box className="header" sx={style}>
      <ul>
        <div className="logo">
          <Link to="/"> HORIZON LIBRARY</Link>
        </div>
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
        </>
      </ul>

      <ul>
        <>
          <li>
            {member ? (
              <Button
                variant="text"
                sx={{
                  color: "#fff",
                  "&:hover": {
                    color: "grey",
                  },
                }}
                onClick={onLogOut}
              >
                <FaSignOutAlt /> Logout
              </Button>
            ) : (
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            )}
          </li>
          <li>
            {member ? (
              <Box
                sx={{
                  mr: 5,
                  "&:hover": {
                    color: "grey",
                  },
                }}
              >
                <FaUser /> Account
              </Box>
            ) : (
              <Box sx={{ mr: 5 }}>
                <Link to="/signup">
                  <FaUser /> Register
                </Link>
              </Box>
            )}
          </li>
        </>
      </ul>
    </Box>
  );
}

export default Header;
