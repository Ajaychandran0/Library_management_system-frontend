import { Box, Button } from "@mui/material";
import React from "react";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllBookRequests, reset } from "./requestedBookSlice";
import { issueBook, issueReset } from "../issuedBooks/issuedBookSlice";

import TableColumns from "./TableColumns";
import reqBooksTableStyles from "./tableStyles";

import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";

const ListRequestedBooks = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [issuedId, setIssuedId] = useState(null);
  const [issuedBookIds, setIssuedBookIds] = useState([]);

  const { requests, totalBooks, isLoading } = useSelector(
    state => state.adminBookReqs
  );
  const { issueSuccess, issueError, issueMessage, issueLoading } = useSelector(
    state => state.issuedBooks
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const dispatch = useDispatch();

  const openConfirmDialog = (bookId, memberId) =>
    confirmDialog({
      message: "Confirm issue book!",
      title: "Confirmation",
      onConfirm: () => handleIssueBook({ bookId, memberId }),
    });

  const handleIssueBook = ({ bookId, memberId }) => {
    dispatch(issueBook({ bookId, memberId }));
    setIssuedId(bookId);
  };

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
    dispatch(getAllBookRequests(paginationModel));
  };

  useEffect(() => {
    dispatch(getAllBookRequests(paginationModel));
    return () => dispatch(reset());
  }, []);

  useEffect(() => {
    if (issueSuccess && issueMessage === "Book Issued Successfully") {
      basicSnackbar({ message: issueMessage, severity: "success" });
      setSnackbarOpen(true);
      setIssuedBookIds(prevState => [...prevState, issuedId]);
    }
    if (issueError && issueMessage) {
      basicSnackbar({ message: issueMessage, severity: "error" });
      setSnackbarOpen(true);
    }
    dispatch(issueReset());
  }, [issueMessage, issueError, issueSuccess]);

  return (
    <>
      <ConfirmDialog />
      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Link to="/admin/book-transactions/issue-books">
          <Button variant="outlined">Issue New Book</Button>
        </Link>
        <SearchBar placeholder="Search a book..." searchBarWidth="30rem" />
      </Box>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          rowCount={totalBooks}
          rows={requests}
          columns={TableColumns(openConfirmDialog, issuedBookIds, issueLoading)}
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
