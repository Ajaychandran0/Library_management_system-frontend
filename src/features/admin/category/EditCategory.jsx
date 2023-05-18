import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BasicSnackbar from "../../../components/common/BasicSnackbar/BasicSnackbar";
import { editCategory, reset } from "./categorySlice";

import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";

const EditCategory = () => {
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
  const [catImage, setCatImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const catData = location.state?.catData;

  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.categories
  );
  const defaultFormData =
    { name: catData?.name, description: catData?.description } || {};
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = event => {
    setCatImage(event.target.files[0]);
  };

  // add category image to cloudinary and  then submit form
  const [imgUploading, setImgUploading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (catImage) {
      setImgUploading(true);
      const data = new FormData();
      data.append("file", catImage);
      data.append(
        "upload_preset",
        `${import.meta.env.VITE_CLOUDINARY_CAT_UPLOAD_PRESET}`
      );
      data.append(
        "cloud_name",
        `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`
      );

      fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
        method: "post",
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          const updatedCat = { ...formData, image: data.url };
          dispatch(editCategory({ updatedCat, catId: catData._id }));
          setImgUploading(false);
        })

        .catch(() => {
          setToastMsg(`Failed to upload image`);
          setSeverity("error");
          setToastOpen(true);
        });
    } else {
      dispatch(editCategory({ updatedCat: formData, catId: catData._id }));
    }
  };

  useEffect(() => {
    if (isError) {
      setToastMsg(message);
      setSeverity("error");
      setToastOpen(true);
    }
    if (isSuccess) {
      setSeverity("success");
      setCatImage(null);
      setToastMsg("Category added successfully");
      setToastOpen(true);
      navigate("/admin/categories");
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <BasicSnackbar
        open={toastOpen}
        onClose={handleToastClose}
        severity={severity}
        message={toastMsg ? toastMsg : "add category failed"}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ backgroundColor: theme => theme.palette.grey[200], p: 5, mt: 8 }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Category
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <TextField
                required
                id="name"
                name="name"
                label="Category Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <label htmlFor="catImage">
                  <Typography variant="text" color="primary" component="span">
                    Upload Category Image
                  </Typography>
                </label>

                <input
                  accept="image/*"
                  id="catImage"
                  type="file"
                  onChange={handleImageChange}
                />
              </Box>
              <Box>
                <Avatar
                  variant="rounded"
                  alt="Category Image"
                  src={
                    catImage
                      ? URL.createObjectURL(catImage)
                      : location.state?.catData.imageUrl
                  }
                  sx={{ mr: 5, width: 100, height: 100 }}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              multiline
              rows={5}
              id="description"
              name="description"
              label="Description"
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
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
                Edit Category
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditCategory;
