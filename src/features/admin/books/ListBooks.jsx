import { Box, Button } from "@mui/material";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getBooks, reset } from "./bookSlice";
import { columns, booksTableStyles } from "./TableColums";

const ListBooks = () => {
  const { books, isLoading, isError, message } = useSelector(
    state => state.books
  );

  let x = 0;
  const row = books.map(book => {
    x += 1;
    return { ...book, id: x };
  });

  const { admin } = useSelector(state => state.admin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getBooks());

    return () => {
      dispatch(reset());
    };
  }, [admin, navigate]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="add-book">
          <Button variant="outlined" sx={{ m: 3 }}>
            Add books
          </Button>
        </Link>
        <SearchBar placeholder="Search a book..." searchBarWidth="30rem" />
      </Box>
      <DataTable
        rows={row}
        columns={columns}
        loading={isLoading}
        sx={{
          ...booksTableStyles,
          height: () => (books.length === 0 ? "400px" : "auto"),
        }}
      />
    </>
  );
};

export default ListBooks;
