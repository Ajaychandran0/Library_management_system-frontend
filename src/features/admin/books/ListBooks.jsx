import { Box, Button } from "@mui/material";
import React from "react";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getBooks } from "./bookSlice";
import TableColumns, { booksTableStyles } from "./TableColums";

const ListBooks = () => {
  const { books, totalBooks, isLoading } = useSelector(state => state.books);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const dispatch = useDispatch();

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
    dispatch(getBooks(paginationModel));
  };

  useEffect(() => {
    dispatch(getBooks(paginationModel));
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
        <MemoizedDataTable
          rowCount={totalBooks}
          rows={books}
          columns={TableColumns()}
          loading={isLoading}
          getRowId={row => row._id}
          paginationModel={paginationModel}
          handlePagination={handlePagination}
          sx={{
            ...booksTableStyles,
            height: () => (books.length === 0 ? "400px" : "auto"),
          }}
        />
      )}
    </>
  );
};

const MemoizedDataTable = React.memo(DataTable);
export default ListBooks;
