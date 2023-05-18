import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { styles } from "./styles";

const OverdueItemsLlist = () => {
  const requestedBooks = [
    {
      id: 1,
      title: "Book 1",
      author: "Author 1",
      image:
        "http://res.cloudinary.com/dth0telv9/image/upload/v1683381692/Horizon/books/r3hsi1usvydnuw3myh85.jpg",
    },
    {
      id: 2,
      title: "Book 2",
      author: "Author 2",
      image:
        "http://res.cloudinary.com/dth0telv9/image/upload/v1683523286/Horizon/books/b5z8hnnxbohpp9qotpc6.jpg",
    },
    {
      id: 3,
      title: "Book 3",
      author: "Author 3",
      image:
        "http://res.cloudinary.com/dth0telv9/image/upload/v1683382803/Horizon/books/qoxq6nhjxnacctgu6vg3.webp",
    },
  ];

  return (
    <Box sx={styles.root}>
      <Typography variant="h5" gutterBottom>
        Overdue Items
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        {requestedBooks.map(book => (
          <Grid item xs={12} key={book.id}>
            <Card sx={styles.card}>
              <CardMedia
                sx={styles.cardMedia}
                image={book.image}
                title={book.title}
              />
              <Box sx={styles.cardContent}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {book.author}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OverdueItemsLlist;
