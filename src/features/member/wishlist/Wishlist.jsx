import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import { getWishlist, removeFromWishlist, reset } from "./wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { wishlist, isLoading } = useSelector(state => state.wishlist);

  const handleDelete = bookId => {
    dispatch(removeFromWishlist(bookId));
    basicSnackbar({
      message: "Book removed from wishlist successfully",
      severity: "success",
    });
    setSnackbarOpen(true);
  };
  const openConfirmDialog = bookId =>
    confirmDialog({
      message: "Are you sure you want to remove this book from wishlist ?",
      title: "Remove",
      onConfirm: () => handleDelete(bookId),
    });

  useEffect(() => {
    dispatch(getWishlist());

    return () => dispatch(reset());
  }, []);

  return (
    <Box sx={styles.root}>
      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />
      <ConfirmDialog />
      {isLoading ? (
        "loading"
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            WISHLIST
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {wishlist.length ? (
              wishlist.map(book => (
                <Grid item xs={12} sm={6} key={book._id}>
                  <Card sx={styles.card}>
                    <CardMedia
                      sx={styles.cardMedia}
                      image={book.imageUrl}
                      title={book.bookTitle}
                    />
                    <Box sx={styles.cardContent}>
                      <CardContent>
                        <Typography variant="h6" component="h2">
                          {book.bookTitle}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {book.author}
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardActions sx={styles.cardActions}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => openConfirmDialog(book?._id)}
                      >
                        <Delete color="danger" />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box
                mt="8rem"
                mx="30rem"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Your wishlist is empty</Typography>
                <Link to="/">
                  <Button variant="outlined">
                    Continue to home page to add books
                  </Button>
                </Link>
              </Box>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Wishlist;
