import { Box, Typography } from "@mui/material";
import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllIssuedBooks } from "./issuedBookSlice";
import { returnBook, returnReset } from "../returnedBooks/returnedBookSlice";

import TableColumns from "./TableColumns";
import issuedBooksTableStyles from "./tableStyles";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";

const ListIssuedBooks = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [returnedId, setReturnedId] = useState(null);
  const [returnedBookIds, setReturnedBookIds] = useState([]);
  const { issuedBooks, totalIssuedBooks, issueLoading } = useSelector(
    state => state.issuedBooks
  );

  const { returnSuccess, returnError, returnMessage } = useSelector(
    state => state.returnedBooks
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const dispatch = useDispatch();

  const openConfirmDialog = (bookId, memberId) =>
    confirmDialog({
      message: "Confirm Book Returned?",
      title: "Confirmation",
      onConfirm: () => handleReturnBook({ bookId, memberId }),
    });

  const handleReturnBook = ({ bookId, memberId }) => {
    dispatch(returnBook({ bookId, memberId }));
    setReturnedId(bookId);
  };

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
    dispatch(getAllIssuedBooks(paginationModel));
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

  useEffect(() => {
    dispatch(getAllIssuedBooks(paginationModel));
  }, []);

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
          columns={TableColumns(openConfirmDialog, returnedBookIds)}
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

export default ListIssuedBooks;
