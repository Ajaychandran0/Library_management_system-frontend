import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";

import BasicSnackbar from "../../../components/common/BasicSnackbar/BasicSnackbar";
import DataTable from "../../../components/common/DataTable/DataTable";

const categoryTableStyles = {
  height: "auto",
  backgroundColor: theme => theme.palette.grey[200],
};

const columns = [
  { field: "id", headerName: "No.", width: 70 },
  { field: "name", headerName: "Category name", width: 120 },
  { field: "status", headerName: "Status", width: 80 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "createdAt", headerName: "Creation Date", width: 120 },
  { field: "updatedAt", headerName: "Updation Date", width: 120 },
  { field: "image", headerName: "Image", width: 200 },
  { field: "action", headerName: "Action", width: 100 },
];

const ListCategories = () => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const [catImage, setCatImage] = useState(null);

  const { categories, isLoading, isError, isSuccess, message } = useSelector(
    state => state.categories
  );
  let x = 0;
  const row = categories.map(category => {
    x += 1;
    return { ...category, id: x };
  });

  const handleImageChange = event => {
    setCatImage(event.target.files[0]);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [category, setCategory] = useState({});

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // update the category data in the state object here
    setCategory({});
  };

  return (
    <>
      <Box
        borderRadius={5}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      ></Box>
      <BasicSnackbar
        open={toastOpen}
        onClose={handleToastClose}
        severity={severity}
        message={toastMsg ? toastMsg : "add category failed"}
      />
      <Box
        component="form"
        ref={formRef}
        onSubmit={handleSubmit}
        sx={{ backgroundColor: theme => theme.palette.grey[200], p: 5 }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Category
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
                  required
                  onChange={handleImageChange}
                />
              </Box>
              <Box>
                <Avatar
                  variant="rounded"
                  alt="Category Image"
                  src={catImage ? URL.createObjectURL(catImage) : undefined}
                  sx={{ mr: 5, width: 100, height: 100 }}
                >
                  C
                </Avatar>
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
                Add Category
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

      <DataTable
        rows={row}
        columns={columns}
        loading={!categories.length}
        sx={{
          ...categoryTableStyles,
          height: () => (categories.length === 0 ? "400px" : "auto"),
          mt: 5,
        }}
      />
    </>
  );
};

export default ListCategories;
