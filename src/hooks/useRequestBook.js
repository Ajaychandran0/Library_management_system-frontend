import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { basicSnackbar } from "../components/common/BasicSnackbar/BasicSnackbar";
import {
  requestBook,
  reset,
} from "../features/member/requestedBooks/requestedBooksSlice";

const useRequestBook = ({ setSnackbarOpen }) => {
  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector(state => state.reqBooks);

  const handleRequestBook = bookId => {
    dispatch(requestBook(bookId));
  };

  useEffect(() => {
    if (isError) {
      const severity = message === "Network Error" ? "error" : "warning";
      basicSnackbar({ message, severity });
      setSnackbarOpen(true);
    }
    if (isSuccess && message) {
      basicSnackbar({
        message,
        severity: "success",
      });
      setSnackbarOpen(true);
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);

  return { handleRequestBook };
};

export default useRequestBook;
