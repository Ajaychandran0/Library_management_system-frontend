import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import BasicSnackbar from "../../../components/common/BasicSnackbar/BasicSnackbar";
import { addNewMember, reset } from "./memberSlice";

const AddMember = () => {
  // toast message
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const [severity, setSeverity] = useState("error");

  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.members
  );

  const [formData, setFormData] = useState({
    name: "",
    collegeId: "",
    email: "",
    phone: "",
    department: "",
    course: "",
    profilePic: "",
    collegeIdCard: "",
    address: "",
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfilePicChange = event => {
    setProfilePic(event.target.files[0]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formData);
    dispatch(addNewMember(formData));
  };

  useEffect(() => {
    if (isError) {
      setToastMsg(message);
      setSeverity("error");
      setToastOpen(true);
    }
    if (isSuccess) {
      setSeverity("success");
      formRef.current.reset();
      setFormData({ address: "" });
      setToastMsg("Member added successfully");
      setToastOpen(true);
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <Link to="add-member">
        <Button variant="outlined" sx={{ m: 3 }}>
          View Membership Requests
        </Button>
      </Link>

      <BasicSnackbar
        open={toastOpen}
        onClose={handleToastClose}
        severity={severity}
        message={toastMsg ? toastMsg : "Registration failed"}
      />
      <Box
        component="form"
        ref={formRef}
        onSubmit={handleSubmit}
        sx={{ backgroundColor: theme => theme.palette.grey[200], p: 5 }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Student Registration Form
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              multiline
              rows={5}
              id="address"
              name="address"
              label="Address"
              fullWidth
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="collegeId"
              name="collegeId"
              label="College ID"
              fullWidth
              value={formData.collegeId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <label htmlFor="profilePic">
              <Typography variant="text" color="primary" component="span">
                Upload Profile Picture
              </Typography>
            </label>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Avatar
                alt="Profile Picture"
                src={profilePic ? URL.createObjectURL(profilePic) : undefined}
                sx={{ mr: 1 }}
              />
              <input
                accept="image/*"
                id="profilePic"
                type="file"
                onChange={handleProfilePicChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <label htmlFor="collegeIdCard">
              <Typography variant="text" color="primary" component="span">
                Upload College ID Card
              </Typography>
            </label>
            <input
              accept="image/*"
              id="collegeIdCard"
              type="file"
              //   onChange={handleCollegeIdChange}
              style={{ marginTop: "1.5rem" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone Number"
              type="number"
              fullWidth
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="department"
              name="department"
              label="Department"
              fullWidth
              value={formData.department}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            {isLoading ? (
              <Button
                variant="contained"
                sx={{ width: "25rem", mt: 2 }}
                color="primary"
              >
                <CircularProgress size="1.5rem" color="inherit" />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: "25rem", mt: 2 }}
              >
                Add Member
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

// export default StudentRegistrationForm;
export default AddMember;
