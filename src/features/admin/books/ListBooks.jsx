import { Box, Button } from "@mui/material";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getBooks, reset } from "./bookSlice";
import TableColumns, { booksTableStyles } from "./TableColums";

const ListBooks = () => {
  const { books, isLoading } = useSelector(state => state.books);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());

    return () => {
      dispatch(reset());
    };
  }, []);

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
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          rows={books}
          columns={TableColumns()}
          loading={isLoading}
          getRowId={row => row._id}
          sx={{
            ...booksTableStyles,
            height: () => (books.length === 0 ? "400px" : "auto"),
          }}
        />
      )}
    </>
  );
};
export default ListBooks;
