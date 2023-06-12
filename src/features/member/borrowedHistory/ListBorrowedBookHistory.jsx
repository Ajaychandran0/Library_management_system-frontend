import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getBorrowedHistory,
  filterBorrowedHistory,
  reset,
} from "./borrowedHistorySlice";
import TitleAndSearch from "../../../components/common/TitleAndSearch/TitleAndSearch";
import borrowedHistoryEmpty from "../../../assets/images/empty.jpg";
import { styles } from "./styles";

const BorrowedBooks = () => {
  const [searchValue, setSearchValue] = useState("");
  const onSearch = search => {
    setSearchValue(search);
  };
  const navigate = useNavigate();

  const { borrowedHistory, handlePagination, currentPage, totalPages } =
    useBorrowedHistory(searchValue);

  return (
    <Box sx={styles.root}>
      <TitleAndSearch
        title="BORROWED BOOKS HISTORY"
        onSearch={onSearch}
        searchValue={searchValue}
      />
      <Grid container sx={{ mt: 3 }}>
        {borrowedHistory.length ? (
          <>
            {borrowedHistory.map(item => (
              <Grid item xs={12} key={item._id}>
                <Card sx={styles.card}>
                  <CardMedia
                    onClick={() => navigate(`/books/${item.book._id}`)}
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
                            Issue Date:{" "}
                            {new Date(item.issueDate).toDateString()}
                          </Typography>
                          <Typography variant="subtitle1" component="h2">
                            Due Date: {new Date(item.returnDate).toDateString()}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: "0 0 20rem" }}>
                          <Typography variant="subtitle1" component="h2">
                            Returned On:{" "}
                            {new Date(item.returnedOn).toDateString()}
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
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Pagination
                count={totalPages}
                color="primary"
                page={currentPage}
                sx={{ mb: 4 }}
                onChange={handlePagination}
              />
            </Box>
          </>
        ) : (
          <Box
            mt=".5rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" m={2}>
              No books found in Borrowed History
            </Typography>
            <Card>
              <CardMedia
                component="img"
                alt="Wishlist Empty Image"
                height="300"
                image={borrowedHistoryEmpty}
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

const useBorrowedHistory = searchValue => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { borrowedHistory, totalPages } = useSelector(
    state => state.borrowedHistory
  );
  const defaultPagination = {
    page: 0,
    pageSize: 5,
  };

  const [paginationModel, setPaginationModel] = useState(defaultPagination);
  const handlePagination = (event, page) => {
    setCurrentPage(page);
    setPaginationModel({ page: page - 1, pageSize: 5 });
  };
  useEffect(() => {
    if (searchValue && searchValue === search) {
      dispatch(
        filterBorrowedHistory({ ...paginationModel, filter: searchValue })
      );
    } else if (searchValue) {
      setSearch(searchValue);
      setCurrentPage(1);
      dispatch(
        filterBorrowedHistory({ ...defaultPagination, filter: searchValue })
      );
    } else {
      dispatch(getBorrowedHistory(paginationModel));
    }

    return () => {
      dispatch(reset());
    };
  }, [searchValue, paginationModel]);

  return { handlePagination, currentPage, borrowedHistory, totalPages };
};

export default BorrowedBooks;
