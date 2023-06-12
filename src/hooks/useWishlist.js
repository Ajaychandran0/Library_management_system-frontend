import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { basicSnackbar } from "../components/common/BasicSnackbar/BasicSnackbar";

import {
  addToWishlist,
  removeFromWishlist,
} from "../features/member/wishlist/wishlistSlice";
import { reset } from "../features/member/wishlist/wishlistSlice";

const useWishlist = ({ setSnackbarOpen }) => {
  const [bookTitle, setBookTitle] = useState(null);
  const dispatch = useDispatch();

  const { wishlistIds } = useSelector(state => state.wishlist);
  const { isSuccess, message, isError } = useSelector(state => state.wishlist);

  const handleWishlist = (bookId, bookTitle) => {
    if (wishlistIds.includes(bookId)) {
      dispatch(removeFromWishlist(bookId));
    } else {
      dispatch(addToWishlist(bookId));
    }
    setBookTitle(bookTitle);
  };

  useEffect(() => {
    if (isSuccess && message === "removedFromWishlist") {
      basicSnackbar({
        message: `"${bookTitle}" removed from your wishlist`,
        severity: "warning",
      });
      setSnackbarOpen(true);
    }
    if (isSuccess && message === "addedToWishlist") {
      basicSnackbar({
        message: `"${bookTitle}" added to you wishlist`,
        severity: "success",
      });
      setSnackbarOpen(true);
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);

  return { handleWishlist, wishlistIds };
};

export default useWishlist;
