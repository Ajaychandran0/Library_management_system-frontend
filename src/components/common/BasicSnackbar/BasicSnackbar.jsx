import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { forwardRef } from "react";
import { create } from "zustand";
import PropTypes from "prop-types";

const useBasicSnackbarStore = create(() => ({
  message: "",
  severity: "",
}));

export const basicSnackbar = ({ message, severity }) => {
  useBasicSnackbarStore.setState({ message, severity });
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BasicSnackbar = ({ open, onClose }) => {
  const { message, severity } = useBasicSnackbarStore();

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => onClose(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 10 }}
      >
        <Alert
          onClose={() => onClose(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

BasicSnackbar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
export default BasicSnackbar;
