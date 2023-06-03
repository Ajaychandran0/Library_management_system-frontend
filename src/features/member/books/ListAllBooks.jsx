import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, reset } from "./bookSlice";
import { reset as wishReset } from "../wishlist/wishlistSlice";
import PropTypes from "prop-types";

import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";

import { styles } from "./style";
import {
  requestBook,
  reset as reqReset,
} from "../requestedBooks/requestedBooksSlice";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import { addToWishlist, removeFromWishlist } from "../wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";

function ListAllBooks({ filter }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { isError, isSuccess, message } = useSelector(state => state.reqBooks);
  const { wishlistIds } = useSelector(state => state.wishlist);
  const { books } = useSelector(state => state.books);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = bookId => {
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

  useEffect(() => {
    dispatch(getBooks(filter));

    return () => {
      dispatch(reset());
    };
  }, []);

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

  return (
    <Grid container spacing={3}>
      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />
      {books.length ? (
        books.map(book => (
          <Grid item xs={12} sm={6} md={3} key={book._id}>
            <Card sx={styles.bookCard}>
              <CardActionArea onClick={() => navigate(`/books/${book._id}`)}>
                <CardMedia
                  component="img"
                  alt="Book Cover"
                  height="250"
                  image={book.imageUrl}
                  sx={{ loading: "lazy", objectFit: "contain" }}
                  title="Book Title"
                />
                <CardContent>
                  <Tooltip title={book.bookTitle}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={styles.bookTitle}
                    >
                      {book.bookTitle}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={book.author}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      noWrap
                      sx={styles.bookAuthor}
                    >
                      {book.author}
                    </Typography>
                  </Tooltip>
                </CardContent>
              </CardActionArea>
              <CardActions sx={styles.bookButton}>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => handleClick(book._id)}
                >
                  Request book
                </Button>

                {wishlistIds.length ? (
                  <IconButton
                    onClick={() => handleWishlist(book._id, book.bookTitle)}
                    aria-label="add to favorites"
                    color={wishlistIds.includes(book._id) ? "primary" : "shade"}
                  >
                    &nbsp; &nbsp;
                    <Favorite />
                  </IconButton>
                ) : (
                  ""
                )}
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h5" sx={{ mx: "30rem", my: "13rem" }}>
          No Books Avialable
        </Typography>
      )}
    </Grid>
  );
}

ListAllBooks.propTypes = {
  filter: PropTypes.object,
};

export default ListAllBooks;
