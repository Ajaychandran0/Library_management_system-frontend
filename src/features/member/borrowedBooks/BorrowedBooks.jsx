import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getBorrowedBooks, reset } from "./borrowedBookSlice";
import borrowedBooksEmpty from "../../../assets/images/empty.jpg";
import { styles } from "./styles";

const BooksInPossession = () => {
  const navigate = useNavigate();
  const borrowedBooks = useBorrowedBooks();

  return (
    <Box sx={styles.root}>
      <Typography variant="h5" gutterBottom>
        BOOKS IN POSSESSION
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {borrowedBooks.length ? (
          borrowedBooks.map(book => (
            <Grid item xs={12} sm={6} key={book._id}>
              <Card sx={styles.card}>
                <CardMedia
                  onClick={() => navigate(`/books/${book.book._id}`)}
                  sx={styles.cardMedia}
                  image={book.book.imageUrl}
                  title={book.book.bookTitle}
                />
                <Box sx={styles.cardContent}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ height: "4rem" }}
                    >
                      {book.book.bookTitle}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {book.book.author} &nbsp; &nbsp; Language:{" "}
                      {book.book.language}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>
                      Borrowed Date: {new Date(book.issueDate).toDateString()}
                      &nbsp; &nbsp; Due Date:{" "}
                      {new Date(book.returnDate).toDateString()}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Box
            mt="2rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" m={2}>
              You do not have any books in your possession
            </Typography>
            <Card>
              <CardMedia
                component="img"
                alt="Wishlist Empty Image"
                height="300"
                image={borrowedBooksEmpty}
              />
            </Card>
            <Link to="/">
              <Button variant="outlined">Continue to browse books</Button>
            </Link>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

const useBorrowedBooks = () => {
  const dispatch = useDispatch();
  const { borrowedBooks } = useSelector(state => state.borrowedBooks);

  useEffect(() => {
    dispatch(getBorrowedBooks());
    return () => dispatch(reset());
  }, []);

  return borrowedBooks;
};

export default BooksInPossession;
