import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, reset } from "./bookSlice";

import {
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";

import { styles } from "./style";

function ListAllBooks() {
  const { books, isError, message } = useSelector(state => state.books);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getBooks());

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.banner}>
        <Box sx={{ mr: 6 }}>
          <h4>Digital BookStore</h4>
          <p style={{ fontSize: "1.5rem" }}>
            Discover a new chapter in reading with us
          </p>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ m: 2, mt: 5, color: "#162051" }}>
          All Books
        </Typography>
        <Grid container spacing={3}>
          {books.map((book, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={styles.bookCard}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Book Cover"
                    height="300"
                    image={book.imageUrl}
                    title="Book Title"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={styles.bookTitle}
                    >
                      {book.bookTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      sx={styles.bookAuthor}
                    >
                      {book.author}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Request book
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ListAllBooks;
