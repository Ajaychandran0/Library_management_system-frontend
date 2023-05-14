import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, reset } from "./bookSlice";

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
} from "@mui/material";

import { styles } from "./style";

function ListAllBooks() {
  const { books } = useSelector(state => state.books);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Grid container spacing={3}>
      {books.map(book => (
        <Grid item xs={12} sm={6} md={3} key={book._id}>
          <Card sx={styles.bookCard}>
            <CardActionArea>
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
              <Button size="small" color="primary" variant="outlined">
                Request book
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ListAllBooks;
