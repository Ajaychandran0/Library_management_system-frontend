import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import BasicSnackbar, {
  basicSnackbar,
} from "../../../components/common/BasicSnackbar/BasicSnackbar";
import ConfirmDialog, {
  confirmDialog,
} from "../../../components/common/ConfirmDialog/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, reset as bookReset } from "../books/bookSlice";
import { getMembers, reset as memberReset } from "../members/memberSlice";
import MemberDetails from "./MemberDetails";
import BookDetails from "./BookDetails";
import { issueBook } from "./issuedBookSlice";
import { issueReset } from "./issuedBookSlice";

const IssueNewBook = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bookIsbn, setBookIsbn] = useState("");
  const [memberId, setMemberId] = useState("");

  const dispatch = useDispatch();
  const bookDetails = useSelector(state => state.books.books);
  const memberDetails = useSelector(state => state.members.members);
  const { issueSuccess, issueError, issueMessage } = useSelector(
    state => state.issuedBooks
  );

  const handleBookIsbnChange = event => {
    setBookIsbn(event.target.value);
    dispatch(getBooks({ ISBN: event.target.value }));
  };

  const handleMemberIdChange = event => {
    setMemberId(event.target.value);
    const id = event.target.value.toUpperCase();
    dispatch(getMembers({ collegeId: id }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (bookDetails.length && memberDetails.length) {
      openConfirmDialog();
    } else {
      basicSnackbar({
        message: "Please provide correct member and book information ",
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  };

  const openConfirmDialog = () => {
    confirmDialog({
      message: "Are you sure you want to issue this book ?",
      title: "Issue Book",
      onConfirm: () => handleIssueBook(),
    });
  };

  const handleIssueBook = () => {
    console.log("Issuing book...", bookIsbn, memberId);
    dispatch(
      issueBook({ bookId: bookDetails[0]._id, memberId: memberDetails[0]._id })
    );
  };
  useEffect(() => {
    if (issueSuccess && issueMessage === "Book Issued Successfully") {
      basicSnackbar({ message: issueMessage, severity: "success" });
      setSnackbarOpen(true);
      setBookIsbn("");
      setMemberId("");
      dispatch(bookReset());
      dispatch(memberReset());
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
      <Typography variant="h6" sx={{ mb: 2 }}>
        ISSUE BOOK
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: theme => theme.palette.grey[200],
          p: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Book ISBN"
          value={bookIsbn}
          onChange={handleBookIsbnChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {bookDetails.length != 0 ? (
          <BookDetails bookDetails={bookDetails} />
        ) : bookIsbn ? (
          "No books found with the given isbn"
        ) : (
          ""
        )}
        <TextField
          label="Member ID"
          value={memberId}
          onChange={handleMemberIdChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {memberDetails.length != 0 ? (
          <MemberDetails memberDetails={memberDetails} />
        ) : memberId ? (
          "No member found with the given ID"
        ) : (
          ""
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Issue Book
        </Button>
      </Box>
    </>
  );
};

export default IssueNewBook;
