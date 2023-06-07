import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import { getBorrowedBooks, reset } from "./borrowedBookSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BooksInPossession = () => {
  const dispatch = useDispatch();

  const { borrowedBooks } = useSelector(state => state.borrowedBooks);

  useEffect(() => {
    dispatch(getBorrowedBooks());
    return () => dispatch(reset());
  }, []);

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
            mt="8rem"
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
            <Link to="/">
              <Button variant="outlined">Continue to browse books</Button>
            </Link>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default BooksInPossession;
