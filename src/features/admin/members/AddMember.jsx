import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import { addNewMember, reset } from "./memberSlice";
import cloudinaryImageUpload from "../../../utils/cloudinaryImageUpload";

const AddMember = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [collegeIdCard, setCollegeIdCard] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.members
  );
  const defaultFormData = {
    name: "",
    collegeId: "",
    email: "",
    phone: "",
    department: "",
    course: "",
    profilePic: "",
    collegeIdCard: "",
    address: "",
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfilePicChange = event => {
    setProfilePic(event.target.files[0]);
  };
  const handleCollegeIdCardChange = event => {
    setCollegeIdCard(event.target.files[0]);
  };

  // add member profile pic and id card to cloudinary and  then submit form
  const [imgUploading, setImgUploading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setImgUploading(true);
    const profileUploadPreset = `${
      import.meta.env.VITE_CLOUDINARY_PROFILE_UPLOAD_PRESET
    }`;
    const idUploadPreset = `${
      import.meta.env.VITE_CLOUDINARY_ID_CARD_UPLOAD_PRESET
    }`;
    Promise.all([
      cloudinaryImageUpload(profilePic, profileUploadPreset),
      cloudinaryImageUpload(collegeIdCard, idUploadPreset),
    ])
      .then(data => {
        const memberDetails = {
          ...formData,
          profilePic: data[0].url,
          collegeIdCard: data[1].url,
        };
        dispatch(addNewMember(memberDetails));
        setImgUploading(false);
      })
      .catch(() => {
        basicSnackbar({ message: "Failed to upload image", severity: "error" });
        setSnackbarOpen(true);
        setImgUploading(false);
      });
  };

  useEffect(() => {
    if (isError) {
      basicSnackbar({ message, severity: "error" });
      setSnackbarOpen(true);
    }
    if (isSuccess) {
      setFormData(defaultFormData);
      setProfilePic(null);
      basicSnackbar({
        message: "Member added successfully",
        severity: "success",
      });
      setSnackbarOpen(true);
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

      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />
      <Box
        component="form"
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
                required
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
              required
              onChange={handleCollegeIdCardChange}
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
            {/* <TextField></TextField> */}
            {/* <label>Department</label>
            <select name="department" id="department">
              <option value="apple">Mechanical</option>
              <option value="banana">Electronics</option>
              <option value="orange">Electrical</option>
              <option value="pear">Civil</option>
            </select> */}
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            {isLoading || imgUploading ? (
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

export default AddMember;
