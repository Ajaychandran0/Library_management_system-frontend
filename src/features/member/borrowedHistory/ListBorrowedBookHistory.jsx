import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getBorrowedHistory, reset } from "./borrowedHistorySlice";

const BorrowedBooks = () => {
  const { borrowedHistory } = useSelector(state => state.borrowedHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBorrowedHistory());
    return () => reset();
  }, []);

  return (
    <Box sx={styles.root}>
      <Typography variant="h5" gutterBottom>
        BORROWED BOOKS HISTORY
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        {borrowedHistory.map(item => (
          <Grid item xs={12} key={item.book._id}>
            <Card sx={styles.card}>
              <CardMedia
                sx={styles.cardMedia}
                image={item.book.imageUrl}
                title={item.book.bookTitle}
              />
              <Box sx={styles.cardContent}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {item.book.bookTitle}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <Box sx={{ flex: "0 0 23rem", px: 2 }}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Author: {item.book.author}
                      </Typography>
                      <Typography variant="subtitle1" component="h2">
                        Language: {item.book.language}
                      </Typography>
                    </Box>

                    <Box sx={{ flex: "0 0 20rem" }}>
                      <Typography variant="subtitle1" component="h2">
                        Issue Date: {new Date(item.issueDate).toDateString()}
                      </Typography>
                      <Typography variant="subtitle1" component="h2">
                        Due Date: {new Date(item.returnDate).toDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: "0 0 20rem" }}>
                      <Typography variant="subtitle1" component="h2">
                        Returned On: {new Date(item.returnedOn).toDateString()}
                      </Typography>
                      <Typography variant="subtitle1" component="h2">
                        Fine: {item.fine}
                        &nbsp; &nbsp;
                        {item.fine > 0
                          ? item.isFinePaid
                            ? "(Paid)"
                            : "(Not paid)"
                          : ""}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BorrowedBooks;
