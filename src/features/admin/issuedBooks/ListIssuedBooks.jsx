import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";

import { Box, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllIssuedBooks } from "./issuedBookSlice";
import { returnBook, returnReset } from "../returnedBooks/returnedBookSlice";

import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";
import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import issuedBooksTableStyles from "./tableStyles";
import TableColumns from "./TableColumns";

const ListIssuedBooks = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { handleReturnBook, returnedBookIds } = useReturnBook(setSnackbarOpen);
  const {
    issuedBooks,
    totalIssuedBooks,
    issueLoading,
    handlePagination,
    paginationModel,
  } = useIssuedBooks();

  return (
    <>
      <ConfirmDialog />
      <BasicSnackbar open={snackbarOpen} onClose={setSnackbarOpen} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          my: 3,
        }}
      >
        <Typography variant="h5">ISSUED BOOKS</Typography>
        <SearchBar
          placeholder="Search a book or a member"
          searchBarWidth="30rem"
        />
      </Box>

      {issueLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          rowCount={totalIssuedBooks}
          rows={issuedBooks}
          columns={TableColumns(handleReturnBook, returnedBookIds)}
          loading={issueLoading}
          getRowId={row => row._id}
          paginationModel={paginationModel}
          handlePagination={handlePagination}
          sx={{
            ...issuedBooksTableStyles,
            height: () => (totalIssuedBooks === 0 ? "400px" : "auto"),
          }}
        />
      )}
    </>
  );
};

const useReturnBook = setSnackbarOpen => {
  const [returnedId, setReturnedId] = useState(null);
  const [returnedBookIds, setReturnedBookIds] = useState([]);
  const dispatch = useDispatch();

  const { returnSuccess, returnError, returnMessage } = useSelector(
    state => state.returnedBooks
  );

  const handleReturnBook = (bookId, memberId) =>
    confirmDialog({
      message: "Confirm Book Returned?",
      title: "Confirmation",
      onConfirm: () => returnBookOnConfirm({ bookId, memberId }),
    });

  const returnBookOnConfirm = ({ bookId, memberId }) => {
    dispatch(returnBook({ bookId, memberId }));
    setReturnedId(bookId);
  };

  useEffect(() => {
    if (returnSuccess && returnMessage === "Book Returned Successfully") {
      basicSnackbar({ message: returnMessage, severity: "success" });
      setSnackbarOpen(true);
      setReturnedBookIds(prevState => [...prevState, returnedId]);
    }
    if (returnError && returnMessage) {
      basicSnackbar({ message: returnMessage, severity: "error" });
      setSnackbarOpen(true);
    }
    dispatch(returnReset());
  }, [returnMessage, returnError, returnSuccess]);

  return { handleReturnBook, returnedBookIds };
};

const useIssuedBooks = () => {
  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { issuedBooks, totalIssuedBooks, issueLoading } = useSelector(
    state => state.issuedBooks
  );

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
    dispatch(getAllIssuedBooks(paginationModel));
  };

  useEffect(() => {
    dispatch(getAllIssuedBooks(paginationModel));
  }, []);

  return {
    issuedBooks,
    totalIssuedBooks,
    issueLoading,
    handlePagination,
    paginationModel,
  };
};

export default ListIssuedBooks;
