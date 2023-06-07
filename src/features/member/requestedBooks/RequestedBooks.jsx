import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReqBooks, removeBookRequest, reset } from "./requestedBooksSlice";
import { reset as wishReset } from "../wishlist/wishlistSlice";
import { Delete, Favorite } from "@mui/icons-material";
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
import { Link } from "react-router-dom";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";
import { addToWishlist, removeFromWishlist } from "../wishlist/wishlistSlice";

const RequestedBooksPage = () => {
  const { wishlistIds } = useSelector(state => state.wishlist);
  const { isSuccess, isError, message } = useSelector(state => state.wishlist);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (bookId, bookTitle) => {
    if (wishlistIds.includes(bookId)) {
      dispatch(removeFromWishlist(bookId));
    } else {
      dispatch(addToWishlist(bookId));
    }
    setBookTitle(bookTitle);
  };
  useEffect(() => {
    if (isSuccess && message === "removedFromWishlist") {
      basicSnackbar({
        message: `"${bookTitle}" removed from your wishlist`,
        severity: "warning",
      });
      setSnackbarOpen(true);
    }
    if (isSuccess && message === "addedToWishlist") {
      basicSnackbar({
        message: `"${bookTitle}" added to you wishlist`,
        severity: "success",
      });
      setSnackbarOpen(true);
    }
    dispatch(wishReset());
  }, [isSuccess, isError, message]);

  const handleDelete = bookId => {
    dispatch(removeBookRequest(bookId));
    basicSnackbar({
      message: "Book request deleted successfully",
      severity: "success",
    });
    setSnackbarOpen(true);
  };
  const openConfirmDialog = bookId =>
    confirmDialog({
      message: "Are you sure you want to delete this book request ?",
      title: "Delete",
      onConfirm: () => handleDelete(bookId),
    });

  useEffect(() => {
    dispatch(getReqBooks());
    return () => {
      dispatch(reset());
    };
  }, []);

  const { reqBooks, isLoading } = useSelector(state => state.reqBooks);

  return (
    <Box sx={styles.root}>
      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />
      <ConfirmDialog />
      {isLoading ? (
        "loading"
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            REQUESTED BOOKS
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {reqBooks.length ? (
              reqBooks.map(book => {
                if (book) {
                  return (
                    <Grid item xs={12} sm={6} key={book?._id}>
                      <Card sx={styles.card}>
                        <CardMedia
                          sx={styles.cardMedia}
                          image={book?.imageUrl}
                          title={book?.bookTitle}
                        />
                        <Box sx={styles.cardContent}>
                          <CardContent>
                            <Typography
                              variant="h6"
                              component="h2"
                              sx={{ height: "4rem" }}
                            >
                              {book?.bookTitle}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {book?.author}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              Available Quantity: {book?.availableQty}
                              &nbsp;&nbsp;&nbsp;&nbsp; Language:{" "}
                              {book?.language}
                            </Typography>
                          </CardContent>
                        </Box>
                        <CardActions sx={styles.cardActions}>
                          <IconButton
                            onClick={() =>
                              handleClick(book._id, book.bookTitle)
                            }
                            aria-label="add to favorites"
                            color={
                              wishlistIds.includes(book._id)
                                ? "primary"
                                : "shade"
                            }
                          >
                            <Favorite />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => openConfirmDialog(book?._id)}
                          >
                            <Delete color="danger" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              })
            ) : (
              <Box
                mt="8rem"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography variant="h6" m={2}>
                  You have not requested any books
                </Typography>
                <Link to="/">
                  <Button variant="outlined">Continue to browse books</Button>
                </Link>
              </Box>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default RequestedBooksPage;
