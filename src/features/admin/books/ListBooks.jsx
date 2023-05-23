import { Box, Button } from "@mui/material";
import React from "react";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getBooks, deleteBook } from "./bookSlice";

import TableColumns, { booksTableStyles } from "./TableColums";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";

const ListBooks = () => {
  const { books, totalBooks, isLoading } = useSelector(state => state.books);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = bookData => {
    navigate("/admin/books/edit", { state: { bookData } });
  };

  const openConfirmDialog = bookId =>
    confirmDialog({
      message: "Are you sure you want to delete this book ?",
      title: "Delete",
      onConfirm: () => handleDelete(bookId),
    });

  const handleDelete = id => {
    dispatch(deleteBook(id));
  };

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
    dispatch(getBooks(paginationModel));
  };

  useEffect(() => {
    dispatch(getBooks(paginationModel));
  }, []);

  return (
    <>
      <ConfirmDialog />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="add">
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
          columns={TableColumns(handleEdit, openConfirmDialog)}
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
