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

import { getMemberOverdueItems, reset } from "./borrowedHistorySlice";
import noFine from "../../../assets/images/empty.jpg";
import { styles } from "./styles";

const overdueItemsList = () => {
  const navigate = useNavigate();
  const overdueItems = useOverdueItems();

  return (
    <Box sx={styles.root}>
      <Typography variant="h5" gutterBottom>
        OVERDUE ITEMS
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {overdueItems.length ? (
          overdueItems.map(item => (
            <Grid item xs={12} sm={6} key={item._id}>
              <Card sx={styles.card}>
                <CardMedia
                  onClick={() => navigate(`/books/${item.book._id}`)}
                  sx={styles.cardMedia}
                  image={item.book.imageUrl}
                  title={item.book.bookTitle}
                />
                <Box>
                  <CardContent sx={styles.cardContent}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ height: "4rem" }}
                    >
                      {item.book.bookTitle}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        mt: 2,
                        justifyContent: "space-between",
                        width: "24rem",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2">
                          Borrowed Date:{" "}
                          {new Date(item.issueDate).toDateString()}
                        </Typography>
                        <Typography variant="subtitle2">
                          Due Date: {new Date(item.returnDate).toDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="subtitle">
                          Fine: {item.fine}
                        </Typography>
                        <Button variant="outlined">Pay</Button>
                      </Box>
                    </Box>
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
              You do not have any overdue items
            </Typography>
            <Card>
              <CardMedia
                component="img"
                alt="Wishlist Empty Image"
                height="300"
                image={noFine}
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

const useOverdueItems = () => {
  const dispatch = useDispatch();
  const { overdueItems } = useSelector(state => state.borrowedHistory);

  useEffect(() => {
    dispatch(getMemberOverdueItems());
    return () => dispatch(reset());
  }, []);

  return overdueItems;
};

export default overdueItemsList;
