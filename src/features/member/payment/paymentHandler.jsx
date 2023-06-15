import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  throwPaymentError,
  setPaymentSuccess,
  updatePaymentSuccess,
} from "./paymentSlice";
import { useEffect } from "react";

const paymentHandler = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const stripeCanceled = searchParams.get("canceled");
  const stripeSuccess = searchParams.get("success");
  const overdueId = searchParams.get("overdueId");
  const { paymentError, paymentSuccess, paymentMessage } = useSelector(
    state => state.payment
  );
  useEffect(() => {
    if (stripeSuccess && overdueId) {
      dispatch(setPaymentSuccess(overdueId));
    }
    if (stripeCanceled) {
      dispatch(throwPaymentError("payment canceled"));
    }
  }, []);

  useEffect(() => {
    if (paymentError) {
      navigate("/account/overdue");
    }
    if (paymentSuccess && paymentMessage === "payment successful") {
      dispatch(updatePaymentSuccess(overdueId));
    }

    if (paymentSuccess && paymentMessage === "updatedSuccessfully") {
      navigate("/account/overdue");
    }
  }, [paymentError, paymentSuccess, paymentMessage]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default paymentHandler;
