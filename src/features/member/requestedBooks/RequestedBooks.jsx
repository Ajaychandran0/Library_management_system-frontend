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
import { Link, useNavigate } from "react-router-dom";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";
import useWishlist from "../../../hooks/useWishlist";
import reqBookEmpty from "../../../assets/images/empty.jpg";

const RequestedBooksPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const { handleWishlist, wishlistIds } = useWishlist({ setSnackbarOpen });
  const { reqBooks, isLoading, handleDelete } =
    useRequestedBooksList(setSnackbarOpen);

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
                          onClick={() => navigate(`/books/${book._id}`)}
                          sx={styles.cardMedia}
                          image={book?.imageUrl}
                          title={book?.bookTitle}
                        />
                        <Box sx={styles.cardContent}>
                          <CardContent>
                            <Typography
                              variant="h6"
                              component="h2"
                              sx={{ height: "4rem" }}
                            >
                              {book?.bookTitle}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {book?.author}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              Available Quantity: {book?.availableQty}
                              &nbsp;&nbsp;&nbsp;&nbsp; Language:{" "}
                              {book?.language}
                            </Typography>
                          </CardContent>
                        </Box>
                        <CardActions sx={styles.cardActions}>
                          <IconButton
                            onClick={() =>
                              handleWishlist(book._id, book.bookTitle)
                            }
                            aria-label="add to favorites"
                            color={
                              wishlistIds.includes(book._id)
                                ? "primary"
                                : "shade"
                            }
                          >
                            <Favorite />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(book?._id)}
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
                mt="2rem"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography variant="h6" m={2}>
                  You have not requested any books
                </Typography>
                <Card>
                  <CardMedia
                    component="img"
                    alt="Wishlist Empty Image"
                    height="300"
                    image={reqBookEmpty}
                  />
                </Card>
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

const useRequestedBooksList = setSnackbarOpen => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReqBooks());
    return () => {
      dispatch(reset());
    };
  }, []);

  const deleteReqBook = bookId => {
    dispatch(removeBookRequest(bookId));
    basicSnackbar({
      message: "Book request deleted successfully",
      severity: "success",
    });
    setSnackbarOpen(true);
  };
  const handleDelete = bookId =>
    confirmDialog({
      message: "Are you sure you want to delete this book request ?",
      title: "Delete",
      onConfirm: () => deleteReqBook(bookId),
    });

  const { reqBooks, isLoading } = useSelector(state => state.reqBooks);
  return { reqBooks, isLoading, handleDelete };
};

export default RequestedBooksPage;
