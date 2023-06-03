import { Favorite } from "@mui/icons-material";
import {
  Typography,
  Box,
  Grid,
  CardMedia,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../admin/books/bookSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { reset } from "./bookSlice";
import {
  requestBook,
  reset as reqReset,
} from "../requestedBooks/requestedBooksSlice";
import { addToWishlist, removeFromWishlist } from "../wishlist/wishlistSlice";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import { reset as wishReset } from "../wishlist/wishlistSlice";

const SingleBookPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { bookId } = useParams();

  useEffect(() => {
    dispatch(getBooks({ _id: bookId }));
    return () => dispatch(reset());
  }, []);

  const { books } = useSelector(state => state.books);
  const { wishlistIds } = useSelector(state => state.wishlist);
  const { isError, isSuccess, message } = useSelector(state => state.reqBooks);

  const handleRequestBook = bookId => {
    dispatch(requestBook(bookId));
  };

  const [bookTitle, setBookTitle] = useState(null);
  const handleWishlist = (bookId, bookTitle) => {
    if (wishlistIds.includes(bookId)) {
      dispatch(removeFromWishlist(bookId));
    } else {
      dispatch(addToWishlist(bookId));
    }
    setBookTitle(bookTitle);
  };

  useEffect(() => {
    if (isError) {
      const severity = message === "Network Error" ? "error" : "warning";
      basicSnackbar({ message, severity });
      setSnackbarOpen(true);
    }
    if (isSuccess && message) {
      basicSnackbar({
        message,
        severity: "success",
      });
      setSnackbarOpen(true);
    }
    dispatch(reqReset());
  }, [isError, isSuccess, message]);

  const wishSuccess = useSelector(state => state.wishlist.isSuccess);
  const wishError = useSelector(state => state.wishlist.isError);
  const wishMessage = useSelector(state => state.wishlist.message);
  useEffect(() => {
    if (wishSuccess && wishMessage === "removedFromWishlist") {
      basicSnackbar({
        message: `"${bookTitle}" removed from your wishlist`,
        severity: "warning",
      });
      setSnackbarOpen(true);
    }
    if (wishSuccess && wishMessage === "addedToWishlist") {
      basicSnackbar({
        message: `"${bookTitle}" added to you wishlist`,
        severity: "success",
      });
      setSnackbarOpen(true);
    }
    dispatch(wishReset());
  }, [wishSuccess, wishError, wishMessage]);

  return (
    <Grid container spacing={2} sx={{ p: 6, mt: 2 }}>
      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />

      {books.length ? (
        <>
          <Grid item xs={12} sm={4} lg={3} sx={{ p: 3 }}>
            <Box
              // position="relative"
              border={1}
              sx={{ p: 2, height: "85%", width: "auto" }}
            >
              <CardMedia
                component="img"
                alt="Book Cover"
                height="100%"
                image={books[0].imageUrl}
                sx={{ loading: "lazy", objectFit: "contain" }}
                title="Book Title"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} lg={9} mb={6}>
            <Box alignItems="center" mt={2} mb={2}>
              <Typography variant="h4" component="span">
                {books[0].bookTitle}
              </Typography>
            </Box>
            <Typography component="label">
              Released: {new Date(books[0].createdAt).toLocaleDateString()}
            </Typography>
            <Box display="flex" alignItems="center" mt={2} mb={1}>
              <Typography component="label">By: {books[0].author}</Typography>
              &nbsp;&nbsp;&nbsp;
              <Typography component="label"> (Author)</Typography>
            </Box>
            <Typography component="label" color="textSecondary">
              Language: {books[0].language}
            </Typography>
            <Typography component="label" p={3} color="textSecondary">
              Category: {books[0].category}
            </Typography>
            <Box>
              <Typography color="textSecondary" lineHeight={2.5}>
                Lost Fine: {books[0].lostPrice}
              </Typography>
            </Box>
            <Box mt={1} display="flex">
              {books[0].availableQty > 0 ? (
                <Typography variant="h6" color="green">
                  Available
                </Typography>
              ) : (
                <Typography variant="h6" color="red" mx={2}>
                  Not Available
                </Typography>
              )}
            </Box>

            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={() => handleRequestBook(books[0]._id)}
              >
                Request book
              </Button>
              &nbsp; &nbsp;
              {wishlistIds.length ? (
                <IconButton
                  onClick={() =>
                    handleWishlist(books[0]._id, books[0].bookTitle)
                  }
                  aria-label="add to favorites"
                  color={
                    wishlistIds.includes(books[0]._id) ? "primary" : "shade"
                  }
                >
                  <Favorite />
                </IconButton>
              ) : (
                ""
              )}
            </CardActions>
          </Grid>
          <Grid item>
            <Typography variant="h6" mt={-6}>
              About the book
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {books[0].aboutBook}
            </Typography>
          </Grid>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Grid>
  );
};

export default SingleBookPage;
