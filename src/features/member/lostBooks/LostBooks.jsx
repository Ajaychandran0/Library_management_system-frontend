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
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getMemberLostBooks, reset } from "./lostBookSlice";
import { Link } from "react-router-dom";

const MemberLostBooks = () => {
  const { lostBooks } = useSelector(state => state.memberLostBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemberLostBooks());
    return () => reset();
  }, []);

  return (
    <Box sx={styles.root}>
      <Typography variant="h5" gutterBottom>
        LOST BOOKS
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        {lostBooks.length ? (
          lostBooks.map(item => (
            <Grid item xs={12} key={item.book._id}>
              <Card sx={styles.card}>
                <CardMedia
                  sx={styles.cardMedia}
                  image={item.book.bookCoverUrl}
                  title={item.book.bookTitle}
                />
                <Box sx={styles.cardContent}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {item.book.bookTitle}
                    </Typography>
                    <Box sx={{ display: "flex", mt: 2 }}>
                      <Box sx={{ flex: "0 0 21rem", px: 2 }}>
                        <Typography variant="subtitle1" color="textSecondary">
                          Author: {item.book.author}
                        </Typography>
                        <Typography variant="subtitle1" component="h2">
                          Language: {item.book.language}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: "0 0 21rem" }}>
                        <Typography variant="subtitle1" component="h2">
                          {" "}
                          Category: {item.book.category}
                        </Typography>
                        <Typography variant="subtitle1" component="h2">
                          Lost Date: {new Date(item.lostDate).toDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: "0 0 21rem" }}>
                        <Typography variant="subtitle1" component="h2">
                          Fine Ammount: {item.book.lostPrice} &nbsp; ₹ &nbsp;
                          &nbsp;
                          {item.fine > 0
                            ? item.isFinePaid
                              ? "(Paid)"
                              : "(Not paid)"
                            : ""}
                        </Typography>
                        {item.isFinePaid ? (
                          <Button disabled variant="outlined" fullWidth>
                            paid
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ width: "50%", mt: 1 }}
                          >
                            pay
                          </Button>
                        )}
                      </Box>
                    </Box>
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
              You have not lost any books
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

export default MemberLostBooks;
