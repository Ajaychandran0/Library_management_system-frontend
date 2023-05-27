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
import { useNavigate } from "react-router-dom";

import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import { addNewBook, reset } from "./bookSlice";
import cloudinaryImageUpload from "../../../utils/cloudinaryImageUpload";

const AddBook = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bookImage, setBookImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.books
  );

  const handleBookImageChange = event => {
    setBookImage(event.target.files[0]);
  };

  const defaultFormData = {
    bookTitle: "",
    ISBN: "",
    category: "",
    author: "",
    language: "",
    quantity: "",
    price: "",
    lostPrice: "",
    section: "",
    shelfNo: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = event => {
    if (event.target.name === "quantity" || event.target.name === "shelfNo") {
      const regex = /^[0-9\b]+$/;
      if (event.target.value === "" || regex.test(event.target.value)) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
        return;
      }
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const [imgUploading, setImgUploading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setImgUploading(true);
    const uploadPreset = `${
      import.meta.env.VITE_CLOUDINARY_BOOK_UPLOAD_PRESET
    }`;
    cloudinaryImageUpload(bookImage, uploadPreset)
      .then(data => {
        const bookDetails = { ...formData, image: data.url };
        dispatch(addNewBook(bookDetails));
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
    }
    if (isSuccess && message === "addSuccessful") {
      setFormData(defaultFormData);
      setBookImage(null);
      basicSnackbar({
        message: "Book added successfully",
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
      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ backgroundColor: theme => theme.palette.grey[200], p: 5 }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Book
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              id="bookTitle"
              name="bookTitle"
              label="Book Title"
              fullWidth
              value={formData.bookTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="isbn"
              name="ISBN"
              label="ISBN"
              type="text"
              fullWidth
              value={formData.ISBN}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="category"
              name="category"
              label="Category"
              fullWidth
              value={formData.category}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="author"
              name="author"
              label="Author"
              type="text"
              fullWidth
              value={formData.author}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <label htmlFor="bookImage">
                  <Typography variant="text" color="primary" component="span">
                    Upload Book Image
                  </Typography>
                </label>
                <input
                  accept="image/*"
                  id="bookImage"
                  required
                  type="file"
                  onChange={handleBookImageChange}
                />
              </Box>

              {bookImage && (
                <Avatar
                  variant="rounded"
                  alt="Book image"
                  src={bookImage ? URL.createObjectURL(bookImage) : undefined}
                  sx={{ mr: 8, width: 70, height: 100 }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="language"
              name="language"
              label="Language"
              fullWidth
              value={formData.language}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={formData.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lostPrice"
              name="lostPrice"
              label="Lost Book Fine"
              type="number"
              fullWidth
              value={formData.lostPrice}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="section"
              name="section"
              label="Section"
              fullWidth
              value={formData.section}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="shelfNo"
              name="shelfNo"
              label="Shelf Number"
              type="number"
              fullWidth
              value={formData.shelfNo}
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
                Add book
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddBook;
