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
  Pagination,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Favorite } from "@mui/icons-material";
import BasicSnackbar from "../../../components/common/BasicSnackbar/BasicSnackbar";

import { styles } from "./style";
import useBooks from "../../../hooks/useBooks";
import useWishlist from "../../../hooks/useWishlist";
import useRequestBook from "../../../hooks/useRequestBook";

function ListAllBooks({ filter, searchValue }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { books, handlePagination, currentPage, totalPages } = useBooks({
    searchValue,
    filter,
  });
  const { wishlistIds, handleWishlist } = useWishlist({ setSnackbarOpen });
  const { handleRequestBook } = useRequestBook({ setSnackbarOpen });
  const navigate = useNavigate();

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
                  onClick={() => handleRequestBook(book._id)}
                >
                  Request book
                </Button>

                {wishlistIds ? (
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
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          sx={{ mb: 4 }}
          onChange={handlePagination}
        />
      </Box>
    </Grid>
  );
}

ListAllBooks.propTypes = {
  filter: PropTypes.object,
  searchValue: PropTypes.string,
};

export default ListAllBooks;
