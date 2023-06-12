import {
  Typography,
  Box,
  Grid,
  CardMedia,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import BasicSnackbar from "../../../components/common/BasicSnackbar/BasicSnackbar";
import { getBooks, reset } from "./bookSlice";
import useWishlist from "../../../hooks/useWishlist";
import useRequestBook from "../../../hooks/useRequestBook";

const SingleBookPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { bookId } = useParams();

  const { handleWishlist, wishlistIds } = useWishlist({ setSnackbarOpen });
  const { handleRequestBook } = useRequestBook({ setSnackbarOpen });
  const book = useBookDetails(bookId);

  return (
    <Grid container spacing={2} sx={{ p: 6, mt: 2 }}>
      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />

      {book ? (
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
                image={book.imageUrl}
                sx={{ loading: "lazy", objectFit: "contain" }}
                title="Book Title"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} lg={9} mb={6}>
            <Box alignItems="center" mt={2} mb={2}>
              <Typography variant="h4" component="span">
                {book.bookTitle}
              </Typography>
            </Box>
            <Typography component="label">
              Released: {new Date(book.createdAt).toLocaleDateString()}
            </Typography>
            <Box display="flex" alignItems="center" mt={2} mb={1}>
              <Typography component="label">By: {book.author}</Typography>
              &nbsp;&nbsp;&nbsp;
              <Typography component="label"> (Author)</Typography>
            </Box>
            <Typography component="label" color="textSecondary">
              Language: {book.language}
            </Typography>
            <Typography component="label" p={3} color="textSecondary">
              Category: {book.category}
            </Typography>
            <Box>
              <Typography color="textSecondary" lineHeight={2.5}>
                Lost Fine: {book.lostPrice}
              </Typography>
            </Box>
            <Box mt={1} display="flex">
              {book.availableQty > 0 ? (
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
                onClick={() => handleRequestBook(book._id)}
              >
                Request book
              </Button>
              &nbsp; &nbsp;
              {wishlistIds.length ? (
                <IconButton
                  onClick={() => handleWishlist(book._id, book.bookTitle)}
                  aria-label="add to favorites"
                  color={wishlistIds.includes(book._id) ? "primary" : "shade"}
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
              {book.aboutBook}
            </Typography>
          </Grid>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Grid>
  );
};

const useBookDetails = bookId => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks({ _id: bookId }));
    return () => dispatch(reset());
  }, []);

  const { books } = useSelector(state => state.books);
  return books[0];
};

export default SingleBookPage;
