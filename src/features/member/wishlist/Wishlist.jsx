import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";
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
import { Delete } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getWishlist, removeFromWishlist, reset } from "./wishlistSlice";
import { styles } from "./styles";
import useRequestBook from "../../../hooks/useRequestBook";
import wishlistEmpty from "../../../assets/images/empty.jpg";

const Wishlist = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { wishlist, handleDelete, isLoading } =
    useWishlistItems(setSnackbarOpen);
  const { handleRequestBook } = useRequestBook({ setSnackbarOpen });

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
                      onClick={() => navigate(`/books/${book._id}`)}
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
                      <CardActions sx={styles.cardActions}>
                        <Button
                          variant="outlined"
                          onClick={() => handleRequestBook(book?._id)}
                        >
                          Request Book
                        </Button>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(book?._id)}
                        >
                          <Delete color="danger" />
                        </IconButton>
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box
                mt="2rem"
                mx="30rem"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Your wishlist is empty</Typography>
                <Card>
                  <CardMedia
                    component="img"
                    alt="Wishlist Empty Image"
                    height="300"
                    image={wishlistEmpty}
                  />
                </Card>
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

const useWishlistItems = setSnackbarOpen => {
  const dispatch = useDispatch();
  const { wishlist, isLoading } = useSelector(state => state.wishlist);

  const deleteWishItem = bookId => {
    dispatch(removeFromWishlist(bookId));
    basicSnackbar({
      message: "Book removed from wishlist successfully",
      severity: "success",
    });
    setSnackbarOpen(true);
  };
  const handleDelete = bookId =>
    confirmDialog({
      message: "Are you sure you want to remove this book from wishlist ?",
      title: "Remove",
      onConfirm: () => deleteWishItem(bookId),
    });

  useEffect(() => {
    dispatch(getWishlist());

    return () => dispatch(reset());
  }, []);

  return { wishlist, isLoading, handleDelete };
};

export default Wishlist;
