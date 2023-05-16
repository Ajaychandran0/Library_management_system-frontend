import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import image from "../assets/images/signinPage.jpg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { toast } from "react-toastify";
import { login, reset } from "../features/member/auth/authSlice";
import BasicSnackbar from "../components/common/BasicSnackbar/BasicSnackbar";

const theme = createTheme();

export default function UserSignin() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };
  const { member, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const memberData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(memberData));
  };

  useEffect(() => {
    if (isError) {
      setToastMsg(message);
      setToastOpen(true);
    }
    if (isSuccess || member) {
      navigate("/home");
    }

    dispatch(reset());
  }, [member, isError, isSuccess, message, navigate, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "80%",
          width: "80%",
          margin: "auto",
          paddingTop: "40px",
        }}
      >
        <CssBaseline />
        <BasicSnackbar
          open={toastOpen}
          onClose={handleToastClose}
          severity="error"
          message={toastMsg ? toastMsg : "login Failed"}
        />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: t =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ paddingRight: "13.5rem", fontWeight: "bold" }}
            >
              <Link to="/"> Horizon Library</Link>
            </Typography>
            <br />
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/" className="href">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" className="href">
                    {"No account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Grid container mt={3}>
                <Grid item xs>
                  OR login with
                </Grid>
                <Grid item xs>
                  <div style={{ display: "flex" }} className="hrefs">
                    <GoogleIcon />
                    <p style={{ paddingInline: ".5rem" }}>Google</p>
                  </div>
                </Grid>
                <Grid item xs>
                  <div style={{ display: "flex" }} className="hrefs">
                    <LinkedInIcon />
                    <p style={{ paddingInline: ".5rem" }}>LinkedIn</p>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
