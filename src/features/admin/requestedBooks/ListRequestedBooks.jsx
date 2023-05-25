import { Box, Button } from "@mui/material";
import React from "react";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllBookRequests, issueBook } from "./requestedBookSlice";

import TableColumns from "./TableColumns";
import reqBooksTableStyles from "./tableStyles";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";

const ListRequestedBooks = () => {
  const { requests, totalBooks, isLoading } = useSelector(
    state => state.adminBookReqs
  );
  const rows = requests
    .filter(request => request.book && request.member)
    .map(request => {
      const { book, member, ...rest } = request;
      return {
        ...rest,
        ...book,
        ...member,
      };
    });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const dispatch = useDispatch();

  const openConfirmDialog = bookId =>
    confirmDialog({
      message: "Confirm issue book!",
      title: "Confirmation",
      onConfirm: () => handleIssueBook(bookId),
    });

  const handleIssueBook = id => {
    dispatch(issueBook(id));
  };

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
    dispatch(getAllBookRequests(paginationModel));
  };

  useEffect(() => {
    dispatch(getAllBookRequests(paginationModel));
  }, []);

  return (
    <>
      <ConfirmDialog />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="add">
          <Button variant="outlined" sx={{ m: 3 }}>
            Issue New Book
          </Button>
        </Link>
        <SearchBar placeholder="Search a book..." searchBarWidth="30rem" />
      </Box>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          rowCount={totalBooks}
          rows={rows}
          columns={TableColumns(openConfirmDialog)}
          loading={isLoading}
          getRowId={row => row._id}
          paginationModel={paginationModel}
          handlePagination={handlePagination}
          sx={{
            ...reqBooksTableStyles,
            height: () => (totalBooks === 0 ? "400px" : "auto"),
          }}
        />
      )}
    </>
  );
};

export default ListRequestedBooks;
