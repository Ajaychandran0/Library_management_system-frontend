import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useForm } from "react-hook-form";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../features/admin/auth/authSlice";
import image from "../assets/images/adminLogin.avif";
import BasicSnackbar, {
  basicSnackbar,
} from "../components/common/BasicSnackbar/BasicSnackbar";

const theme = createTheme();

export default function AdminSignin() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, isError, isLoading, isSuccess, message } = useSelector(
    state => state.admin
  );

  useEffect(() => {
    if (isError) {
      basicSnackbar({ message, severity: "error" });
      setSnackbarOpen(true);
    }
    if (isSuccess || admin) {
      navigate("/admin");
    }

    dispatch(reset());
  }, [admin, isError, isSuccess, message, navigate, dispatch]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = adminData => {
    dispatch(login(adminData));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "80%",
          width: "80%",
          margin: "auto",
          paddingTop: "2.5rem",
        }}
      >
        <CssBaseline />
        <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />
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
              <Link to="/"> Horizon LMS</Link>
            </Typography>
            <br />
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Admin LogIn
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*\d)/,
                    message: "Password must contain at least one number",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              {isLoading ? (
                <Button variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                  <CircularProgress size="1.5rem" color="inherit" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
              )}

              <Grid container>
                <Grid item xs>
                  <Link to="/" className="href">
                    Forgot password?
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
