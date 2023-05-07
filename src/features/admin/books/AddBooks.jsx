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
import { useNavigate } from "react-router-dom";

import BasicSnackbar from "../../../components/common/BasicSnackbar/BasicSnackbar";
import { addNewBook, reset } from "./bookSlice";

const AddBook = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const [severity, setSeverity] = useState("error");

  const [bookImage, setBookImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.books
  );

  const handleBookImageChange = event => {
    setBookImage(event.target.files[0]);
  };

  const [formData, setFormData] = useState({
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
  });

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

  // add book image to cloudinary and  then submit form
  const [imgUploading, setImgUploading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formData);
    setImgUploading(true);
    const data = new FormData();
    data.append("file", bookImage);
    data.append("upload_preset", "horizon-LMS-books");
    data.append("cloud_name", "dth0telv9");

    fetch("https://api.cloudinary.com/v1_1/dth0telv9/image/upload", {
      method: "post",
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const bookDetails = { ...formData, image: data.url };
        console.log(bookDetails);
        dispatch(addNewBook(bookDetails));
        setImgUploading(false);
      })

      .catch(err => {
        console.log(err);

        setToastMsg(`Failed to upload image`);
        setSeverity("error");
        setToastOpen(true);
      });
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
      setFormData({ ISBN: "" });
      setBookImage(null);
      setToastMsg("book added successfully");
      setToastOpen(true);
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
        message={toastMsg ? toastMsg : "Add book failed"}
      />
      <Box
        component="form"
        ref={formRef}
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
                  sx={{ mr: 8, width: 100, height: 100 }}
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

// export default StudentRegistrationForm;
export default AddBook;
