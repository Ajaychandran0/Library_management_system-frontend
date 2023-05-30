import { Box, Typography } from "@mui/material";
import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllIssuedBooks, issueBook } from "./issuedBookSlice";

import TableColumns from "./TableColumns";
import issuedBooksTableStyles from "./tableStyles";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";

const ListIssuedBooks = () => {
  const { issuedBooks, totalIssuedBooks, issueLoading } = useSelector(
    state => state.issuedBooks
  );

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
    dispatch(getAllIssuedBooks(paginationModel));
  };

  useEffect(() => {
    dispatch(getAllIssuedBooks(paginationModel));
  }, []);

  return (
    <>
      <ConfirmDialog />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
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
          columns={TableColumns(openConfirmDialog)}
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
