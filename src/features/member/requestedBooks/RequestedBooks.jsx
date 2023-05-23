import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReqBooks, removeBookRequest, reset } from "./requestedBooksSlice";
import { Delete, Favorite } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import { Link } from "react-router-dom";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";

const RequestedBooksPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState([]);

  const handleClick = bookId => {
    setWishList(prevState => {
      if (prevState.includes(bookId)) {
        return prevState.filter(book => book !== bookId);
      } else {
        return [...prevState, bookId];
      }
    });
  };

  const handleDelete = bookId => {
    dispatch(removeBookRequest(bookId));
    basicSnackbar({
      message: "Book request deleted successfully",
      severity: "success",
    });
    setSnackbarOpen(true);
  };
  const openConfirmDialog = bookId =>
    confirmDialog({
      message: "Are you sure you want to delete this book request ?",
      title: "Delete",
      onConfirm: () => handleDelete(bookId),
    });

  useEffect(() => {
    dispatch(getReqBooks());
    return () => {
      dispatch(reset());
    };
  }, []);

  const { reqBooks, isLoading } = useSelector(state => state.reqBooks);

  return (
    <Box sx={styles.root}>
      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />
      <ConfirmDialog />
      {isLoading ? (
        "loading"
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            REQUESTED BOOKS
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {reqBooks.length ? (
              reqBooks.map(book => {
                if (book) {
                  return (
                    <Grid item xs={12} sm={6} key={book?._id}>
                      <Card sx={styles.card}>
                        <CardMedia
                          sx={styles.cardMedia}
                          image={book?.imageUrl}
                          title={book?.bookTitle}
                        />
                        <Box sx={styles.cardContent}>
                          <CardContent>
                            <Typography variant="h6" component="h2">
                              {book?.bookTitle}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {book?.author}
                            </Typography>
                          </CardContent>
                        </Box>
                        <CardActions sx={styles.cardActions}>
                          <IconButton
                            onClick={() => handleClick(book._id)}
                            aria-label="add to favorites"
                            color={
                              wishList.includes(book?._id) ? "primary" : "shade"
                            }
                          >
                            <Favorite />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => openConfirmDialog(book?._id)}
                          >
                            <Delete color="danger" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              })
            ) : (
              <Box
                mt="8rem"
                mx="30rem"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  You have not requested any books
                </Typography>
                <Link to="/">
                  <Button variant="outlined">Continue to browse books</Button>
                </Link>
              </Box>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default RequestedBooksPage;
